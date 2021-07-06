import styles from './../input.module.css';

export interface InputProps {
  placeholder?: string;
  name?: string;
  type?: string;
  onChange?: (event: any) => void;
}

function input(props: InputProps) {
  return <input placeholder={props.placeholder} onKeyDown={props.onChange} name={props.name} className={styles.otherForm} type={props.type ? props.type : 'text'}/>
}

export default input;