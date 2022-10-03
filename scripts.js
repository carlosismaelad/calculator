const previousOperationText = document.querySelector ("#previous-operation")
const currentOperationText = document.querySelector ("#current-operation")
const buttons = document.querySelectorAll ("#buttons-container button")

class Calculator {
    constructor (previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = "";
    }

    //add digit calculator screen
    addDigit(digit) {
        //check if current operation already has a dot
        if(digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }

        this.currentOperation = digit
        this.updateScreen();
    }

    // process all calculator operations
    processOperation(operation) {
        // check is current is empty
        if(this.currentOperationText.innerText === "" && operation !== "C") {
            // change operation
            if(this.previousOperationText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }
        
        //get current and previous values
        let operationValue
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch (operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
            break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
            break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
            break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
            break;
            case "DEL":               
                this.processDelOperator()
            break;
            case "CE":               
                this.processClearCurrentOperation()
            break;
            case "C":               
                this.processClearAllOperation()
            break;
            case "=":               
                this.processEqualOperator()
            break;
            default:
            return;              
        }

    }

    // change values of this calculator screen
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
    ) {

    

        if(operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            // check if value is zero, if it is just current value
            if(previous === 0) {
                operationValue = current
            }

            // add current value to previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = "";
        }
    }

    // change math operation
    changeOperation(operation) {
        const mathOperations = ["*", "/", "+", "-"]

        if(!mathOperations.includes(operation)){
            return;
        }

        this.previousOperationText.innerText = 
            this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    // Delete the last digit
    processDelOperator() {
        this.currentOperationText.innerText = 
            this.currentOperationText.innerText.slice(0, -1)
    }

    // Clear current operation
    processClearCurrentOperation() {
        this.currentOperationText.innerText = "";
    }

    // Clear All Operations
    processClearAllOperation() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }
    
    // Process an Operator
    processEqualOperator() {

        const operation = previousOperationText.innerText.split(" ")[1]

        this.processOperation(operation);
    }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach ((btn) => {
    btn.addEventListener ("click", (e) => {
        const value = e.target.innerText;

        if(+value >= 0 || value === ".") {
        calc.addDigit(value)
        } else {
            calc.processOperation(value);
        }
        
    })
})