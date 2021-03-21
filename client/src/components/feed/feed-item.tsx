import styles from './feed-item.module.scss';

export default function FeedItem(props) {
  const { item } = props;
  return (
    <li className={styles.feedItem}>
      <a href={item.url ? item.url : item.origin} target="_blank">
        <h4>{item.title}</h4>
        <span>{item.flair}</span>
      </a>
    </li>
  )
}