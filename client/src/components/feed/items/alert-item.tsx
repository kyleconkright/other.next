import styles from './../../../styles/components/feed-item.module.css';
import alertStyle from './../../../styles/components/alert-item.module.css';
import Link from 'next/link';

export default function AlertItem(props) {
  const { item } = props;

  const href = `https://www.discogs.com/sell/release/${item.item.id}`

  return (
    <li className={styles.searchItem}>
      <Link href={`/?id=${item._id}`} as={`/feed/${item._id}`}>
        <a className={styles.itemLink}>
          <div>
            <h4 dangerouslySetInnerHTML={{ __html: item.item.artist + ' - ' + item.item.title }}></h4>
          </div>
          <div className={styles.itemImage}>
            <img src={item.item.cover} />
            <div className={alertStyle.prices}>
              <div className={alertStyle.price}>
                <span>available</span>
                <span className="number">${item.currentLowPrice}</span>
              </div>
              <div className={alertStyle.price}>
                <span>Alert</span>
                <span className="number">${item.price}</span>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </li>
  )
}