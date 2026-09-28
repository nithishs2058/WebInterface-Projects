import { useState } from "react";

function Calculator() {
  // displayValue: what's currently shown on screen
  // storedValue: the first operand, held while waiting for the second one
  // pendingOperator: the operator selected (+, -, ×, ÷)
  // overwrite: true when the next digit typed should replace the display
  const [displayValue, setDisplayValue] = useState("0");
  const [storedValue, setStoredValue] = useState(null);
  const [pendingOperator, setPendingOperator] = useState(null);
  const [overwrite, setOverwrite] = useState(true);

  const inputDigit = (digit) => {
    if (overwrite) {
      setDisplayValue(digit === "." ? "0." : digit);
      setOverwrite(false);
      return;
    }

    if (digit === "." && displayValue.includes(".")) return;

    // Avoid runaway digit strings on the display
    if (displayValue.replace("-", "").replace(".", "").length >= 12) return;

    setDisplayValue(displayValue + digit);
  };

  const clearAll = () => {
    setDisplayValue("0");
    setStoredValue(null);
    setPendingOperator(null);
    setOverwrite(true);
  };

  const deleteLast = () => {
    if (overwrite) return;

    if (displayValue.length <= 1 || (displayValue.length === 2 && displayValue.startsWith("-"))) {
      setDisplayValue("0");
      setOverwrite(true);
    } else {
      setDisplayValue(displayValue.slice(0, -1));
    }
  };

  const calculate = (a, b, operator) => {
    switch (operator) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "×":
        return a * b;
      case "÷":
        return b === 0 ? NaN : a / b;
      default:
        return b;
    }
  };

  const formatResult = (value) => {
    if (Number.isNaN(value)) return "Error";
    // Round off tiny floating point errors and cap the displayed length
    const rounded = Math.round(value * 1e10) / 1e10;
    return String(rounded).slice(0, 14);
  };

  const chooseOperator = (operator) => {
    const inputValue = parseFloat(displayValue);

    if (pendingOperator && !overwrite) {
      const result = calculate(storedValue, inputValue, pendingOperator);
      setStoredValue(result);
      setDisplayValue(formatResult(result));
    } else {
      setStoredValue(inputValue);
    }

    setPendingOperator(operator);
    setOverwrite(true);
  };

  const handleEquals = () => {
    if (pendingOperator === null || storedValue === null) return;

    const inputValue = parseFloat(displayValue);
    const result = calculate(storedValue, inputValue, pendingOperator);

    setDisplayValue(formatResult(result));
    setStoredValue(null);
    setPendingOperator(null);
    setOverwrite(true);
  };

  return (
    <div className="calculator">
      <div className="display">
        <div className="display-expression">
          {storedValue !== null && pendingOperator
            ? `${formatResult(storedValue)} ${pendingOperator}`
            : "\u00A0"}
        </div>
        <div className="display-value">{displayValue}</div>
      </div>

      <div className="keypad">
        <button className="key function" onClick={clearAll}>
          C
        </button>
        <button className="key function" onClick={deleteLast}>
          ⌫
        </button>
        <button className="key operator" onClick={() => chooseOperator("÷")}>
          ÷
        </button>
        <button className="key operator" onClick={() => chooseOperator("×")}>
          ×
        </button>

        <button className="key digit" onClick={() => inputDigit("7")}>
          7
        </button>
        <button className="key digit" onClick={() => inputDigit("8")}>
          8
        </button>
        <button className="key digit" onClick={() => inputDigit("9")}>
          9
        </button>
        <button className="key operator" onClick={() => chooseOperator("-")}>
          −
        </button>

        <button className="key digit" onClick={() => inputDigit("4")}>
          4
        </button>
        <button className="key digit" onClick={() => inputDigit("5")}>
          5
        </button>
        <button className="key digit" onClick={() => inputDigit("6")}>
          6
        </button>
        <button className="key operator" onClick={() => chooseOperator("+")}>
          +
        </button>

        <button className="key digit" onClick={() => inputDigit("1")}>
          1
        </button>
        <button className="key digit" onClick={() => inputDigit("2")}>
          2
        </button>
        <button className="key digit" onClick={() => inputDigit("3")}>
          3
        </button>
        <button className="key equals tall" onClick={handleEquals}>
          =
        </button>

        <button className="key digit zero" onClick={() => inputDigit("0")}>
          0
        </button>
        <button className="key digit" onClick={() => inputDigit(".")}>
          .
        </button>
      </div>
    </div>
  );
}

export default Calculator;
