import { Request, Response } from "express";
import axios from 'axios';
import { AmazonClient } from './../controllers/amazon/index';
import { EbayClient } from "../jobs/feeds/ebay.job";


export class Routes {
  public routes(app) {
    app.post('/search/amazon', async (req: Request, res: Response) => {
      const amazon = new AmazonClient();
      try {
        const results: any = await amazon.search(req.body.query);
        res.json({results: results.results.map(item => amazon.formatListing(item, {type: 'amazon-listing'}))});
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