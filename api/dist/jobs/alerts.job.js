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
const discogs_1 = require("./../routes/discogs");
const cron = require("node-cron");
class AlertJob {
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Running alert jobs every 60 minutes');
            cron.schedule('*/59 * * * *', () => __awaiter(this, void 0, void 0, function* () {
                console.log('Run alert check');
                const cursor = alert_1.default.find().cursor();
                for (let alert = yield cursor.next(); alert != null; alert = yield cursor.next()) {
                    Object.keys(alert.maxPrice).forEach((price) => __awaiter(this, void 0, void 0, function* () {
                        const userId = Object.keys(alert.maxPrice[price])[0];
                        try {
                            const user = yield user_1.default.findById(userId);
                            const release = yield discogs_1.getStats(alert.item.id, user.discogs);
                            if (release.lowest_price.value <= price) {
                                console.log(`Sent alert to ${user.username} for ${alert.item.artist} ${alert.item.title}. Release Price ${release.lowest_price.value}. Alert Price: ${price}`);
                                axios_1.default.post('http://localhost:5001/messages/update', {
                                    data: {
                                        to: user.phone,
                                        body: `
                      This is Other Supply with some good news.
                      The record you had your eye on has dropped to your filtered price.
                      https://www.discogs.com/sell/release/${alert.item.id}?price1=&price2=${price}&currency=USD`
                                    }
                                });
                            }
                        }
                        catch (err) {
                            console.error(err);
                        }
                    }));
                }
            }));
        });
    }
}
exports.AlertJob = AlertJob;
// www.discogs.com/sell/release/14314482?price1=&price2={maxPrice}
//# sourceMappingURL=alerts.job.js.map