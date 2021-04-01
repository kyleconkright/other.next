import styles from './../../styles/components/feed-item.module.scss';

export default function FeedItem(props) {
  const { item } = props;
  return (
    <li className={styles.searchItem}>
      <a href={item.url ? item.url : item.origin} target="_blank">
        <div>
          <h4>{item.title}</h4>
        </div>
        <div>
          { item.imageUrl.indexOf('http') !== -1 ? (
            <img src={item.imageUrl} />
          ) : (
            <div className={styles.imagePlaceholder}></div>
          )}
          <span>{item.flair}</span>
        </div>
      </a>
    </li>
  )
}