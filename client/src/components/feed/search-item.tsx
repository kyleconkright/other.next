import styles from './../../styles/components/feed-item.module.scss';

export default function SearchItem(props) {
  const { item } = props;
  return (
    <li className={styles.searchItem}>
      <a href={item.url} target="_blank">
        <div>
          <h4 dangerouslySetInnerHTML={{ __html: item.title }}></h4>
        </div>
        <div>
          <img src={item.imageUrl} />
          <span className="number">{item.price}</span>
        </div>
      </a>
    </li>
  )
}