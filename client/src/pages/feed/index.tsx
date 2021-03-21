import { useEffect, useState } from 'react';
import { OtherHttp } from '../../http';

import FeedItem from './../../components/feed/feed-item';

import styles from './feed.module.scss';

function feed() {
  const http = new OtherHttp();

  const [feed, setFeed] = useState([]);

  useEffect(() => {
    getFeed();
  }, [])

  async function getFeed() {
    try {
      const res = await http.instance.get(`/feed/reddit/releases`);
      setFeed(res.data.feed);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div id={styles.feedContent}  className={styles.feedList}>
      <section>
        <h3><a href="https://reddit.com/r/VinylReleases/new" target="_blank">r/VinylReleases/new</a></h3>
        <ul>
          {feed.length != 0 ? feed.map(item => (
            <FeedItem key={item._id} item={item}></FeedItem>
          )) : null}
        </ul>
      </section>
    </div>
  )
}

export default feed;