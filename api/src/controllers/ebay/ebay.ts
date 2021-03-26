import axios from 'axios';

const config = {
  headers: { Authorization: `Bearer ${process.env.EBAY_TOKEN}` }
};

class Ebay {
  public async search(q = '') {
    const url = q !== '' ? (
      `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${q}&category_ids=176985&limit=30`
    ) : (
      `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${q}&category_ids=176985&limit=30&filter=sellers:{deepdiscount|moviemars|get_importcds}`
    );
    try {
      const { data } = await (axios.get(url, config));
      return data;
    } catch(error) {
      console.error(error);
      return { message: error };
    }
  }
}

export default Ebay;
