const firstNumber = process.argv[2];
const secondNumber = process.argv[3];
const operation = process.argv[4];

const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('add', (firstNumber, secondNumber) => {
  emitter.emit('result', firstNumber + secondNumber);
});

emitter.on('multiply', (firstNumber, secondNumber) => {
  emitter.emit('result', firstNumber * secondNumber);
});

emitter.on('result', (result) => {
  console.log(result);
})

const calc = () => {
  const availableOperations = ['add', 'multiply']

  if (!firstNumber) {
    console.log('Вы не передали число');
    return;
  }

  if (!secondNumber) {
    console.log('Вы не передали второе число');
    return;
  }

  if (!operation) {
    console.log('Вы не передали операцию');
    return;
  }

  if (isNaN(+firstNumber) || isNaN(+secondNumber)) {
    console.log('Вы ввели не число');
    return;
  }

  if (!availableOperations.includes(operation)) {
    console.log('Вы ввели не поддерживаемую операцию');
    console.log(`Доступные операции: ${availableOperations.join(', ')}`);
    return;
  }

  emitter.emit(operation, +firstNumber, +secondNumber);
}

calc();
