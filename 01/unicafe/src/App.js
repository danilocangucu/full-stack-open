import { useState } from 'react'

const Header = () => <h1>give feedback</h1>

const StatisticsHeader = () => <h1>statistics</h1>

const Button = ({ handleClick, evaluation }) => <button onClick={handleClick}>{evaluation.name}</button>

const StatisticLine = ({ evaluation }) => {
  if (evaluation.name === 'positive'){
    return <tr><td>{evaluation.name}</td><td>{evaluation.value} %</td></tr>
  }
  return <tr><td>{evaluation.name}</td><td>{evaluation.value}</td></tr>
}

const Statistics = ({ good, neutral, bad, all, average, positive }) => {

  if (all.value === 0){
    return <div>No feedback given</div>
  }

  return (
      <table>
        <tbody>
          <StatisticLine evaluation={good}/>
          <StatisticLine evaluation={neutral}/>
          <StatisticLine evaluation={bad}/>
          <StatisticLine evaluation={all}/>
          <StatisticLine evaluation={average}/>
          <StatisticLine evaluation={positive}/>
        </tbody>
      </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState({ name: "good", value: 0 })
  const [neutral, setNeutral] = useState({ name: "neutral", value: 0 })
  const [bad, setBad] = useState({ name: "bad", value: 0 })
  const [allEvaluations, setAllEvaluations] = useState({ name: "all", value: 0 })
  const [average, setAverage] = useState({ count: 0 })
  const positive = { name: "positive", value: (good.value/(allEvaluations.value*100))*10000 }
  const newAverage = { name: "average", value: (average.count)/(allEvaluations.value) }

  const handleGood = () => {
    const newGood = { ...good, value: good.value + 1 }
    const newAllEvaluations = { ...allEvaluations, value: allEvaluations.value + 1 }
    const newAverage = { count: average.count + 1 }
    setGood(newGood)
    setAllEvaluations(newAllEvaluations)
    setAverage(newAverage)
  }

  const handleNeutral = () => {
    const newNeutral = { ...neutral, value: neutral.value + 1 }
    const newAllEvaluations = { ...allEvaluations, value: allEvaluations.value + 1 }
    setNeutral(newNeutral)
    setAllEvaluations(newAllEvaluations)
  }

  const handleBad = () => {
    const newBad = { ...bad, value: bad.value + 1 }
    const newAllEvaluations = { ...allEvaluations, value: allEvaluations.value + 1 }
    const newAverage = { count: average.count - 1 }
    setBad(newBad)
    setAllEvaluations(newAllEvaluations)
    setAverage(newAverage)
  }

  return (
    <div>
      <Header />
      <Button handleClick={handleGood} evaluation={good}/>
      <Button handleClick={handleNeutral} evaluation={neutral}/>
      <Button handleClick={handleBad} evaluation={bad}/>
      <StatisticsHeader />
      <Statistics good={good} neutral={neutral} bad={bad} all={allEvaluations} average={newAverage} positive={positive}/>
    </div>
  )
}

export default App