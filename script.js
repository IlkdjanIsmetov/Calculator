const display = document.querySelector("#display p");
const digitBtn = document.querySelectorAll(".digit");
const operatorBtn = document.querySelectorAll(".operator");
const coma = document.querySelector("#coma");
coma.addEventListener("click", (coma) => {
  if (display.textContent[display.textContent.length - 1] == " ") {
    return;
  }
  display.textContent += ".";
  disableComa();
});
document.querySelector("#clear").addEventListener("click", () => {
  display.textContent = "0";
});
document
  .querySelector("#backspace")
  .addEventListener("click", () => deleteLast());
function deleteLast() {
  if (display.textContent == "0") {
    return;
  }
  if (display.textContent.includes("Infinity")) {
    display.textContent = "0";
  }
  enableOperators();
  if (display.textContent[display.textContent.length - 1] == ".") {
    enableComa();
  }
  if (display.textContent[display.textContent.length - 1] == " ") {
    display.textContent = display.textContent.slice(
      0,
      display.textContent.length - 3
    );
  } else {
    display.textContent = display.textContent.slice(
      0,
      display.textContent.length - 1
    );
  }
  if (display.textContent == "") {
    display.textContent = "0";
  }
}

function enableComa() {
  coma.disabled = false;
}
function disableComa() {
  coma.disabled = true;
}

function enableOperators() {
  operatorBtn.forEach((button) => {
    button.disabled = false;
  });
}
function disableOperators() {
  operatorBtn.forEach((button) => {
    button.disabled = true;
  });
}
function typeDigit(element) {
  if (display.textContent == "0") {
    display.textContent = "";
  }
  if (
    display.textContent.split(" ")[display.textContent.split(" ").length - 1][0] == "0" &&
    !display.textContent.includes(".")
  ) {
    return;
  }
  display.textContent += element.textContent;
  enableOperators();
}
function typeOperator(element) {
  if (display.textContent[display.textContent.length - 1] == ".") {
    return;
  }
  display.textContent += " " + element.textContent + " ";
  disableOperators();
  enableComa();
}

document.addEventListener("keydown", (event) => {
  digitBtn.forEach((button) => {
    if (event.key === button.textContent) {
      typeDigit(button);
    }
  });
});

digitBtn.forEach((button) => {
  button.addEventListener("click", () => typeDigit(button));
});

operatorBtn.forEach((button) => {
  button.addEventListener("click", () => typeOperator(button));
});

function calculate() {
  if (display.textContent[display.textContent.length - 1] == " ") {
    return;
  }
  const expression = display.textContent.split(" ");
  for (let i = 1; i <= expression.length - 1; i += 2) {
    if (expression[i] == "x") {
      const temp =
        parseFloat(expression[i - 1]) * parseFloat(expression[i + 1]);
      expression.splice(i - 1, 3, temp);
      i -= 2;
    }
    if (expression[i] == "÷") {
      const temp =
        parseFloat(expression[i - 1]) / parseFloat(expression[i + 1]);
      expression.splice(i - 1, 3, temp);
      i -= 2;
    }
  }
  for (let i = 1; i <= expression.length - 1; i += 2) {
    if (expression[i] == "+") {
      const temp =
        parseFloat(expression[i - 1]) + parseFloat(expression[i + 1]);
      expression.splice(i - 1, 3, temp);
      i -= 2;
    }
    if (expression[i] == "-") {
      const temp =
        parseFloat(expression[i - 1]) - parseFloat(expression[i + 1]);
      expression.splice(i - 1, 3, temp);
      i -= 2;
    }
  }
  display.textContent = expression[0];
}

const equals = document.querySelector("#equals");
equals.addEventListener("click", () => calculate());
