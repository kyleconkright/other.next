const amazon = require('amazon-product-api');

let client = amazon.createClient({
  awsId: process.env.AMAZON_KEY_ID,
  awsSecret: process.env.AMAZON_SECRET,
  awsTag: "othersuppl0a5-20"
});

const amazonApiOptions = {
  searchIndex: 'Music',
  responseGroup: 'ItemAttributes,Offers,Images',
  merchantId: 'Amazon',
  condition: 'New',
  availability: 'Available',
}

export const searchAmazon = async (query) => {
  try {
    const results = await client.itemSearch({
      browseNode: '14772275011',
      keywords: query,
      ...amazonApiOptions
    });
    console.log({results});
    return results;
  } catch (err) {
    throw new Error('Don\'t know what\'s wrong');
  }
}