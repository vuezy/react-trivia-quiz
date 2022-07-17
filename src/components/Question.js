import { useState, useEffect } from 'react'
import styles from './Question.module.css'

export default function Question(props) {
  const [ choices, setChoices ] = useState([])
  useEffect(() => {
    if (props.type === 'multiple') {
      const randomChoices = [...props.incorrect_answers, props.correct_answer]
      for (let i = randomChoices.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1))
        const temp = randomChoices[i]
        randomChoices[i] = randomChoices[randomIndex]
        randomChoices[randomIndex] = temp
      }
      setChoices(randomChoices)
    }
    else {
      setChoices(['True', 'False'])
    }
  }, [props.question])


  let count = 0
  let questionClass = undefined
  if (!props.selectThisAnswer) {
    if (props.your_answer === props.correct_answer) {
      questionClass = styles.correct
    }
    else {
      questionClass = styles.incorrect
    }
  }

  const choicesElements = choices.map(choice => {
    count++
    if (props.selectThisAnswer) {
      return (
        <li
          key={count}
          className={props.your_answer === choice ? styles.selected : undefined}
          dangerouslySetInnerHTML={{ __html: choice }}
          onClick={() => props.selectThisAnswer(props.id, choice)}
        >
        </li>
      )
    }
    
    let choiceClass = undefined
    if (choice === props.correct_answer) {
      choiceClass = styles.true
    }
    else if (props.your_answer === choice) {
      choiceClass = styles.false
    }

    return (
      <li
        key={count}
        className={choiceClass}
        dangerouslySetInnerHTML={{ __html: choice }}
      >
      </li>
    )
  })

  
  return (
    <div>
      <p className={questionClass} dangerouslySetInnerHTML={{ __html: props.question }}></p>
      <ul>{choicesElements}</ul>
    </div>
  )
}