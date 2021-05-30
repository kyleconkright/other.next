import styles from './../../../styles/components/feed-item.module.css';

export default function SearchItem(props) {
  const { item } = props;
  return (
    <li className={styles.searchItem}>
      <a className={styles.itemLink} href={item.url} target="_blank">
        <div>
          <h4 className={styles.itemTitle} dangerouslySetInnerHTML={{ __html: item.title }}></h4>
        </div>
        <div className={styles.itemImage}>
          <img src={item.imageUrl} />
          <span className={`${styles.meta} number`}>{item.price}</span>
        </div>
      </a>
    </li>
  )
}