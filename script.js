const buttons = document.querySelector(".calc");
const screen = document.querySelector(".screen");
let result = 0;
let term1 = 0;
let term2 = 0;
let operator;
//счетчик нажатых кнопок (максимум 1)
let point = 0;
//для удаления значений на экране в момент ввода новых
let i = 0;
// первичный блокиратор,  ввода операторов и точки.
let count = 0;

function resultEnd() {
  switch (true) {
    case operator == "+":
      result = +term1 + +term2;
      break;
    case operator == "-":
      result = +term1 - +term2;
      break;
    case operator == "*":
      result = +term1 * +term2;
      break;
    case operator == "/":
      result = +term1 / +term2;
      break;
  }
}
buttons.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    // блокиратор ввода операторов и точки. Принимает только цифру пока count=0 или повторные операторы
    if (
      (event.target.className === "button" && event.target.id != "point") ||
      count > 0 ||
      operator != undefined
    ) {
      // удаляет первичный "0" на экране,  а далее при дальнейшем наборе очищает экран в момент ввода нового операнда или оператора.
      if (i < 1) {
        screen.innerHTML = null;
        i = 1;
      }

      switch (true) {
        // блок 1 -первый ввод

        case event.target.className === "button" && operator === undefined:
          if (
            event.target.id === "point" &&
            screen.innerHTML != undefined &&
            point === 0
          ) {
            screen.innerHTML += event.target.innerHTML;
            point++;
          }
          if (event.target.id != "point") {
            screen.innerHTML += event.target.innerHTML;
            count = 1;
          }
          break;
        case event.target.className === "operator" &&
          operator === undefined &&
          screen.innerHTML != null:
          term1 = screen.innerHTML;
          operator = event.target.innerHTML;
          screen.innerHTML = event.target.innerHTML;
          point = 0;
          i = 0;
          break;

        // блок 2 - повтроный ввод
        case event.target.className === "button" && operator != undefined:
          if (event.target.id === "point" && term1 != 0 && point === 0) {
            screen.innerHTML += event.target.innerHTML;
            point++;
          }
          if (event.target.id != "point") {
            screen.innerHTML += event.target.innerHTML;
            count = 1;
          }
          break;
        case event.target.className === "operator" &&
          operator != undefined &&
          screen.innerHTML != null:
          term2 = screen.innerHTML;
          resultEnd();
          term1 = result;
          term2 = 0;
          point = 0;
          i = 0;
          screen.innerHTML = event.target.innerHTML;
          console.log(result);
          break;
        case event.target.className === "operator" &&
          operator != undefined &&
          term1 != 0 &&
          term2 === 0:
          screen.innerHTML = event.target.innerHTML;
          operator = event.target.innerHTML;
          point = 0;
          i = 0;
          console.log(result);
          break;
      }
    }
  }

  if (event.target.id === "itemEnd") {
    term2 = screen.innerHTML;
    resultEnd();
    console.log(result);
    screen.innerHTML = result;
    point = 0;
    term2 = 0;
    operator = undefined;
  }
  if (event.target.id === "cleanCe") {
    result = 0;
    term1 = 0;
    term2 = 0;
    point = 0;
    count = 0;
    i = 0;
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
