import { Request, Response } from 'express';

import User from './../schemas/user';
import Alert from './../schemas/alert';
import AlertDetail from './../schemas/alertDetail';
export class UserRoutes {

  public routes(app) {

    app.post('/user/update', async (req: Request, res: Response) => {
      const { user } = await req.body;
      const { id, phone } = await user;
      try {
        const user = await User.findById(id);
        user.set('phone', phone);
        user.save();
        res.json(user);
      } catch(error) {
        console.error(error);
        res.json(error);
      }
    });

    app.get('/user/alerts', async (req: Request, res: Response) => {
      try {
        const alerts = await Alert.aggregate([
          {
            $addFields: {
              maxPrice: {
                $objectToArray: "$maxPrice",
              },
            },
          },
          {
            $unwind: "$maxPrice"
          },
          {
            $addFields: {
              price: "$maxPrice.k",
              maxPrice: {
                $objectToArray: "$maxPrice.v",
              }
            },
          },
          {
            $match: {
              "maxPrice.k": req.user.id,
            },
          },
          {
            $project: {
              price: 1,
              item: 1,
              currentLowPrice: 1,
            },
          },
          {
            $lookup: {
              from: "alertdetails",
              let: { id: "$item.id" },
              pipeline: [
                {
                  $match:
                  {
                    $expr:
                    {
                      $and:
                        [
                          { $eq: ["$releaseId", "$$id"] },
                          { $eq: ["$userId", req.user.id] }
                        ]
                    }
                  }
                },
              ],
              as: "details"
            },
          },
          {
            $unwind: "$details"
          },
        ]);
        res.send(alerts);
      } catch(error) {
        console.error(error);
        res.send(error);
      }
    })
   
    app.post('/user/alerts/create', async (req: Request, res: Response) => {
      const { item, id: userId, maxPrice, notes } = await req.body;

      const discogsItem = {
        id: item.id,
        masterId: item.basic_information.master_id,
        artist: item.basic_information.artists[0].name,
        title: item.basic_information.title,
        cover: item.basic_information.cover_image,
      }

      const alertDetailItem = {
        notes,
        userId,
        releaseId: item.id
      }

      try {  
        let alert: any = await Alert.findOne({'item.id': item.id});
        let alertDetail: any = await AlertDetail.findOne({releaseId: item.id, userId});
        if (!alert || !alertDetail) {
          alert = await Alert.create({...discogsItem, maxPrice: {[maxPrice]: {[userId]: true}}});
          alertDetail = await AlertDetail.create({...alertDetailItem});
        }
        alert.item = discogsItem

        alert.maxPrice = updateMaxPrice(alert, maxPrice, userId);
  
        alert.save()

        res.send('Success');
      } catch(error) {
        console.error(error);
        res.json(error);
      }
    })

    app.post('/user/alerts/update', async (req: Request, res: Response) => {
      try {
        const { item } = await req.body;
        const { id: userId } = (await req).user;
        let alert: any = await Alert.findOne({'item.id': item.id});
        let alertDetail;
        try {
          alertDetail = await AlertDetail.findOne({releaseId: item.id, userId});
          if(!alertDetail) {
            alertDetail = await AlertDetail.create({userId, releaseId: item.id, notes: item.notes, asin: item.asin});
          }
        } catch(err) {
          console.error(err);
        }
        alertDetail.notes = item.notes;
        alertDetail.asin = item.asin;
        alert.maxPrice = updateMaxPrice(alert, item.price, userId);
        await alert.save();
        await alertDetail.save();
        res.send('Success');
      } catch(err) {
        console.error(err);
      }
    })
    
    app.post('/user/alerts/delete', async (req: Request, res: Response) => {
      try {
        const { item } = await req.body;
        const { id: userId } = (await req).user;
        let alert: any = await Alert.findOne({'item.id': item.item.id});
        alert.maxPrice = deleteNotification(alert, userId);
        alert.markModified('maxPrice');
        alert.save();
        res.send('Success');
      } catch(err) {
        console.error(err);
      }
    })
  }
}

export default UserRoutes;

function updateMaxPrice(alert, maxPrice, userId) {
  if(!alert.maxPrice) alert.maxPrice = {};

  Object.keys(alert.maxPrice).map((key: any) => {
    delete alert.maxPrice[key][userId];
    deleteEmptyPrices(alert, key);
  });

  return alert.maxPrice = {
    ...alert.maxPrice,
    [maxPrice]: {
      ...alert.maxPrice[maxPrice],
      [userId]: true
    }
  };
}

function deleteNotification(alert, userId) {
  Object.keys(alert.maxPrice).map((key: any) => {
    delete alert.maxPrice[key][userId];
    deleteEmptyPrices(alert, key);
  });
  return alert.maxPrice;
}

function deleteEmptyPrices(alert, maxPrice) {
  if(Object.keys(alert.maxPrice[maxPrice]).length === 0) {
    delete alert.maxPrice[maxPrice];
  }
}