const buttons = document.querySelector(".calc");
const screen = document.querySelector(".scr");
let arrayNumbers = [];
let arrayOperators = [];
let result;

buttons.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    if (event.target.className === "operator") {
      arrayOperators.push(event.target.innerHTML);
      screen.innerHTML += event.target.innerHTML;
    }
    if (event.target.className === "but") {
      arrayNumbers.push(event.target.innerHTML);
      screen.innerHTML += event.target.innerHTML;
    }
  }
  if (event.target.id === "itemEnd") {
    result = eval(screen.innerHTML);
    screen.innerHTML = result;
  }
  if (event.target.id === "cleanC" || event.target.id === "cleanCe") {
    result = null;
    screen.innerHTML = result;
  }
});
// считывание клавишь клавиатуры
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
