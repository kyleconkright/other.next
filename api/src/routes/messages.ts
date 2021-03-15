import { Request, Response } from 'express';
import twilio = require('twilio');
import { TwilioClient } from '../controllers/twilio/twilio';

export class MessagesRoutes {

  public routes(app) {

    const twilioClient = new TwilioClient();

    app.post('/messages/update', async (req: Request, res: Response) => {
      const { data } = await req.body;
      try {
        const twilioResponse = await twilioClient.sendAlert(data);
        res.json(twilioResponse);
      } catch(error) {
        console.error(error);
        res.json(error);
      }
    })
    
    app.post('/messages/handle', twilio.webhook({validate: false}), async (req, res) => {
      try {
        var from = req.body.From;
        var smsRequest = req.body.Body;
        res.json({from, smsRequest});
      } catch(error) {
        console.error(error);
      }
    })
  }
}

export default MessagesRoutes;


