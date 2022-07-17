import Question from './Question'
import BottomBar from './BottomBar'
import MyButton from './MyButton'
import styles from './Result.module.css'

export default function Result(props) {
  const allQuestionsElements = props.allQuestions.map(question => {
    return (
      <li key={question.id}>
        <span>{question.id}</span>
        <Question {...question} />
      </li>
    )
  })

  let score = 0
  props.allQuestions.forEach(question => {
    if (question.your_answer === question.correct_answer) {
      score += 10
    }
  })

  const color = {
    color: score > 50 ? 'green' : 'red'
  }

  return (
    <div className={styles.container}>
      <ol>{allQuestionsElements}</ol>
      <BottomBar>
        <h2>Score: <span style={color}>{score}/100</span></h2>
        <MyButton handleClick={props.resetStates} text="Home" />
      </BottomBar>
    </div>
  )
}