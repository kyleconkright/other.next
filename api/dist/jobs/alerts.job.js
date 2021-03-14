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
exports.AlertJob = void 0;
const axios_1 = require("axios");
const alert_1 = require("./../schemas/alert");
const user_1 = require("./../schemas/user");
const puppeteer_1 = require("./puppeteer");
const cron = require("node-cron");
class AlertJob {
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Running alert jobs every 60 minutes');
            cron.schedule('* * * * *', () => __awaiter(this, void 0, void 0, function* () {
                console.log('Run alert check');
                const cursor = alert_1.default.find().cursor();
                for (let alert = yield cursor.next(); alert != null; alert = yield cursor.next()) {
                    const lowestPrice = yield puppeteer_1.default(`https://www.discogs.com/sell/release/${alert.item.id}?sort=price%2Casc`, alert.item.artist);
                    console.log(lowestPrice, alert.item.artist);
                    for (const [price, userObj] of Object.entries(alert.maxPrice)) {
                        const userId = Object.keys(alert.maxPrice[price])[0];
                        const user = yield user_1.default.findById(userId);
                        try {
                            if (lowestPrice && lowestPrice <= parseFloat(price)) {
                                axios_1.default.post(`/messages/update`, {
                                    data: {
                                        to: user.phone,
                                        body: `
                    This is Other Supply with some good news.\n${alert.item.artist} - ${alert.item.title} has been listed for ${lowestPrice}.\nhttps://www.discogs.com/sell/release/${alert.item.id}?sort=price%2Casc`
                                    }
                                }).then(() => console.log(`Sent alert to ${user.username} for ${alert.item.artist} ${alert.item.title}. Release Price ${lowestPrice}. Alert Price: ${price}`)).catch(err => console.error(err));
                            }
                        }
                        catch (err) {
                            console.error(err);
                        }
                    }
                }
            }));
            cron.schedule("*/30 * * * * *", () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const notInStock = yield puppeteer_1.ttl();
                    if (!notInStock) {
                        axios_1.default.post(`/messages/update`, {
                            data: {
                                to: '8122397047',
                                body: `https://www.turntablelab.com/products/run-the-jewels-run-the-jewels-2-vinyl-2lp-turntable-lab-exclusive`
                            }
                        }).then(() => console.log(`In stock. Text sent.`)).catch(err => console.error(err));
                    }
                }
                catch (err) {
                    console.error(err);
                }
            }));
        });
    }
}
exports.AlertJob = AlertJob;
// www.discogs.com/sell/release/14314482?price1=&price2={maxPrice}
//# sourceMappingURL=alerts.job.js.map