import { useState } from "react";

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ Good, Neutral, Bad }) => {
  const sum = Good + Neutral + Bad;
  if (sum == 0) {
    return <h1>No feedback</h1>;
  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticsLine text="Good" value={Good} />
          <StatisticsLine text="Neutral" value={Neutral} />
          <StatisticsLine text="Bad" value={Bad} />
          <StatisticsLine text="Total" value={sum} />
          <StatisticsLine
            text="Average"
            value={(Good * 1 + Neutral * 0 + Bad * -1) / sum}
          />
          <StatisticsLine
            text="Positive"
            value={`${parseFloat(Good / sum) * 100} %`}
          />
        </tbody>
      </table>
    </div>
  );
};

const Button = ({ Click, Text }) => {
  return <button onClick={Click}>{Text}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };
  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };
  const handleBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>

      <Button Click={handleGood} Text="Good" />
      <Button Click={handleNeutral} Text="Neutral" />
      <Button Click={handleBad} Text="Bad" />

      <Statistics Good={good} Neutral={neutral} Bad={bad} />
    </div>
  );
};

export default App;
