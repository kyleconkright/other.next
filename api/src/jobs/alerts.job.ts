import axios from 'axios';
import Alert from './../schemas/alert';
import User from './../schemas/user';
import { getStats } from './../routes/discogs';

import * as cron from 'node-cron';
 
export class AlertJob {
  public async execute() {
    console.log('Running alert jobs every 60 minutes');
    cron.schedule('*/59 * * * *', async () => {
      console.log('Run alert check');
      const cursor = Alert.find().cursor();
      for (let alert = await cursor.next(); alert != null; alert = await cursor.next()) {
        Object.keys(alert.maxPrice).forEach(async price => {
          const userId = Object.keys(alert.maxPrice[price])[0];
          try {
            const user: any = await User.findById(userId);
            const release = await getStats(alert.item.id, user.discogs);
            if(release.lowest_price.value <= price) {
              console.log(`Sent alert to ${user.username} for ${alert.item.artist} ${alert.item.title}. Release Price ${release.lowest_price.value}. Alert Price: ${price}`)
              axios.post(
                'http://localhost:5001/messages/update',
                { 
                  data: {
                    to: user.phone,
                    body: `
                      This is Other Supply with some good news.
                      The record you had your eye on has dropped to your filtered price.
                      https://www.discogs.com/sell/release/${alert.item.id}?price1=&price2=${price}&currency=USD`
                  }
                }
              );
            }
          } catch(err) {
            console.error(err);
          }
        });
      }
    });
  }
}

// www.discogs.com/sell/release/14314482?price1=&price2={maxPrice}