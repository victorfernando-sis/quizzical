
import React from "react"
import IntroScreen from "./Components/IntroScreen"
import QuizScreen from "./Components/QuizScreen"
import './App.css';

export default function App() {

    const [currentPage, setCurrentPage] = React.useState("IntroScreen")

    const pages = {
        'IntroScreen': <IntroScreen setCurrentPage={setCurrentPage} />,
        'QuizScreen': <QuizScreen setCurrentPage={setCurrentPage} />
    }
    return (
        pages[currentPage]
    )
}