class Calculator {
  constructor(idResultElement, idCalcElement, idButtonExecuteOperation, idButtonCleanup, idButtonBackspace, idButtonComma) {
    this.calc = '1 + 1';
    this.result = eval(this.calc);
    this.resultElement = document.getElementById(idResultElement);
    this.caclElement = document.getElementById(idCalcElement);
    this.buttonResult = document.getElementById(idButtonExecuteOperation);
    this.buttonCleanup = document.getElementById(idButtonCleanup);
    this.buttonBackspace = document.getElementById(idButtonBackspace);
    this.buttonComma = document.getElementById(idButtonComma);
    this.resultElement.innerText = String(this.result);
    this.caclElement.innerText = this.calc;
    this.buttonResult.onclick = this.executeOperation;
    this.buttonCleanup.onclick = this.cleanup;
    this.buttonBackspace.onclick = this.backspace;
    this.buttonComma.onclick = this.addComma;
  }

  updateCalc = () => {
    this.caclElement.innerText = this.calc;
  }

  updateResult = (value = this.calc) => {
    value = String(value);
    this.resultElement.innerText = !value.includes(',') ? eval(value) : String(eval(value.replace(',', '.'))).replace('.', ',');
  }

  verifyCalc = () => {
    const regex = /\W/;
    return regex.test(this.calc[this.calc.length - 1])
  }

  addNumber = (number) => {
    this.calc += String(number);
    this.updateCalc();
  };

  addOperator = (operator) => {
    if (!this.calc  || this.verifyCalc()) return;
    this.calc += ` ${operator} `;
    this.updateCalc();
  };

  addComma = () => {
    if (this.verifyCalc()) return;
    this.calc += ',';
    this.updateCalc();
  }

  executeOperation = () => {
    if (!this.calc || this.verifyCalc()) {
      this.cleanup();
      return;
    }
    this.updateResult();
  };

  cleanup = () => {
    this.calc = '';
    this.updateCalc();
    this.updateResult(0);
  }

  backspace = () => {
    if (!this.calc) return;
    if (this.verifyCalc()) {
      console.log(this.calc.substring(0, this.calc.length - 3))
      this.calc = this.calc.substring(0, this.calc.length - 3);
    } else {
      this.calc = this.calc.substring(0, this.calc.length - 1);
      if (this.calc[this.calc.length - 1] === ',') {
        this.calc = this.calc.substring(0, this.calc.length - 1);
      }
    }
    this.updateCalc();
  }

  addEventElement(strings, ...values) {
    const digits = values[0];
    digits.forEach( digit => document.getElementById(`${strings[0]}${digit}`).onclick = () => strings[0] === 'n' ? this.addNumber(digit) : this.addOperator(digit));
  };
};

const calculator = new Calculator('result', 'calc', 'execute', 'cleanup', 'backspace', 'comma');

calculator.addEventElement`n${Array.from(Array(10).keys())}`;
calculator.addEventElement`o${['+', '-', '*', '/', '%']}`;