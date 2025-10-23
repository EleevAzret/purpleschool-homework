const {PerformanceObserver} = require('perf_hooks');
const {Worker} = require('worker_threads');
const calculate = require('./calculate');

const performanceObserver = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(`${entry.name}: ${entry.duration}`);
  })
})

performanceObserver.observe({entryTypes: ['measure']});

const workerFunction = (array) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./5-multithreads/worker.js', {workerData: {array}});

    worker.on('message', resolve);
    worker.on('error', reject);
  })
}

const getArray = () => Array.from({length: 300000}, (_, idx) => idx + 1);

const spliceArrayBy = (arr, number) => {
  const count = arr.length / number;
  const res = [];

  for (let i = 0; i < number; i++) {
    res.push(arr.splice(0, count))
  }

  return res;
}

const linear = async () => {
  performance.mark('linear-start');

  const array = getArray();
  const res = calculate({array});

  console.log(`result from linear: ${res}`);

  performance.mark('linear-end');
  performance.measure('linear', 'linear-start', 'linear-end');
}

const workers = async () => {
  performance.mark('workers-start');

  const array = getArray();
  const splicedArr = spliceArrayBy(array, 8)
  
  const result = await Promise.all(splicedArr.map((arr) => workerFunction(arr)));
  const resultCount = result.reduce((acc, num) => acc += num, 0)

  console.log(`result from workers: ${resultCount}`);

  performance.mark('workers-end');
  performance.measure('workers', 'workers-start', 'workers-end');
}

linear();
workers();
