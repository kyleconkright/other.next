import { Request, Response } from 'express';
import { TwilioClient } from '../controllers/twilio/twilio';

export class MessagesRoutes {

  public routes(app) {

    const twilio = new TwilioClient();

    app.post('/messages/update', async (req: Request, res: Response) => {
      const { data } = await req.body;
      try {
        const twilioResponse = await twilio.sendAlert(data);
        res.json(twilioResponse);
      } catch(error) {
        console.error(error);
        res.json(error);
      }
    })
  }
}

export default MessagesRoutes;


