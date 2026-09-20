const numBtns = document.querySelectorAll(".num-btn");
const opBtns = document.querySelectorAll(".op-btn:not(.dot-btn)");
const dotBtn = document.querySelector(".dot-btn");
const display = document.getElementById("display");
const clearAll = document.getElementById("clear-all");

let firstNumber = null;
let secondNumber = null;
let operator = null;
let displayValue = "";
let replaceOnNextDigit = false;
let opCount = 0;

function showDebugInfo() {
  console.log(`first number is ${firstNumber}`);
  console.log(`op is ${operator}`);
  console.log(`second number is ${secondNumber}`);
  console.log(`display value is ${displayValue}`);
  console.log(`op count is ${opCount}`);
}

function purge() {
  display.textContent = "0";
  firstNumber = null;
  secondNumber = null;
  operator = null;
  opCount = 0;
  displayValue = "";
}

function clearSlots() {
  firstNumber = null;
  secondNumber = null;
  operator = null;
  opCount = 0;
}

function render() {
  displayValue = displayValue.toString();
  if (displayValue.length > 12) {
    displayValue = displayValue.slice(0, 12);
  }
  display.textContent = displayValue;
}

numBtns.forEach((btn) => {
  btn.addEventListener("click", handleNumbers);
});

opBtns.forEach((btn) => {
  btn.addEventListener("click", handleOperators);
});

dotBtn.addEventListener("click", handleFloat);

clearAll.addEventListener("click", purge);

function add(a, b) {
  return Number(a) + Number(b);
}

function subtract(a, b) {
  return Number(a) - Number(b);
}

function multiply(a, b) {
  return Number(a) * Number(b);
}

function divide(a, b) {
  return Number(a) / Number(b);
}

function operate(op, a, b) {
  if (op === "÷" && Number(b) === "0") {
    alert("Division by 0 not possible");
    purge();
    return;
  }
  switch (op) {
    case "+":
      displayValue = add(a, b);
      render();
      clearSlots();
      break;
    case "-":
      displayValue = subtract(a, b);
      render();
      clearSlots();
      break;
    case "×":
      displayValue = multiply(a, b);
      render();
      clearSlots();
      break;
    case "÷":
      displayValue = divide(a, b);
      render();
      clearSlots();
      break;
  }
}

function handleFloat() {
  if (displayValue.includes(".") || displayValue === "") {
    return;
  } else if (replaceOnNextDigit) {
    displayValue = "0.";
    render();
    replaceOnNextDigit = false;
  } else {
    displayValue += ".";
    render();
  }
}

function handleOperators(e) {
  if (e.target.textContent === "CE") {
    purge();
  } else if (e.target.textContent === "=" && opCount === 0 && (firstNumber === null || secondNumber === null)) {
    return;
  } else if (e.target.textContent === "=") {
    secondNumber = displayValue;
    operate(operator, firstNumber, secondNumber);
  } else {
    if (opCount > 0 && !replaceOnNextDigit) {
      secondNumber = displayValue;
      operate(operator, firstNumber, secondNumber);
      opCount = 0;
    }
    firstNumber = displayValue;
    operator = e.target.textContent;
    opCount++;
    replaceOnNextDigit = true;
  }
}

function handleNumbers(e) {
  if (replaceOnNextDigit) {
    displayValue = e.target.textContent;
    render();
    replaceOnNextDigit = false;
  } else {
    displayValue += e.target.textContent;
    render();
  }
}