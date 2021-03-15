import * as mailgun from "mailgun-js";

export class MailgunClient {
  DOMAIN = process.env.MAILGUN_URL;
  mg = mailgun({apiKey: process.env.MAILGUN_API, domain: this.DOMAIN});

  public async sendRegistrationCode(to, token) {
    const data = {
      from: 'Other Supply <hello@othersupply.com>',
      to,
      subject: 'Welcome! Confirm your email',
      html: `
        <h2>Activate Account</h2>
        <p>Click on the link below and sign in with your newly created account.</p>
        <p>${process.env.CLIENT_URL}/account/activate/${token}</p>
      `
    };
    await this.mg.messages().send(data, function (error, body) {
      return body;
    });
  }
  
  public async sendResetPassword(to, token) {
    const data = {
      from: 'Other Supply <confirm@other.supply>',
      to,
      subject: 'Hello',
      html: `
        <h2>Click below to reset your password.</h2>
        <p>${process.env.CLIENT_URL}/account/forgot_password/reset/${token}</p>
      `
    };
    await this.mg.messages().send(data, function (error, body) {
      return body;
    });
  }
}