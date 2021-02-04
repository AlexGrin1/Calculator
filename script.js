const buttons = document.querySelector(".calc");
const screen = document.querySelector(".scr");
let arrayNumbers = [];
let arrayOperators = [];
let result = 0;
console.log(buttons);
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

    console.log("id  ----" + event.target.id);
    console.log(arrayNumbers);
    console.log(arrayOperators);
    console.log(event.target.innerHTML);
  }
  if (event.target.id === "itemEnd") {
    console.log("привет");
    result = eval(screen.innerHTML);
    screen.innerHTML = result;
    console.log(result);
    console.log(typeof result);
  }
  if (event.target.id === "cleanC" || event.target.id === "cleanCe") {
    result = 0;
    screen.innerHTML = result;
  }
});
