const calculate = ({array}) => {
  let res = 0;

  array.forEach((num) => {
    if (num % 3 === 0) {
      res ++;
    }
  })

  return res;
}

module.exports = calculate;
