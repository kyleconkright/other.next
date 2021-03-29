import * as cron from 'node-cron';
import axios from 'axios';
import FeedItem from './../../schemas/feedItem';

const tokenUrl = 'https://api.ebay.com/identity/v1/oauth2/token';
const secret = Buffer.from(`${process.env.EBAY_CLIENT_ID}:${process.env.EBAY_CLIENT_SECRET}`).toString('base64');

const params = new URLSearchParams()

params.append("grant_type", "client_credentials")
params.append("scope", "https://api.ebay.com/oauth/api_scope")

const config = {
  headers: {
    Authorization: `Basic ${secret}`,
    'Content-Type': 'application/x-www-form-urlencoded',
    "X-EBAY-C-MARKETPLACE-ID": "EBAY_US"
  }
};

let access_token;

export class EbayClient {
  public async execute() {
    this.getAccessToken();
    cron.schedule("0 0 */1 * * *", async () => {
      try {
        await this.getAccessToken();
        await this.defaultListings();
      } catch (error) {
        console.error(error);
        return ({ message: 'Something went wrong: Ebay' })
      }
    })
  }

  public async getAccessToken() {
    try {
      access_token = (await axios.post(tokenUrl, params, config)).data.access_token;
    } catch (error) {
      console.error(error.response.data);
    }
  }

  public async defaultListings() {
    const browseConfig = {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "X-EBAY-C-MARKETPLACE-ID": "EBAY_US",
      }
    }
    try {
      const { itemSummaries: items } = (await axios.get(`https://api.ebay.com/buy/browse/v1/item_summary/search?q=&category_ids=176985&limit=30&filter=sellers:{deepdiscount|moviemars|get_importcds}`, browseConfig)).data;
      await FeedItem.deleteMany({ type: 'ebay-listing' });
      items.map(async item => handleListing(item, 'ebay-listing'));
    } catch (error) {
      console.error(error.response.data);
    }
  }

  public async search(query) {
    const q = query.split(' ').join('+');
    const browseConfig = {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "X-EBAY-C-MARKETPLACE-ID": "EBAY_US",
      }
    }
    let results;
    try {
      const { itemSummaries: items } = (await axios.get(`https://api.ebay.com/buy/browse/v1/item_summary/search?q=${q}&category_ids=176985&limit=30`, browseConfig)).data;
      results = items.map(item => formatListing(item, 'ebay-search'));
    } catch (error) {
    }
    return results;
  }
}

function formatListing(item, type) {
  return ({
    title: item.title,
    url: `${item.itemWebUrl}&mkcid=1&mkrid=711-53200-19255-0&siteid=0&campid=5338796988`,
    origin: item.itemWebUrl,
    flair: item.condition,
    price: item.price.value,
    imageUrl: item.thumbnailImages[0].imageUrl,
    createdUtc: null,
    type
  })
}

async function handleListing(item, type) {
  const listing = formatListing(item, type)
  try {
    await FeedItem.create(listing);
  } catch (error) {
    console.error(error);
    return error;
  }
  return listing;
}

https://www.ebay.com/itm/BEYONC-LEMONADE-YELLOW-180-GRAM-VINYL-GATEFOLD-COVER-NEW-VINYL/292300000413?hash=item440e700c9d:g:9AkAAOSwj4ldTN8V&mkcid=1&mkrid=711-53200-19255-0&siteid=0&campid=5338796988&customid=&toolid=10001&mkevt=1