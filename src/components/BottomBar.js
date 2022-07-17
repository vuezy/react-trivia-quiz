import styles from './BottomBar.module.css'

export default function BottomBar(props) {
  return <div className={styles.container}>{props.children}</div>
}