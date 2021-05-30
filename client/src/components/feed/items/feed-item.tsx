import styles from './../../../styles/components/feed-item.module.css';

export default function FeedItem(props) {
  const { item } = props;
  return (
    <li className={styles.searchItem}>
      <a className={styles.itemLink} href={item.url ? item.url : item.origin} target="_blank">
        <div>
          <h4 className={styles.itemTitle} dangerouslySetInnerHTML={{ __html: item.title }}></h4>
        </div>
        <div className={styles.itemImage}>
          { item.imageUrl.indexOf('http') !== -1 ? (
            <img src={item.imageUrl} />
          ) : (
            <div className={styles.imagePlaceholder}></div>
          )}
          <span className={styles.meta}>{item.flair}</span>
        </div>
      </a>
    </li>
  )
}