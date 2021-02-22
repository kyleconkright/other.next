import * as mailgun from "mailgun-js";

export class MailgunClient {
  DOMAIN = 'sandboxe1d3d29b5b084a8988e494a8ce4bf8bf.mailgun.org';
  mg = mailgun({apiKey: process.env.MAILGUN_API, domain: this.DOMAIN});

  public async sendRegistrationCode(to, token) {
    const data = {
      from: 'Other Supply <hello@othersupply.com>',
      to: 'kyleconkright@gmail.com',
      subject: 'Hello',
      html: `
        <h2>Activate Account</h2>
        <p>Click on the link below and sign in with your newly created account.</p>
        <p>http://localhost:5000/account/activate/${token}</p>
      `
    };
    await this.mg.messages().send(data, function (error, body) {
      return body;
    });
  }
  
  public async sendResetPassword(to, token) {
    const data = {
      from: 'Other Supply <hello@othersupply.com>',
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