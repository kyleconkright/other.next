const ProductAdvertisingAPIv1 = require('paapi5-nodejs-sdk');
let amazon = ProductAdvertisingAPIv1.ApiClient.instance;
const api = new ProductAdvertisingAPIv1.DefaultApi();


amazon.accessKey = process.env.AMAZON_KEY_ID;
amazon.secretKey = process.env.AMAZON_SECRET;

amazon.host = 'webservices.amazon.com';
amazon.region = 'us-east-1';

let searchRequest = new ProductAdvertisingAPIv1.SearchItemsRequest();

searchRequest['PartnerTag'] = 'othersuppl0a5-20';
searchRequest['PartnerType'] = 'Associates';

searchRequest['ItemCount'] = 20;

searchRequest['SearchIndex'] = 'Music';
searchRequest['Availability'] = 'Available';
searchRequest['BrowseNodeId'] = '14772275011';
searchRequest['Resources'] = ['Images.Primary.Medium', 'ItemInfo.Title', 'Offers.Listings.Price'];


export class AmazonClient {

  public search = (query) => {
    searchRequest['Keywords'] = query.keyword;
    // if(query.keyword) searchRequest['Keywords'] = query.keyword;
    searchRequest['MaxPrice'] = query.price;
    
    return new Promise((resolve, reject) => {
      try {
        api.searchItems(searchRequest, (error, data, response) => {
          resolve({results: data.SearchResult?.Items});
        });
      } catch (ex) {
        console.log('Exception: ' + ex);
        reject(ex);
      }
    });
  }

  formatListing(item, type) {
    return ({
      title: item.ItemInfo.Title.DisplayValue,
      url: item.DetailPageURL,
      origin: item.DetailPageURL,
      flair: null,
      price: item.Offers.Listings[0].Price.Amount,
      imageUrl: item.Images.Primary.Medium.URL,
      createdUtc: null,
      type
    })
  }
}
