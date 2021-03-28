import { Request, Response } from "express";
import axios from 'axios';
import { searchAmazon } from './../controllers/amazon/index';
import { EbayClient } from "../jobs/feeds/ebay.job";


export class Routes {
  public routes(app) {
    app.get('/search/amazon', async (req: Request, res: Response) => {
      try {
        const results = await searchAmazon('green day');
        res.json({results});
      } catch(err) {
        res.json({err});
      }
    });
    
    app.post('/search/ebay', async (req: Request, res: Response) => {
      const ebay = new EbayClient();
      try {
        const results = await ebay.search(req.body.query);
        res.json({results});
      } catch(err) {
        res.json({err});
      }
    });
  }

}

export default Routes;