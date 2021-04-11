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
  // https://www.amazon.com/s?i=popular&bbn=14772275011&rh=n%3A14772275011%2Cp_n_availability%3A2661600011%2Cp_n_specials_match%3A21213697011&dc&fs=true&qid=1618089280&rnid=21213696011&ref=sr_nr_p_n_specials_match_1
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
