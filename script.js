const buttons = document.querySelector(".calc");
const screen = document.querySelector(".screen");
let result;
let term1;
let term2;
let operator;
function resultEnd() {
  switch (true) {
    case operator === "+":
      result = +term1 + +term2;
      break;
    case operator === "-":
      result = +term1 - +term2;
      break;
    case operator === "*":
      result = +term1 * +term2;
      break;
    case operator === "/":
      result = +term1 / +term2;
      break;
  }
}
buttons.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    if (event.target.className === "button" && operator === undefined) {
      screen.innerHTML += event.target.innerHTML;
      term1 = event.target.innerHTML;
    }
    if (event.target.className === "operator") {
      screen.innerHTML += event.target.innerHTML;
      operator = event.target.innerHTML;
    }
    if (event.target.className === "button" && operator != undefined) {
      screen.innerHTML += event.target.innerHTML;
      term2 = event.target.innerHTML;
    }
  }

  if (event.target.id === "itemEnd") {
    resultEnd();
    screen.innerHTML = result;
  }
  if (event.target.id === "cleanCe") {
    result = null;
    term1 = undefined;
    term2 = undefined;
    operator = undefined;
    screen.innerHTML = result;
  }
  if (event.target.id === "cleanC") {
    screen.innerHTML = screen.innerHTML.slice(0, -1);
  }
});

/*
buttons.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    if (event.target.className === "operator") {
      arrayOperators.push(event.target.innerHTML);
      screen.innerHTML += event.target.innerHTML;
    }
    if (event.target.className === "button") {
      arrayNumbers.push(event.target.innerHTML);
      screen.innerHTML += event.target.innerHTML;
    }
  }
  if (event.target.id === "itemEnd") {
    result = eval(screen.innerHTML);
    screen.innerHTML = result;
  }
  if (event.target.id === "cleanCe") {
    result = null;
    screen.innerHTML = result;
  }
  if (event.target.id === "cleanC") {
    screen.innerHTML = screen.innerHTML.slice(0, -1);
  }

  console.log(screen.innerHTML[screen.innerHTML.length - 1]);
});
// считывание клавиш клавиатуры
document.addEventListener("keyup", function (event) {
  if (event.key != "Enter" && event.key != "Delete")
    screen.innerHTML += event.key;
  if (event.key === "Enter") {
    result = eval(screen.innerHTML);
    screen.innerHTML = result;
  }
  if (event.key === "Delete") {
    result = null;
    screen.innerHTML = result;
  }
});
*/
