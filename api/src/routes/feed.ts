import { Request, Response } from 'express';
import FeedItem from './../schemas/feedItem';



export default class FeedRoutes {
  public routes(app) {
    app.get('/feed/reddit/releases', async (req: Request, res: Response) => {
      try {
        const releases = await FeedItem.find({type: 'reddit-release'});
        res.json({ releases });
      } catch(err) {
        res.status(400).json({message: 'Something went Wrong'})
        console.error(err);
      }
    })
    
    app.get('/feed/reddit/deals', async (req: Request, res: Response) => {
      try {
        const deals = await FeedItem.find({type: 'reddit-deal'});
        res.json({ deals });
      } catch(err) {
        res.status(400).json({message: 'Something went Wrong'});
        console.error(err);
      }
    })
    
    app.get('/feed/newbury', async (req: Request, res: Response) => {
      try {
        const listings = await FeedItem.find({type: 'newbury-exclusive'});
        res.json({ listings });
      } catch(err) {
        res.status(400).json({message: 'Something went Wrong'})
        console.error(err);
      }
    })
    
    app.get('/feed/urbanoutfitters', async (req: Request, res: Response) => {
      try {
        const listings = await FeedItem.find({type: 'uo-listing'});
        res.json({ listings });
      } catch(err) {
        res.status(400).json({message: 'Something went Wrong'})
        console.error(err);
      }
    })
    
    app.get('/feed/ebay', async (req: Request, res: Response) => {
      try {
        const listings = await FeedItem.find({type: 'ebay-listing'});
        res.json({ listings });
      } catch(err) {
        res.status(400).json({message: 'Something went Wrong'})
        console.error(err);
      }
    })
    
    app.get('/feed/amazon', async (req: Request, res: Response) => {
      try {
        const listings = await FeedItem.find({type: 'amazon-listing'});
        res.json({ listings });
      } catch(err) {
        res.status(400).json({message: 'Something went Wrong'})
        console.error(err);
      }
    })
  }
}