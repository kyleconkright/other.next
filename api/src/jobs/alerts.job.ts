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
      for (let alert = await cursor.next(); alert != null; alert = await cursor.next()) {
        const lowestPrice = await puppeteer(`https://www.discogs.com/sell/release/${alert.item.id}?sort=price%2Casc`, alert.item.artist);
        console.log(lowestPrice, alert.item.artist);
        for (const [price, userObj] of Object.entries(alert.maxPrice)) {
          const userId = Object.keys(alert.maxPrice[price])[0];
          const user: any = await User.findById(userId);
          try {
            if (lowestPrice && lowestPrice <= parseFloat(price)) {
              axios.post(
                `/messages/update`,
                {
                  data: {
                    to: user.phone,
                    body: `
                    This is Other Supply with some good news.\n${alert.item.artist} - ${alert.item.title} has been listed for ${lowestPrice}.\nhttps://www.discogs.com/sell/release/${alert.item.id}?sort=price%2Casc`
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
    cron.schedule("*/30 * * * * *", async () => {
      try {
        const notInStock = await ttl();
        if(!notInStock) {
          axios.post(
            `/messages/update`,
            {
              data: {
                to: '8122397047',
                body: `https://www.turntablelab.com/products/run-the-jewels-run-the-jewels-2-vinyl-2lp-turntable-lab-exclusive`
              }
            }
          ).then(() => console.log(`In stock. Text sent.`)
          ).catch(err => console.error(err))
        }
      } catch(err) {
        console.error(err);
      }
    });
  }
}

// www.discogs.com/sell/release/14314482?price1=&price2={maxPrice}