import { Request, Response } from 'express';

import User from './../schemas/user';
import Alert from './../schemas/alert';
import user from './../schemas/user';
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
      console.log(req);
      try {
        // const alerts = await Alert.find({'maxPrice': req.user._id });
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
              item: 1
            },
          },
        ]);
        res.send(alerts);
      } catch(error) {
        console.error(error);
        res.send(error);
      }
    })
   
    app.post('/user/alerts/create', async (req: Request, res: Response) => {
      const { item, id, maxPrice } = await req.body;

      const discogsItem = {
        id: item.id,
        artist: item.basic_information.artists[0].name,
        title: item.basic_information.title,
        cover: item.basic_information.cover_image,
      }

      try {  
        let alert: any = await Alert.findOne({'item.id': item.id});
        if (!alert) {
          alert = await Alert.create({...discogsItem, maxPrice: {[maxPrice]: {[id]: true}}})
        }

        alert.item = discogsItem

        Object.keys(alert.maxPrice).map((key: any) => {
          delete alert.maxPrice[key][id];
          if(Object.keys(alert.maxPrice[key]).length === 0) {
            delete alert.maxPrice[key];
          }
        });

        alert.maxPrice = {
          ...alert.maxPrice,
          [maxPrice]: {
            ...alert.maxPrice[maxPrice],
            [id]: true
          }};
  
        alert.save();

        res.status(200);
      } catch(error) {
        console.error(error);
        res.json(error);
      }
    })
  }
}

export default UserRoutes;