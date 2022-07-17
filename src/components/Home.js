import logo from '../logo.svg'
import styles from './Home.module.css'

export default function Home(props) {
  return (
    <div className={styles.container}>
      <img src={logo} className={styles.logo} alt="react-logo" />
      <h1>TRIVIA QUIZ</h1>
      <p>
        You have 60 seconds to answer 10 trivia questions.
        <br />
        Click <span className={styles.bold}>START</span> when you are ready!!!
      </p>
      <button className={styles.button} onClick={props.startQuiz}>START</button>
    </div>
  )
}