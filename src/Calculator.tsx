import React, { useState, useEffect } from 'react';
import { NumericFormat } from 'react-number-format';
import { useNavigate } from 'react-router-dom';
import './App.css';

type NullableString = string | null;

const Calculator: React.FC = () => {
  const [preState, setPreState] = useState<NullableString>(null);
  const [curState, setCurState] = useState<NullableString>(null);
  const [input, setInput] = useState<string>("0");
  const [operator, setOperator] = useState<NullableString>(null);
  const [total, setTotal] = useState<boolean>(false);
  const [history, setHistory] = useState<string[]>([]);
  const navigate = useNavigate();

  const inputNum = (e: React.MouseEvent<HTMLDivElement>) => {
    const value = e.currentTarget.innerText;
    if (total) {
        setPreState(null);
        setCurState(value);    
        setInput(value);       
        setTotal(false);       
        return;
    }

    if (curState && curState.includes(".") && value === ".") return;

    setCurState((prev) => {
        return prev ? prev + value : value;
    });
};

  useEffect(() => {
    setInput(curState ?? "0");
  }, [curState]);

  const operatorType = (e: React.MouseEvent<HTMLDivElement>) => {
    const value = e.currentTarget.innerText;
    setTotal(false);
    setOperator(value);
    if (!curState) return;
    if (preState) {
      equals();
    } else {
      setPreState(curState);
      setCurState(null);
    }
  };

  const equals = () => {
    if (operator && preState && curState) {
      let calc: NullableString = null;
      switch (operator) {
        case "/":
          if (parseFloat(curState) === 0) {
            calc = "Err"; 
          } else {
            calc = String(parseFloat(preState) / parseFloat(curState));
          }
          break;
        case "+":
          calc = String(parseFloat(preState) + parseFloat(curState));
          break;
        case "-":
          calc = String(parseFloat(preState) - parseFloat(curState));
          break;
        case "X":
          calc = String(parseFloat(preState) * parseFloat(curState));
          break;
        default:
          calc = "Err";
          break;
      }
      setInput(calc ?? "Err");
      setPreState(null);
      setCurState(calc);
      setOperator(null);
      setTotal(true);
  
      setHistory((prevHistory) => [
        ...prevHistory,
        `${calc ?? "Err"}`,
      ]);
    } else {
      setTotal(true);
    }
  };
  

  const backspace = () => {
    setCurState((prev) => (prev ? prev.slice(0, -1) : null));
  };

  const reset = () => {
    setPreState(null);
    setCurState(null);
    setInput("0");
    setHistory([]);
  };

  return (

    <body className="body-home">
        <div className="container">
      <div className="history">
        <ul>
          {history.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      </div>
      <div className="wrapper">
        <div className="screen" style={{
        }}>
          <NumericFormat
            value={input}
            displayType={"text"}
            thousandSeparator={true}
          />
        </div>
          <div className="btn light-gray" onClick={reset}>C</div>
          <div className="btn light-gray" onClick={backspace}>DEL</div>
          <div className="btn light-orange" onClick={() => navigate('/support')}>?</div>
          <div className="btn orange" onClick={operatorType}>/</div>
          <div className="btn" onClick={inputNum}>7</div>
          <div className="btn" onClick={inputNum}>8</div>
          <div className="btn" onClick={inputNum}>9</div>
          <div className="btn orange" onClick={operatorType}>X</div>
          <div className="btn" onClick={inputNum}>4</div>
          <div className="btn" onClick={inputNum}>5</div>
          <div className="btn" onClick={inputNum}>6</div>
          <div className="btn orange" onClick={operatorType}>-</div>
          <div className="btn" onClick={inputNum}>1</div>
          <div className="btn" onClick={inputNum}>2</div>
          <div className="btn" onClick={inputNum}>3</div>
          <div className="btn orange" onClick={operatorType}>+</div>
          <div className="zero" onClick={inputNum}>0</div>
          <div className="equal" onClick={equals}>=</div>
      </div>
    </div>
    </body>
    
  );
}

export default Calculator;
