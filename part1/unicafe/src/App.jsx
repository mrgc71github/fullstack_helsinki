import { useState } from 'react'

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const title = 'give feedback'

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  const total = good + neutral + bad

  const buttons = [
    { text: 'good', onClick: handleGood },
    { text: 'neutral', onClick: handleNeutral },
    { text: 'bad', onClick: handleBad },
  ]

  const Statistics = (props) => {
    {
      if (total === 0) {
        return <p>No feedback given</p>
      }
    }
    return (
      <div>
        <table>
          <tbody>
            <StaticLine text="good" value={good} />
            <StaticLine text="neutral" value={neutral} />
            <StaticLine text="bad" value={bad} />
            <StaticLine text="all" value={total} />
            <StaticLine text="average" value={(good - bad) / total} />
            <StaticLine text="positive" value={(good / total) * 100 + ' %'} />
          </tbody>
        </table>
      </div>
    )
  }

  const StaticLine = (props) => {
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    )
  }

  return (
    <div>
      <h2>{title}</h2>
      {buttons.map((button, index) => (
        <button key={index} onClick={button.onClick}>
          {button.text}
        </button>
      ))}
      <h2>Statistics</h2>
      <Statistics />
    </div>
  )
}

export default App
