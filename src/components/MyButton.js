import styles from './MyButton.module.css'

export default function MyButton(props) {
  return <button className={styles.btn} onClick={props.handleClick}>{props.text}</button>
}