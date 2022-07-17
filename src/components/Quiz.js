import { useState, useEffect } from 'react'
import Question from './Question'
import BottomBar from './BottomBar'
import MyButton from './MyButton'
import styles from './Quiz.module.css'

export default function Quiz(props) {
  const [ currentQuestionIdx, setCurrentQuestionIdx ] = useState(0)
  const [ currentQuestion, setCurrentQuestion ] = useState(props.allQuestions[currentQuestionIdx])

  useEffect(() => {
    setCurrentQuestion(props.allQuestions[currentQuestionIdx])
  }, [props.allQuestions])


  function backToPrevQuestion() {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(prevQuestionIdx => prevQuestionIdx - 1)
      setCurrentQuestion(props.allQuestions[currentQuestionIdx - 1])
    }
  }

  function goToNextQuestion() {
    if (currentQuestionIdx < 9) {
      setCurrentQuestionIdx(prevQuestionIdx => prevQuestionIdx + 1)
      setCurrentQuestion(props.allQuestions[currentQuestionIdx + 1])
    }
    else {
      props.endQuiz()
    }
  }

  return (
    <div className={styles.container}>
      <h3>{props.seconds}</h3>
      <h2>{currentQuestion.id}</h2>
      <Question
        {...currentQuestion}
        selectThisAnswer={props.selectThisAnswer}
      />
      <BottomBar>
        <MyButton handleClick={backToPrevQuestion} text="Back" />
        <MyButton handleClick={goToNextQuestion} text={currentQuestionIdx === 9 ? 'Finish' : 'Next'} />
      </BottomBar>
    </div>
  )
}