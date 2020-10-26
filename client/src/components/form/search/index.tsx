import styles from './search.module.scss';

export interface SearchProps {
  placeholder?: string;
}

function search(props: SearchProps) {
  return <input placeholder={props.placeholder} className={styles.otherSearch} type="text"/>
}

export default search;