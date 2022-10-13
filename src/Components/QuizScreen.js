import React from "react"
import Question from "./Question"
import { nanoid } from "nanoid"

export default function QuizScreen(props) {

    const [questions, setQuestion] = React.useState([])
    const [userAnswers, setUserAnswers] = React.useState([])
    const [showResults, setShowResults] = React.useState(false)
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        // Fetch questions and add an ID for each one
        getRandomQuestions()
            .then(data => {
                return setQuestion(data.results.map(item => {
                    return { ...item, id: nanoid() }
                }))
            })
    }, [])

    async function getRandomQuestions() {
        setLoading(true)
        const res = await fetch('https://opentdb.com/api.php?amount=5&category=27&encode=url3986')
        const data = await res.json()
        setLoading(false)
        return data
    }

    function chooseAnswer(questionId, value, correctAnswer) {
        const foundSavedAnswer = userAnswers.find(item => item.questionId === questionId)
        setUserAnswers(prevAnswers => {
            return (foundSavedAnswer) ?
                prevAnswers.map(item => {
                    return item.questionId === questionId ?
                        { ...item, chosenAnswer: value } : item
                }) :
                [...prevAnswers, { questionId: questionId, correctAnswer: correctAnswer, chosenAnswer: value }]
        })
    }

    const questionsHml = questions.map(item => {
        const chosen = userAnswers.find(answers => answers.questionId === item.id)
        return <Question
            key={item.id}
            userChoice={chosen && chosen.chosenAnswer}
            handleClick={chooseAnswer}
            showResults={showResults}
            {...item} />
    })

    function checkAnswers() {
        setShowResults(prev => !prev)
    }

    function endQuiz() {
        props.setCurrentPage("IntroScreen")
    }

    function countCorrectAnswers() {
        const correct = userAnswers.filter(item => item.correctAnswer === item.chosenAnswer)
        return correct.length
    }
    return (
        <>
            {loading ? <h2>Loading...</h2> :
            <div className="quiz-screen">
                {questionsHml}
                <div>
                    {!showResults && <button onClick={checkAnswers}>Check Answers</button>}
                    {showResults && <div className="result-container">
                        <h3>You scored {countCorrectAnswers()}/5 correct answers</h3>
                        <button onClick={endQuiz}>Play again</button>
                    </div>}
                </div>
            </div>}
        </>
    )
}