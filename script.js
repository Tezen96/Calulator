let display = document.getElementById('result');

function appendToDisplay(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        // Replace × with * for evaluation
        let expression = display.value.replace(/×/g, '*');
        
        // Basic validation to prevent unsafe evaluation
        if (!isValidExpression(expression)) {
            throw new Error('Invalid expression');
        }
        
        // Using Function constructor instead of eval for better security
        let result = new Function('return ' + expression)();
        
        // Handle division by zero and other mathematical errors
        if (!isFinite(result)) {
            throw new Error('Math error');
        }
        
        display.value = result;
    } catch (error) {
        display.value = 'Error';
        setTimeout(() => {
            clearDisplay();
        }, 1500);
    }
}

function isValidExpression(expr) {
    // Basic validation for safe mathematical expressions
    const safeRegex = /^[0-9+\-*/.()\s]+$/;
    return safeRegex.test(expr) && 
           !expr.includes('**') && // No exponentiation
           !expr.includes('//');   // No comments
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendToDisplay(key);
    } else if (key === '.') {
        appendToDisplay('.');
    } else if (key === '+' || key === '-' || key === '*') {
        appendToDisplay(key === '*' ? '×' : key);
    } else if (key === '/') {
        event.preventDefault();
        appendToDisplay('/');
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Escape' || key === 'Delete') {
        clearDisplay();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === '(' || key === ')') {
        appendToDisplay(key);
    }
});

// Prevent default behavior for calculator keys
document.addEventListener('keydown', function(event) {
    if (['Enter', '=', '+', '-', '*', '/', '.'].includes(event.key)) {
        event.preventDefault();
    }
});