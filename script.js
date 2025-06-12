const userPicked = [];

const display = document.querySelector(".display");
const output = document.createElement("p");

const digits = document.querySelector(".digits");
digits.addEventListener("click", updateNumber);

const operators = document.querySelector(".operators");
operators.addEventListener("click", updateOperator);

const equals = document.querySelector(".equals");
equals.addEventListener("click", getResult);

const clear = document.querySelector(".clear-all");
clear.addEventListener("click", () => {
    clearAll();
    updateDisplay();
})

const clearEntry = document.querySelector(".clear-entry");
clearEntry.addEventListener("click", clearOne);

const decimal = document.querySelector(".separator");
decimal.addEventListener("click", addDecimal);

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
        } else if (len == 1 || len == 3) {
            userPicked[len - 1] += digit;
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

function addDecimal() {
    const len = userPicked.length;
    if (len == 1 || len == 3) {
        if (!userPicked[len - 1].includes('.')) {
            userPicked[len - 1] += '.';
        }
    } else {
        userPicked.push('.');
    }
    updateDisplay();
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
            if (num2 == 0) return 'Undefined';
            return num1 / num2;
    }
}

function getResult() {
    const len = userPicked.length;
    if (len == 3){
        const result = operate(...userPicked);
        clearAll();
        userPicked.push('' + result); // Keep as string, not number
        updateDisplay();
        // Fill operator slot with this message
        userPicked.push('Last button was =');
    }
}

function clearAll() {
    userPicked.length = 0;
}

function clearOne() {
    const len = userPicked.length;
    if (len == 0 || 
        userPicked[len - 1] == 'Last button was =') 
        return;
    if (userPicked[len - 1].length == 1) {
        userPicked.pop();
    } else {
        userPicked[len - 1] = userPicked[len - 1].slice(0, -1);
    }
    updateDisplay();
}

function updateDisplay() {
    output.textContent = userPicked.map(
            str => roundIfNumber(str)).join(' ');
    display.appendChild(output);
}

function roundIfNumber(str) {
    if ((str.slice(-1) !== '.') && (!Number.isNaN(+str))) {
        return Math.round(str * 10000) / 10000;
    }
    // Return as-is for case like '23.' or operator
    return str;
}