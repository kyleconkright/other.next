import styles from './button.module.scss'

export default function Button(props) {
  return (
    <button
      type="button"
      className={styles.otherButton}
      onClick={props.onClick}
    >
      { props.text }
    </button>
  )
}