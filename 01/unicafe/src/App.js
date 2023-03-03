import { useState } from 'react'

const Header = () => <h1>give feedback</h1>

const Statistics = () => <h1>statistics</h1>

const Button = ({ handleClick, name }) => <button onClick={handleClick}>{name}</button>

const Results = ({ evaluationsLog, allNumbers, allNames }) => {
  if (evaluationsLog.length === 0){
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <>
      <div>{allNames[0]} {allNumbers[0]}</div>
      <div>{allNames[1]} {allNumbers[1]}</div>
      <div>{allNames[2]} {allNumbers[2]}</div>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [evaluationsLog, setEvaluationsLog] = useState([])

  const handleGood = () => {
    setGood(good + 1)
    setEvaluationsLog(evaluationsLog.concat('good'))
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setEvaluationsLog(evaluationsLog.concat('neutral'))
  }

  const handleBad = () => {
    setBad(bad + 1)
    setEvaluationsLog(evaluationsLog.concat('bad'))
  }

  const allNumbers = [good, neutral, bad]
  const allNames = ["good", "neutral", "bad"]

  return (
    <div>
      <Header />
      <Button handleClick={handleGood} name="good"/>
      <Button handleClick={handleNeutral} name="neutral"/>
      <Button handleClick={handleBad} name="bad"/>
      <Statistics />
      <Results evaluationsLog={evaluationsLog} allNumbers={allNumbers} allNames={allNames}/>
    </div>
  )
}

export default App