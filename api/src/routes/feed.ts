import { Request, Response } from 'express';
import FeedItem from './../schemas/feedItem';



export default class FeedRoutes {
  public routes(app) {
    app.get('/feed/reddit/releases', async (req: Request, res: Response) => {
      try {
        const feed = await FeedItem.find();
        res.json({ feed });
      } catch(err) {
        res.status(400).json({message: 'Something went Wrong'})
        console.error(err);
      }
    })
  }
}