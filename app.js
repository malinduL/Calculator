function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    if (y === 0) {
        return "Error";
    }
    return x / y;
}

function clearDisplay() {
    document.getElementById("result").value = "";
}

function updateDisplay(value) {
    document.getElementById("result").value += value;
}

function calculate() {
    var expression = document.getElementById("result").value;
    var result;

    var regex = /(\d+\.?\d*)|([+\-*/()])/g;
    var tokens = expression.match(regex);

    if (!tokens || tokens.length === 0) {
        document.getElementById("result").value = "Error";
        return;
    }

    try {
        var outputQueue = [];
        var operatorStack = [];
        var precedence = { '+': 1, '-': 1, '*': 2, '/': 2 };

        tokens.forEach(function(token) {
            if (token.match(/\d+/)) {
                outputQueue.push(token);
            } else if (token === '(') {
                operatorStack.push(token);
            } else if (token === ')') {
                while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
                    outputQueue.push(operatorStack.pop());
                }
                if (operatorStack.length === 0) {
                    throw "Mismatched parentheses";
                }
                operatorStack.pop();
            } else {
                while (operatorStack.length > 0 && precedence[token] <= precedence[operatorStack[operatorStack.length - 1]]) {
                    outputQueue.push(operatorStack.pop());
                }
                operatorStack.push(token);
            }
        });

        while (operatorStack.length > 0) {
            if (operatorStack[operatorStack.length - 1] === '(' || operatorStack[operatorStack.length - 1] === ')') {
                throw "Mismatched parentheses";
            }
            outputQueue.push(operatorStack.pop());
        }

        var stack = [];
        outputQueue.forEach(function(token) {
            if (token.match(/\d+/)) {
                stack.push(parseFloat(token));
            } else {
                if (stack.length < 2) {
                    throw "Invalid expression";
                }
                var b = stack.pop();
                var a = stack.pop();
                switch (token) {
                    case '+':
                        stack.push(a + b);
                        break;
                    case '-':
                        stack.push(a - b);
                        break;
                    case '*':
                        stack.push(a * b);
                        break;
                    case '/':
                        if (b === 0) {
                            throw "Division by zero";
                        }
                        stack.push(a / b);
                        break;
                    default:
                        throw "Unknown operator: " + token;
                }
            }
        });

        if (stack.length !== 1) {
            throw "Invalid expression";
        }

        result = stack.pop();
        document.getElementById("result").value = result;
    } catch (error) {
        document.getElementById("result").value = "Error";
    }
}



