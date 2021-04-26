import axios from 'axios';
import Alert from './../schemas/alert';
import User from './../schemas/user';
import { getStats } from './../routes/discogs';

import puppeteer, { ttl } from './puppeteer';

import * as cron from 'node-cron';

export class AlertJob {
  public async execute() {
    console.log('Running alert jobs every 60 minutes');
    cron.schedule('0 0 */1 * * *', async () => {
      console.log('Run alert check');
      const cursor = Alert.find().cursor();
      for (let alert: any = await cursor.next(); alert != null; alert = await cursor.next()) {
        for (const [price, userObj] of Object.entries(alert.maxPrice)) {
          const userId = Object.keys(alert.maxPrice[price])[0];
          // update lowest price on alert detail
          const user: any = await User.findById(userId);
          const data = await getStats(alert.item.id, user.discogs);
          const lowestPrice = data.lowest_price.value;
          try {
            if (lowestPrice) updateAlertDetail(alert, lowestPrice);
            if (lowestPrice && lowestPrice <= parseFloat(price)) {
              axios.post(
                `${process.env.API_URL}/messages/update`,
                {
                  data: {
                    to: user.phone,
                    body: `
                    This is Other Supply with some good news.\n\n${alert.item.artist} - ${alert.item.title} has been listed for ${lowestPrice}.\nhttps://www.discogs.com/sell/release/${alert.item.id}?sort=price%2Casc`
                  }
                }
              ).then(() => console.log(`Sent alert to ${user.username} for ${alert.item.artist} ${alert.item.title}. Release Price ${lowestPrice}. Alert Price: ${price}`)
              ).catch(err => console.error(err))
            }
          } catch (err) {
            console.error(err);
          }
        }
      }
    })
  }
}

async function updateAlertDetail(alert, currentLowPrice) {
  try {
    let doc = await Alert.findOneAndUpdate({ _id: alert._id }, { currentLowPrice }, { upsert: true });
  } catch (error) {
    console.error(error);
  }
}