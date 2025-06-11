const userPicked = [];

const digits = document.querySelector(".digits");
digits.addEventListener("click", updateNumber);

const operators = document.querySelector(".operators");
operators.addEventListener("click", updateOperator);

const general = document.querySelector(".general");
general.addEventListener("click", (e) => {
    if (e.target.parentNode.className != 'keypad') {
        const choice = e.target.textContent;
        if (choice == '=') {
            getResult(e);
        } else {
            clearAll();
            updateDisplay();
        }
    }
}
);

const display = document.querySelector(".display");
const output = document.createElement("p");

function updateNumber(e) {
    if (e.target.parentNode.className != 'keypad') {
        const digit = e.target.textContent;
        const len = userPicked.length;
        if (len == 0) {
            userPicked.push(digit);
        } else if (len == 2) {
            if (userPicked[1] == 'Last button was =') {
                clearAll();
            }
            userPicked.push(digit);
        } else if (len == 1) {
            userPicked[0] += digit;
        } else if (len == 3) {
            userPicked[2] += digit;
        }
        updateDisplay();
    }
}

function updateOperator(e) {
    if (e.target.parentNode.className != 'keypad') {
        const operator = e.target.textContent;
        const len = userPicked.length;

        if (len == 1) {
            userPicked.push(operator);
        } else if (len == 2) {
            userPicked[1] = operator;
        } else if (len == 3) {
            getResult();
            userPicked[1] = operator;
        }
        updateDisplay();
    }
}

function getResult() {
    const len = userPicked.length;
    if (len == 3){
        const result = operate(...userPicked);
        clearAll();
        userPicked.push(result);
        updateDisplay();
        userPicked.push('Last button was =');
    }
}

function clearAll() {
    userPicked.length = 0;
}

function operate(num1, op, num2) {
    switch (op) {
        case '+':
            return +num1 + +num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            if (num2 == 0) return "Undefined";
            return num1 / num2;
    }
}

function updateDisplay() {
    output.textContent = userPicked.join(' ');
    display.appendChild(output);
}