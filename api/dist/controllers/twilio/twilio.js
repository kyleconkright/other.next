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
exports.TwilioClient = void 0;
const twilio_1 = require("twilio");
class TwilioClient {
    constructor() {
        this.accountSid = process.env.TWILIO_ACCOUNTSID;
        this.authToken = process.env.TWILIO_AUTH_TOKEN;
        this.client = new twilio_1.Twilio(this.accountSid, this.authToken);
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { to, body } = data;
            const message = yield this.client.messages.create({
                body,
                from: process.env.TWILIO_FROM,
                to
            });
        });
    }
}
exports.TwilioClient = TwilioClient;
//# sourceMappingURL=twilio.js.map