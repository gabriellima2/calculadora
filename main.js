class Calculator {
    constructor() {
        this.valuesTyped = document.querySelector('#values-typed');
        this.currentNumber = document.querySelector('#current-number');

        this.numbers = document.querySelectorAll('.numbers');
        this.operators = document.querySelectorAll('.operators');

        document.querySelector('#equal-operator').addEventListener('click', this.equal.bind(this));
        document.querySelector('#all-clean').addEventListener('click', this.allClean.bind(this));
        document.querySelector('#delete').addEventListener('click', this.delete.bind(this));

        this.typedOperator = undefined;
        this.result = undefined;
    };

    handleInfinityResult() {
        if ( this.currentNumber.textContent === 'Infinity' ) {
            this.allClean();
        };
    };

    equal() {
        if ( this.currentNumber.textContent && this.valuesTyped.textContent ) {
            const firstNumbers = Number(this.valuesTyped.textContent.replace(this.typedOperator, ''));
            const secondNumbers = Number(this.currentNumber.textContent);

            switch (this.typedOperator) {
                case '*':
                    this.result = firstNumbers * secondNumbers;
                    break;
                case '/':
                    this.result = firstNumbers / secondNumbers;
                    break;
                case '+':
                    this.result = firstNumbers + secondNumbers;
                    break;
                case '-':
                    this.result = firstNumbers - secondNumbers;
                    break;
                case '%':
                    this.result = ( firstNumbers / 100 ) * secondNumbers;
                    break;
                default:
                    break;
            };

            this.allClean();
            this.currentNumber.textContent = this.result;
        };
    };

    handleOperators(operator) {
        if ( this.currentNumber.textContent && !this.valuesTyped.textContent ) {
            const dotPosition = this.currentNumber.textContent.indexOf('.');
            const currentNumberLength = this.currentNumber.textContent.length - 1;

            // Caso digite somente '0.' vai acrescentar um zero após o ponto '0.0'!
            if ( dotPosition === currentNumberLength ) {
                this.currentNumber.textContent += 0;
            };

            this.typedOperator = operator;

            this.valuesTyped.textContent = this.currentNumber.textContent + operator;
            this.currentNumber.textContent = '';
            return;
        };
    };

    handleNumber(number) {
        this.handleInfinityResult();

        if ( !this.currentNumber.textContent && number === '.') {
            this.currentNumber.textContent = 0 + '.';
            return;
        };

        if ( number === '.' && this.currentNumber.textContent.indexOf('.') === -1 ) {
            this.currentNumber.textContent += number;
            return;
        };

        if ( number !== '.' ) {
            this.currentNumber.textContent += number;
        };
    };

    allClean() {
        this.valuesTyped.textContent = '';
        this.currentNumber.textContent = '';
        this.typedOperator = undefined;
    };

    delete() {
        this.handleInfinityResult();

        // Adiciona nos valores atuais os valores antigos.
        if ( !this.currentNumber.textContent ) {
            this.currentNumber.textContent = this.valuesTyped.textContent;
            this.valuesTyped.textContent = '';
            this.typedOperator = undefined;
        };

        // Deleta um número.
        const typedNumbers = this.currentNumber.textContent;
        this.currentNumber.textContent = typedNumbers.slice(0, typedNumbers.length - 1);
    };

    addEvents() {
        this.numbers.forEach( number => number.addEventListener('click', () => {
            this.handleNumber.apply(this, [number.textContent]);
        }));

        this.operators.forEach( operator => operator.addEventListener('click', () => {
            this.handleOperators.apply(this, [operator.textContent]);
        }));
    };
};

const calculator = new Calculator;
calculator.addEvents();
