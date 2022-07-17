import { useState } from 'react'
import Home from './Home'
import Quiz from './Quiz'
import Result from './Result'

export default function App() {
  const [ isStarted, setIsStarted ] = useState(false)
  const [ isEnded, setIsEnded ] = useState(false)
  const [ isClicked, setIsClicked ] = useState(false)
  const [ seconds, setSeconds ] = useState(60)
  const [ allQuestions, setAllQuestions ] = useState([])

  function setTimer() {
    const timer = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds === 0) {
          clearInterval(timer)
          setIsEnded(true)
          return 0
        }
        return prevSeconds - 1
      })
    }, 1000)
  }

  async function startQuiz() {
    if (!isClicked) {
      setIsClicked(true)
      const response = await fetch('https://opentdb.com/api.php?amount=10')
      let count = 0
      const data = (await response.json()).results.map(result => {
        count++
        return { id: count, ...result, your_answer: '' }
      })
      
      setAllQuestions(data)
      setIsStarted(true)
      setTimer()
    }
  }

  function selectThisAnswer(questionId, choice) {
    setAllQuestions(prevAllQuestions => prevAllQuestions.map(question => {
      return question.id === questionId ? { ...question, your_answer: choice } : question
    }))
  }

  function endQuiz() {
    // implicitly end the quiz
    setSeconds(0)
  }

  function resetStates() {
    setIsEnded(false)
    setIsStarted(false)
    setIsClicked(false)
    setSeconds(60)
  }

  return (
    <div>
      {!isStarted && <Home startQuiz={startQuiz} />}
      {
        isStarted && !isEnded &&
        <Quiz
          seconds={seconds}
          allQuestions={allQuestions}
          selectThisAnswer={selectThisAnswer}
          endQuiz={endQuiz}
        />
      }
      {isEnded && <Result allQuestions={allQuestions} resetStates={resetStates} />}
    </div>
  )
}