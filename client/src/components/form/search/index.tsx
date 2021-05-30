import styles from './search.module.css';

export interface SearchProps {
  placeholder?: string;
  name?: string;
  type?: string;
  onChange?: (event: any) => void;
}

function search(props: SearchProps) {
  return <input placeholder={props.placeholder} onChange={props.onChange} className={styles.otherSearch} type={props.type ? props.type : 'text'}/>
}

export default search;