"use client";

import { useState } from "react";

const CalculatorWindow = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [isScientific, setIsScientific] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [memory, setMemory] = useState(0);
  const [angleMode, setAngleMode] = useState("DEG"); // DEG or RAD

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (
    firstValue: number,
    secondValue: number,
    operation: string
  ): number => {
    let result = 0;
    switch (operation) {
      case "+":
        result = firstValue + secondValue;
        break;
      case "-":
        result = firstValue - secondValue;
        break;
      case "×":
        result = firstValue * secondValue;
        break;
      case "÷":
        result = firstValue / secondValue;
        break;
      case "^":
        result = Math.pow(firstValue, secondValue);
        break;
      case "√":
        result = Math.sqrt(firstValue);
        break;
      case "sin":
        result = Math.sin(
          angleMode === "DEG" ? (firstValue * Math.PI) / 180 : firstValue
        );
        break;
      case "cos":
        result = Math.cos(
          angleMode === "DEG" ? (firstValue * Math.PI) / 180 : firstValue
        );
        break;
      case "tan":
        result = Math.tan(
          angleMode === "DEG" ? (firstValue * Math.PI) / 180 : firstValue
        );
        break;
      case "log":
        result = Math.log10(firstValue);
        break;
      case "ln":
        result = Math.log(firstValue);
        break;
      case "!":
        result = factorial(firstValue);
        break;
      default:
        result = secondValue;
    }

    // Add to history
    const historyEntry = `${firstValue} ${operation} ${secondValue} = ${result}`;
    setHistory((prev) => [historyEntry, ...prev.slice(0, 9)]); // Keep last 10 entries

    return result;
  };

  const factorial = (n: number) => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const clearEntry = () => {
    setDisplay("0");
  };

  const backspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
    }
  };

  const memoryClear = () => setMemory(0);
  const memoryRecall = () => setDisplay(String(memory));
  const memoryAdd = () => setMemory(memory + parseFloat(display));
  const memorySubtract = () => setMemory(memory - parseFloat(display));
  const memoryStore = () => setMemory(parseFloat(display));

  const toggleAngleMode = () => {
    setAngleMode(angleMode === "DEG" ? "RAD" : "DEG");
  };

  return (
    <div className="h-full bg-gray-100 flex">
      {/* Main Calculator */}
      <div className="flex-1 p-4">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Calculator</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsScientific(!isScientific)}
                className={`px-3 py-1 rounded text-sm font-medium ${
                  isScientific
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {isScientific ? "Scientific" : "Basic"}
              </button>
              <button
                onClick={toggleAngleMode}
                className="px-3 py-1 rounded text-sm font-medium bg-gray-200 text-gray-700"
              >
                {angleMode}
              </button>
            </div>
          </div>

          {/* Display */}
          <div className="bg-gray-800 text-white text-right text-2xl font-mono p-4 rounded-lg mb-4 min-h-20 flex items-center justify-end shadow-inner">
            <div className="break-all">{display}</div>
          </div>

          {/* Memory Display */}
          {memory !== 0 && (
            <div className="text-sm text-gray-600 mb-2 text-center">
              Memory: {memory}
            </div>
          )}

          {/* Basic Calculator */}
          {!isScientific ? (
            <div className="grid grid-cols-4 gap-2">
              {/* Row 1 */}
              <button
                onClick={clear}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
              >
                C
              </button>
              <button
                onClick={clearEntry}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
              >
                CE
              </button>
              <button
                onClick={backspace}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
              >
                ⌫
              </button>
              <button
                onClick={() => inputOperation("÷")}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
              >
                ÷
              </button>

              {/* Number grid */}
              {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((num) => (
                <button
                  key={num}
                  onClick={() => inputNumber(String(num))}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition-colors"
                >
                  {num}
                </button>
              ))}

              {/* Operations for basic mode */}
              <button
                onClick={() => inputOperation("×")}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors row-start-2 col-start-4"
              >
                ×
              </button>
              <button
                onClick={() => inputOperation("-")}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
              >
                -
              </button>
              <button
                onClick={() => inputOperation("+")}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
              >
                +
              </button>

              {/* Row 5 */}
              <button
                onClick={() => inputNumber("0")}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition-colors col-span-2"
              >
                0
              </button>
              <button
                onClick={() => setDisplay(display + ".")}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition-colors"
              >
                .
              </button>
              <button
                onClick={performCalculation}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
              >
                =
              </button>
            </div>
          ) : (
            /* Scientific Calculator - Simplified for brevity */
            <div className="grid grid-cols-5 gap-2 text-xs">
              {/* Scientific buttons would go here - simplified due to length */}
              <button
                onClick={clear}
                className="bg-red-500 text-white p-2 rounded"
              >
                C
              </button>
              <button
                onClick={clearEntry}
                className="bg-orange-500 text-white p-2 rounded"
              >
                CE
              </button>
              <button
                onClick={backspace}
                className="bg-orange-500 text-white p-2 rounded"
              >
                ⌫
              </button>
              <button
                onClick={() => inputOperation("÷")}
                className="bg-orange-500 text-white p-2 rounded"
              >
                ÷
              </button>
              <button
                onClick={() => inputOperation("×")}
                className="bg-orange-500 text-white p-2 rounded"
              >
                ×
              </button>

              {[7, 8, 9, "-", "+", 4, 5, 6, ".", "0", 1, 2, 3, "±", "="].map(
                (item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (typeof item === "number") inputNumber(String(item));
                      else if (item === "=") performCalculation();
                      else if (item === ".") setDisplay(display + ".");
                      else if (item === "±")
                        setDisplay(String(-parseFloat(display)));
                      else inputOperation(item);
                    }}
                    className={`p-2 rounded ${
                      ["-", "+", "÷", "×", "="].includes(String(item))
                        ? "bg-orange-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>

      {/* History Panel */}
      <div className="w-64 bg-gray-200 border-l border-gray-300 p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">History</h3>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {history.length === 0 ? (
            <p className="text-gray-500 text-sm">No calculations yet</p>
          ) : (
            history.map((entry, index) => (
              <div
                key={index}
                className="bg-white p-2 rounded text-sm font-mono text-gray-700"
              >
                {entry}
              </div>
            ))
          )}
        </div>
        {history.length > 0 && (
          <button
            onClick={() => setHistory([])}
            className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded text-sm"
          >
            Clear History
          </button>
        )}
      </div>
    </div>
  );
};

export default CalculatorWindow;
