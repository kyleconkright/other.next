import styles from './search-item.module.scss';

export default function SearchItem(props) {
  const { item } = props;
  return (
    <li className={styles.searchItem}>
      <a href={item.itemWebUrl} target="_blank">
        <div>
          <h4>{item.title}</h4>
        </div>
        <div>
          <img src={item.thumbnailImages[0].imageUrl} />
          <span className="number">{item.price.value}</span>
        </div>
      </a>
    </li>
  )
}