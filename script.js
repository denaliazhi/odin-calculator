/*
Calculator v.1 | Plan

Goal: Create an interactive calculator that allows a user
to perform basic arithmetic operations, such as
- Addition
- Subtraction
- Division
- Multiplication

Reqs | HTML
- Buttons for
    - Digits [0 - 9]
    - Arithmetic operators [+, -, *, /]
    - Enter [=]
    - Clear output [C]
- Display box

Reqs | Javascript
- Create an array (`userPicked`)

- If a digit is clicked, 
    - If array is empty, push the digit
        - No operation yet, so we start a new one
    - If array length == 1, append the digit to array[0]
        - Digit continues first operand
    - If array length == 2, push the digit
        - First operand and operator are defined
        - Digit starts the second operand
    - If array length == 3, append the digit to array[2]
        - Digit continues second operand

- If an operator button is clicked, 
    - If array length == 1, push the operator
    - If array length == 2, set operator to array[1]
        - "Override" the previous operator
    - If array length == 3, 
        - Pop all items from array
        - Perform operation and display result
            - Display should show decimals rounded to 3 digits
        - Push result
        - Push operator

- If enter is clicked,
    - If  array length < 3, do nothing
        - Incomplete operation
    - If  array length == 3, 
        - Pop all items from array
        - Perform operation and display result
        - Push result
        - POTENTIAL ISSUE: if next button is digit, it will be appended to the result
            - Potential fix: push special char to next slot (array[1])
            - When a digit is clicked, if array[1] == special char
                - Clear array
                - Push digit to array[0]

- When the clear button is clicked, clear the array
    - Set length to 0

- Write a function to perform any operation given `num1`, `op`, `num2`
    - If division by 0, return error message
    - Return the result

*/

function operate(num1, op, num2) {
    switch (op) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            if (num2 == 0) return "Undefined";
            return num1 / num2;
    }
}