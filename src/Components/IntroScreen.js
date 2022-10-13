import React from "react"

export default function IntroScreen(props) {

    function startQuiz() {
        props.setCurrentPage('QuizScreen')
    }

    return (
        <div className="intro-screen">
            <h1 className="game-title">Quizzical</h1>
            <p className="game-description">Answer tricky questions and test your worldly knowledge in one of our many free, online quiz games!</p>
            <button onClick={startQuiz}> Start Quiz</button>
        </div>
    )
}