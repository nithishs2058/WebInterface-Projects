import React, { useState } from "react";
import "./Project3.css";

function Project3() {
  const [display, setDisplay] = useState("0");
  const [prevValue, setPrevValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [resetOnNextInput, setResetOnNextInput] = useState(false);
  const [expression, setExpression] = useState("");

  const calculate = (a, b, op) => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);

    switch (op) {
      case "+":
        return numA + numB;

      case "-":
        return numA - numB;

      case "×":
        return numA * numB;

      case "÷":
        return numB === 0 ? "Error" : numA / numB;

      default:
        return numB;
    }
  };

  const formatResult = (value) => {
    if (value === "Error") return "Error";

    const rounded = Math.round(value * 1e10) / 1e10;
    return rounded.toString();
  };

  const handleNumberClick = (num) => {
    if (display === "Error" || resetOnNextInput) {
      setDisplay(num);
      setResetOnNextInput(false);
      return;
    }

    if (display === "0") {
      setDisplay(num);
    } else {
      setDisplay(display + num);
    }
  };

  const handleDecimalClick = () => {
    if (display === "Error" || resetOnNextInput) {
      setDisplay("0.");
      setResetOnNextInput(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleOperatorClick = (op) => {
    if (display === "Error") return;

    if (operator && !resetOnNextInput) {
      const result = calculate(prevValue, display, operator);
      const formatted = formatResult(result);

      setDisplay(formatted);
      setPrevValue(formatted);
      setExpression(`${formatted} ${op}`);
    } else {
      setPrevValue(display);
      setExpression(`${display} ${op}`);
    }

    setOperator(op);
    setResetOnNextInput(true);
  };

  const handleEquals = () => {
    if (operator === null || display === "Error") return;

    const result = calculate(prevValue, display, operator);
    const formatted = formatResult(result);

    setExpression(`${prevValue} ${operator} ${display} =`);
    setDisplay(formatted);
    setPrevValue(null);
    setOperator(null);
    setResetOnNextInput(true);
  };

  const handleClear = () => {
    setDisplay("0");
    setPrevValue(null);
    setOperator(null);
    setResetOnNextInput(false);
    setExpression("");
  };

  const handleBackspace = () => {
    if (display === "Error" || resetOnNextInput) return;

    if (display.length === 1) {
      setDisplay("0");
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const handleDisplayChange = (e) => {
    const value = e.target.value;

    setDisplay(value === "" ? "0" : value);
    setResetOnNextInput(false);
  };

  return (
    <div className="calculator">

      <div className="calculator-display">

        <div className="calculator-expression">
          {expression || "\u00A0"}
        </div>

        <input
          type="number"
          className="calculator-result"
          value={display === "Error" ? "" : display}
          onChange={handleDisplayChange}
          step="1"
        />

      </div>

      <div className="calculator-buttons">

        {/* Row 1 */}

        <button
          className="btn btn-function"
          onClick={handleClear}
        >
          C
        </button>

        <button
          className="btn btn-function backspace"
          onClick={handleBackspace}
        >
          ⌫
        </button>

        <button
          className="btn btn-operator"
          onClick={() => handleOperatorClick("÷")}
        >
          ÷
        </button>

        <button
          className="btn btn-operator"
          onClick={() => handleOperatorClick("×")}
        >
          ×
        </button>

        {/* Row 2 */}

        <button
          className="btn btn-number"
          onClick={() => handleNumberClick("7")}
        >
          7
        </button>

        <button
          className="btn btn-number"
          onClick={() => handleNumberClick("8")}
        >
          8
        </button>

        <button
          className="btn btn-number"
          onClick={() => handleNumberClick("9")}
        >
          9
        </button>

        <button
          className="btn btn-operator"
          onClick={() => handleOperatorClick("-")}
        >
          −
        </button>

        {/* Row 3 */}

        <button
          className="btn btn-number"
          onClick={() => handleNumberClick("4")}
        >
          4
        </button>

        <button
          className="btn btn-number"
          onClick={() => handleNumberClick("5")}
        >
          5
        </button>

        <button
          className="btn btn-number"
          onClick={() => handleNumberClick("6")}
        >
          6
        </button>

        <button
          className="btn btn-operator"
          onClick={() => handleOperatorClick("+")}
        >
          +
        </button>

        {/* Row 4 */}

        <button
          className="btn btn-number"
          onClick={() => handleNumberClick("1")}
        >
          1
        </button>

        <button
          className="btn btn-number"
          onClick={() => handleNumberClick("2")}
        >
          2
        </button>

        <button
          className="btn btn-number"
          onClick={() => handleNumberClick("3")}
        >
          3
        </button>

        <button
          className="btn btn-equals"
          onClick={handleEquals}
        >
          =
        </button>

        {/* Row 5 */}

        <button
          className="btn btn-number btn-zero"
          onClick={() => handleNumberClick("0")}
        >
          0
        </button>

        <button
          className="btn btn-number"
          onClick={handleDecimalClick}
        >
          .
        </button>

      </div>
    </div>
  );
}

export default Project3;