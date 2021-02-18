const buttons = document.querySelector(".calc");
const screen = document.querySelector(".screen");

let term1 = "",
  term2 = "",
  operator,
  i = 0,
  count = 0,
  lastStepMemory,
  screenMemory = 0;

function infinityOnNull() {
  if (term1 === Infinity) {
    term1 = 0;
  }
}
function resultEnd() {
  switch (true) {
    case operator === "+":
      term1 = +term1 + +term2;
      infinityOnNull();
      break;
    case operator === "-":
      term1 = +term1 - +term2;
      infinityOnNull();
      break;
    case operator === "*":
      term1 = +term1 * +term2;
      infinityOnNull();
      break;
    case operator === "/":
      term1 = +term1 / +term2;
      infinityOnNull();
      break;
  }
}
function cleanAll() {
  term1 = "";
  term2 = "";
  screenMemory = 0;
  lastStepMemory = undefined;
  operator = undefined;
  i = 0;
  count = 0;
}

buttons.addEventListener("click", (event) => {
  const number = event.target.className === "button",
    operBut = event.target.className === "operator",
    pointBut = event.target.id === "point",
    buttonC = event.target.id === "cleanC",
    buttonCe = event.target.id === "cleanCe",
    itemEnd = event.target.id === "itemEnd",
    itemNull = event.target.id === "itemNull";

  function inputNumber(e) {
    switch (true) {
      case pointBut &&
        screen.innerHTML.indexOf(".") === -1 &&
        lastStepMemory !== "operator":
        screen.innerHTML += e.target.innerHTML;
        screenMemory = screen.innerHTML;
        break;
      case !pointBut:
        if (screen.innerHTML === "0") {
          screen.innerHTML = null;
        }
        screen.innerHTML += e.target.innerHTML;
        screenMemory = screen.innerHTML;
        count = 1;
        break;
      case (lastStepMemory === "operator" && pointBut) ||
        (pointBut && term1 === "" && lastStepMemory !== "button"):
        screen.innerHTML = "0" + e.target.innerHTML;
        screenMemory = screen.innerHTML;
        break;
    }
  }

  if (number || count > 0 || operator !== undefined || buttonCe) {
    switch (true) {
      case number:
        if (i < 1) {
          screen.innerHTML = null;
          i = 1;
        }
        inputNumber(event);
        break;
      case operBut && !buttonC && !buttonCe && !itemEnd:
        if (lastStepMemory === "button" && term1 === "") {
          term1 = screen.innerHTML;
          i = 0;
          point = 0;
          count = 0;
        }
        if (lastStepMemory === "button" && term1 !== "") {
          term2 = screen.innerHTML;
          resultEnd();
          screen.innerHTML = term1;
          i = 0;
          point = 0;
          count = 0;
        }
        operator = event.target.innerHTML;
        break;
      case buttonC:
        screen.innerHTML = screen.innerHTML.slice(0, -1);
        if (lastStepMemory != "operator") {
          screenMemory = screen.innerHTML;
        }
        break;
      case buttonCe:
        cleanAll();
        screen.innerHTML = 0;
        break;
      case itemEnd:
        if (term1 !== "" && lastStepMemory === "button") {
          term2 = screen.innerHTML;
          resultEnd();
          screen.innerHTML = term1;
          term1 = "";
          cleanAll();
        } else {
          cleanAll();
          screen.innerHTML = 0;
        }
        break;
    }
    lastStepMemory = event.target.className;
  }
});

/*
buttons.addEventListener("click", (event) => {
  console.log("Текущий оператор - " + operator);

  if (event.target.tagName === "LI") {
    console.log("Последним шагом был " + lastStepMemory);
    console.log("В памяти  " + screenMemory);
    // блокиратор ввода операторов и точки. Принимает только цифру пока count=0 или повторные операторы
    if (
      (event.target.className === "button" && event.target.id != "point") ||
      count > 0 ||
      operator != undefined
    ) {
      // При вводе первого оператора записывает в term1 содержимое screen.
      if (
        event.target.className === "operator" &&
        operator === undefined &&
        term1 === 0
      ) {
        term1 = screen.innerHTML;
      } //При вводе ворого и последующего операнда , содержимое screen записывается в screenMemory до момента ввода следующего оператора.
      //Как только вводится новый оператор, а последним вводом была цифра (lastStepMemory === "button") - содержимое screenMemory записывается в term2.
      //Производится вычисление result. По итогу term1 =result, term2 обнуляется
      if (
        event.target.className === "operator" &&
        lastStepMemory === "button" &&
        term1 != 0
      ) {
        term2 = screenMemory;
        resultEnd();
        term1 = result;
        term2 = 0;
        screenMemory = 0;
        console.log("Текущий результат  " + result);
      }
      // удаляет первичный "0" на экране,  а далее при дальнейшем наборе очищает экран в момент ввода нового операнда или оператора.
      if (i < 1) {
        screen.innerHTML = null;
        i = 1;
      }
      console.log("Текущий term1 - " + term1);
      console.log("Текущий term2 - " + term2);
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
          if (lastStepMemory === "button") {
            term1 = screen.innerHTML;
          }
          operator = event.target.innerHTML;
          screen.innerHTML = event.target.innerHTML;
          point = 0;
          i = 0;
          break;

        // блок 2 - повтроный ввод
        case event.target.className === "button" && operator != undefined:
          if (event.target.id === "point" && term1 != 0 && point === 0) {
            screen.innerHTML += event.target.innerHTML;
            screenMemory = screen.innerHTML;
            point++;
          }
          if (event.target.id != "point") {
            screen.innerHTML += event.target.innerHTML;
            screenMemory = screen.innerHTML;
            count = 1;
          }
          break;
        case event.target.className === "operator" &&
          operator != undefined &&
          screen.innerHTML != null:
          // term2 = screen.innerHTML;
          //resultEnd();
          //term1 = result;
          //term2 = 0;
          operator = event.target.innerHTML;
          point = 0;
          i = 0;
          screen.innerHTML = event.target.innerHTML;
          // console.log(result);
          break;
        case event.target.className === "operator" &&
          operator != undefined &&
          term1 != 0 &&
          term2 === 0:
          screen.innerHTML = event.target.innerHTML;
          operator = event.target.innerHTML;
          point = 0;
          i = 0;
          break;
      }
      lastStepMemory = event.target.className;
    }
  }

  if (event.target.id === "itemEnd") {
    console.log("В конце Последним шагом был " + lastStepMemory);
    console.log("В конце В памяти  " + screenMemory);
    term2 = screenMemory;
    resultEnd();
    screen.innerHTML = result;
    term1 = 0;
    point = 0;
    term2 = 0;
    screenMemory = 0;
    operator = undefined;
    i = 0;
    count = 0;
  }
  if (event.target.id === "cleanCe") {
    result = 0;
    term1 = 0;
    term2 = 0;
    point = 0;
    count = 0;
    lastStepMemory = undefined;
    screenMemory = 0;
    i = 0;
    operator = undefined;
    screen.innerHTML = result;
  }
  if (event.target.id === "cleanC") {
    screen.innerHTML = screen.innerHTML.slice(0, -1);
    if (lastStepMemory != "operator") {
      screenMemory = screen.innerHTML;
    }
  }
});
*/
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
