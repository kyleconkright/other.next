import styles from './button.module.scss'

export default function SecondaryButton(props) {
  return (
    <button
      type="button"
      className={styles.otherSecondaryButton}
      onClick={props.onClick}
    >
      { props.text }
    </button>
  )
}