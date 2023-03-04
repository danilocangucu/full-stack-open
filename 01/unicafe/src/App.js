import { useState } from 'react'

const Header = () => <h1>give feedback</h1>

const StatisticsHeader = () => <h1>statistics</h1>

const Button = ({ handleClick, name }) => <button onClick={handleClick}>{name}</button>

const StatisticLine = ({ text, value }) => {
  if (text === 'positive'){
    return (
      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>
    )
  }
  return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
  )
}

const Statistics = ({ allData }) => {

  if (allData[3].value === 0){
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
      <table>
        <tbody>
          <StatisticLine text={allData[0].name} value={allData[0].value} />
          <StatisticLine text={allData[1].name} value={allData[1].value} />
          <StatisticLine text={allData[2].name} value={allData[2].value} />
          <StatisticLine text={allData[3].name} value={allData[3].value} />
          <StatisticLine text={allData[4].name} value={allData[4].value} />
          <StatisticLine text={allData[5].name} value={allData[5].value} />
        </tbody>
      </table>
  )
}



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allEvaluations, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const positive = (good/(allEvaluations*100))*10000
  const averageCalculation = average/allEvaluations

  const allData = [{
    name: "good",
    value: good
  }, {
    name: "neutral",
    value: neutral
  },{
    name: "bad",
    value: bad
  },{
    name: "all",
    value: allEvaluations
  },{
    name: "average",
    value: averageCalculation
  },{
    name: "positive",
    value: positive
  }]

  const allDataCopy = [...allData]

  const handleGood = () => {
    setGood(good + 1)
    setAll(allEvaluations + 1)
    setAverage(average + 1)
    // allDataCopy[0] = {
    //   ...allDataCopy[0],
    //   value: good
    // }
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setAll(allEvaluations + 1)
    // allData[1] = {
    //   ...allData[1],
    //   value: neutral
    // }
  }

  const handleBad = () => {
    setBad(bad + 1)
    setAll(allEvaluations + 1)
    setAverage(average - 1)
    // allData[2] = {
    //   ...allData[2],
    //   value: bad
    // }
  }

  return (
    <div>
      <Header />
      <Button handleClick={handleGood} name="good"/>
      <Button handleClick={handleNeutral} name="neutral"/>
      <Button handleClick={handleBad} name="bad"/>
      <StatisticsHeader />
      <Statistics allData={allData}/>
    </div>
  )
}

export default App