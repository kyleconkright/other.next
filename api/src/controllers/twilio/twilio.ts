import { Twilio } from 'twilio';

export class TwilioClient {
  
  accountSid = process.env.TWILIO_ACCOUNTSID;
  authToken = process.env.TWILIO_AUTH_TOKEN;
  client = new Twilio(this.accountSid, this.authToken);

  public async execute(data) {
    const {to, body} = data;
    const message = await this.client.messages.create({
      body,
      from: process.env.TWILIO_FROM,
      to
    })
  }
}