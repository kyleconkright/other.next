"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailgunClient = void 0;
const mailgun = require("mailgun-js");
class MailgunClient {
    constructor() {
        this.DOMAIN = 'sandboxe1d3d29b5b084a8988e494a8ce4bf8bf.mailgun.org';
        this.mg = mailgun({ apiKey: process.env.MAILGUN_API, domain: this.DOMAIN });
    }
    sendRegistrationCode(to, token) {
        return __awaiter(this, void 0, void 0, function* () {
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
            yield this.mg.messages().send(data, function (error, body) {
                return body;
            });
        });
    }
    sendResetPassword(to, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                from: 'Other Supply <hello@othersupply.com>',
                to,
                subject: 'Hello',
                html: `
        <h2>Click below to reset your password.</h2>
        <p>${process.env.CLIENT_URL}/account/forgot_password/reset/${token}</p>
      `
            };
            yield this.mg.messages().send(data, function (error, body) {
                return body;
            });
        });
    }
}
exports.MailgunClient = MailgunClient;
//# sourceMappingURL=mailgun.js.map