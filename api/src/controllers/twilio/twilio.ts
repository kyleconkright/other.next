import { Twilio } from 'twilio';

export class TwilioClient {
  
  accountSid = process.env.TWILIO_ACCOUNTSID;
  authToken = process.env.TWILIO_AUTH_TOKEN;
  client = new Twilio(this.accountSid, this.authToken);

  public async sendAlert(data) {
    const {to, body} = data;
    const message = await this.client.messages.create({
      body,
      from: process.env.TWILIO_FROM,
      to
    })
  }

  // Allow a reply to update price when published  
  // public async updatePrice(data) {
  //   const {to, body} = data;
  //   await this.client.
  // }
}