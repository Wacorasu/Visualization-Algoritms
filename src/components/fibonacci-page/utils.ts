export const getFibonacciNumbers = (number: number): Array<number> => {
  const numberList: Array<number> = [0, 1];
  for (let i = 2; i < number + 2; i++) {
    numberList.push(numberList[i - 2] + numberList[i - 1]);
  }
  return numberList;
};
