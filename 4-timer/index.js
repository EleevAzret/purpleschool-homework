const args = process.argv.slice(2);

const hoursSymbolsMap = [
  'h',
  'hr',
  'hrs',
  'hour',
  'hours',
  'ч',
  'час',
  'часов',
  'часа',
]

const minutesSymbolsMap = [
  'm',
  'mn',
  'min',
  'mins',
  'minute',
  'minutes',
  'м',
  'мин',
  'минут',
]

const secondsSymbolsMap = [
  's',
  'sec',
  'secs',
  'second',
  'seconds',
  'с',
  'сек',
  'секунд',
]

let hours = 0;
let minutes = 0;
let seconds = 0;

args.forEach((arg, idx) => {
  const symbols = arg.replace(/[0-9]+/, '');
  const number = arg.replace(/[A-Za-zА-Яа-я]+/, '');

  if (!number) {
    return;
  }

  if (!symbols) {
    switch (idx) {
      case 0:
        hours += +number;
        break;
      case 1:
        minutes += +number;
        break;
      case 2:
        seconds += +number;
        break;
    }
    return;
  }

  if (hoursSymbolsMap.includes(symbols)) {
    hours += +number;
    return;
  }

  if (minutesSymbolsMap.includes(symbols)) {
    minutes += +number;
    return;
  }

  if (secondsSymbolsMap.includes(symbols)) {
    seconds += +number;
    return;
  }
})

const timeout = (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000);

setTimeout(() => {
  console.log('Timer finished');
}, timeout);
