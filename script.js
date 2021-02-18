const buttons = document.querySelector(".calc");
const screen = document.querySelector(".screen");

let term1 = "";
let term2 = "";
let operator;
let cleanerScreenBeforeInput = 0;
let blokedOperatorInput = 0;
let lastStepMemory;
let screenMemory = 0;

function infinityOnNull() {
  if (term1 === Infinity) {
    term1 = "Разделить на ноль нельзя";
  }
}
function resultEnd() {
  switch (operator) {
    case "+":
      term1 = +term1 + +term2;
      break;
    case "-":
      term1 = +term1 - +term2;
      break;
    case "*":
      term1 = +term1 * +term2;
      break;
    case "/":
      term1 = +term1 / +term2;
      break;
  }
  infinityOnNull();
}
function cleanAll() {
  term1 = "";
  term2 = "";
  screenMemory = 0;
  lastStepMemory = undefined;
  operator = undefined;
  cleanerScreenBeforeInput = 0;
  blokedOperatorInput = 0;
}

buttons.addEventListener("click", (event) => {
  const isNumberButton = event.target.className === "button";
  const isOperatorButton = event.target.className === "operator";
  const isPointButton = event.target.id === "point";
  const isButtonC = event.target.id === "cleanC";
  const isButtonCe = event.target.id === "cleanCe";
  const isButtonResult = event.target.id === "itemEnd";

  function inputNumber(e) {
    if (
      isPointButton &&
      screen.innerHTML.indexOf(".") === -1 &&
      lastStepMemory !== "operator"
    ) {
      screen.innerHTML += e.target.innerHTML;
      screenMemory = screen.innerHTML;
    } else if (!isPointButton) {
      if (screen.innerHTML === "0") {
        screen.innerHTML = null;
      }
      screen.innerHTML += e.target.innerHTML;
      screenMemory = screen.innerHTML;
      blokedOperatorInput = 1;
    } else if (
      (lastStepMemory === "operator" && isPointButton) ||
      (isPointButton && term1 === "" && lastStepMemory !== "button")
    ) {
      screen.innerHTML = "0" + e.target.innerHTML;
      screenMemory = screen.innerHTML;
    }
  }

  if (
    isNumberButton ||
    blokedOperatorInput > 0 ||
    operator !== undefined ||
    isButtonCe
  ) {
    if (isNumberButton) {
      if (cleanerScreenBeforeInput < 1) {
        screen.innerHTML = null;
        cleanerScreenBeforeInput = 1;
      }
      inputNumber(event);
    } else if (
      isOperatorButton &&
      !isButtonC &&
      !isButtonCe &&
      !isButtonResult
    ) {
      if (lastStepMemory === "button" && term1 === "") {
        term1 = screen.innerHTML;
        cleanerScreenBeforeInput = 0;
        point = 0;
        blokedOperatorInput = 0;
      }
      if (lastStepMemory === "button" && term1 !== "") {
        term2 = screen.innerHTML;
        resultEnd();
        screen.innerHTML = term1;
        cleanerScreenBeforeInput = 0;
        point = 0;
        blokedOperatorInput = 0;
      }
      operator = event.target.innerHTML;
    } else if (isButtonC) {
      screen.innerHTML = screen.innerHTML.slice(0, -1);
      if (lastStepMemory != "operator") {
        screenMemory = screen.innerHTML;
      }
    } else if (isButtonCe) {
      cleanAll();
      screen.innerHTML = 0;
    } else if (isButtonResult) {
      if (term1 !== "" && lastStepMemory === "button") {
        term2 = screen.innerHTML;
        resultEnd();
        screen.innerHTML = term1;
      } else {
        screen.innerHTML = 0;
      }
      cleanAll();
    }
  }
  lastStepMemory = event.target.className;
});
