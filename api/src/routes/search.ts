import { Request, Response } from "express";
import axios from 'axios';
import { searchAmazon } from './../controllers/amazon/index';


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
  }

}

export default Routes;