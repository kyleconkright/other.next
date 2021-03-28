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

export class EbayClient {
  public async execute() {
    cron.schedule("0 0 */1 * * *", this.update())
  }

  access_token;

  public async update() {
    try {
      this.access_token = (await axios.post(tokenUrl, params, config)).data.access_token;
      await this.search(this.access_token);
    } catch (error) {
      console.error(error.response.data);
    }
  }

  public async search(access_token, q = undefined) {
    let items;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "X-EBAY-C-MARKETPLACE-ID": "EBAY_US"
        }
      }
      const { data } = await axios.get(`https://api.ebay.com/buy/browse/v1/item_summary/search?q=${q ? q : ''}&category_ids=176985&limit=30${!q ? '&filter=sellers:{deepdiscount|moviemars|get_importcds}' : null}`, config);
      items = data.itemSummaries;
      const type = q ? 'ebay-search' : 'ebay-listing';
      await FeedItem.deleteMany({ type }, () => { });
      items.map(item => handleListing(item, type));
    } catch (error) {
      console.error(error.response.data);
    }
    try {
    } catch (error) {
      console.error(error);
    }
    return items;
  }
}

async function handleListing(item, type) {
  const listing = {
    title: item.title,
    url: item.itemWebUrl,
    origin: item.itemWebUrl,
    flair: item.condition,
    price: item.price.value,
    imageUrl: item.thumbnailImages[0].imageUrl,
    createdUtc: null,
    type
  }
  try {
    await FeedItem.create(listing);
  } catch (error) {
    console.error(error);
    return error;
  }
  return listing;
}

