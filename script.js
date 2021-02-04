const buttons = document.querySelector(".calc");
const screen = document.querySelector(".scr");
console.log(buttons);
buttons.addEventListener("click", (event) => {
  screen.innerHTML = event.target.innerHTML;

  console.log(event.target.innerHTML);
});
