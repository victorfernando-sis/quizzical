import React from "react"
import { nanoid } from "nanoid"

export default function Question(props) {
    const choicesArray = props.incorrect_answers.concat(props.correct_answer).sort()
    
    function setClasses(item) {
        const classes = []
        if (item === props.userChoice)
            classes.push("bkg-chosen-answer")

        if (props.showResults) {
            classes.push("disabled")
            if (item === props.correct_answer)
                classes.push("bkg-green")
            if (item === props.userChoice && props.incorrect_answers.includes(item))
                classes.push("bkg-red")
        }
        return classes.join(" ")
    }

    const choiceHtml = choicesArray.map(item => {
        return <div
            key={nanoid()}
            className={`choice-el ${setClasses(item)}`}
            onClick={() => { props.handleClick(props.id, item, props.correct_answer) }}>{decodeURIComponent(item)}</div>
    })

    return (
        <div className="question-container">
            <h3 className="question-title">{decodeURIComponent(props.question)}</h3>
            <div className="choices-container">
                {choiceHtml}
            </div>
        </div>
    )
}