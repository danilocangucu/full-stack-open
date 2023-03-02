import { useState } from 'react'

const App = () => {
  const [ counter, setCounter ] = useState(0)
  console.log('rendering with counter value', counter)

  const increaseByOne = () => {
    console.log('increasing, value before', counter)
    setCounter(counter+1)
  }
  const decreaseByOne = () => {
    console.log('decreasing, value before', counter)
    setCounter(counter-1)
  }
  const setToZero = () => {
    console.log('resetting to zero, value before', counter)
    setCounter(0)
  }

  return (
    <div>
      <Display counter={counter}/>
      <Button text='plus' handleClick={increaseByOne}/>
      <Button text='minus' handleClick={decreaseByOne}/>
      <Button text='reset' handleClick={setToZero}/>
    </div>
  )
}

const Display = ({ counter }) => <div>{ counter }</div>

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

export default App