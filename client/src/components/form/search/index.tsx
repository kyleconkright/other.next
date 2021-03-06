import styles from './../input.module.css';

export interface SearchProps {
  placeholder?: string;
  name?: string;
  type?: string;
  onChange?: (event: any) => void;
}

function search(props: SearchProps) {
  return <input placeholder={props.placeholder} onChange={props.onChange} name={props.name} className={styles.otherForm} type={props.type ? props.type : 'text'}/>
}

export default search;