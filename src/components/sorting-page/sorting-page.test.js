import "@testing-library/jest-dom/extend-expect";
import { sortingMethods } from "./utils";

describe("Проверка на разворот строки", () => {

  it("сортировка пустого массива методом пузырек по возрастанию", () => {
    const inputData = [];
    const typeSorting='ascending';
    const methodSorting='bubble';
    const expectedData = [];
    const lengthOutputData = sortingMethods(typeSorting, methodSorting, inputData).length - 1;
    const getStepsTest = jest.fn((type, method, numbers) => {
      if(lengthOutputData>=0){
        return sortingMethods(type, method, numbers)[lengthOutputData].letters
      } else return sortingMethods(type, method, numbers)
    });
    getStepsTest(typeSorting, methodSorting, inputData);
    expect(getStepsTest).toHaveReturnedWith(expectedData);
  });

  it("сортировка пустого массива методом пузырек по убыванию", () => {
    const inputData = [];
    const typeSorting='descending';
    const methodSorting='bubble';
    const expectedData = [];
    const lengthOutputData = sortingMethods(typeSorting, methodSorting, inputData).length - 1;
    const getStepsTest = jest.fn((type, method, numbers) => {
      if(lengthOutputData>=0){
        return sortingMethods(type, method, numbers)[lengthOutputData].letters
      } else return sortingMethods(type, method, numbers)
    });
    getStepsTest(typeSorting, methodSorting, inputData);
    expect(getStepsTest).toHaveReturnedWith(expectedData);
  });

  it("сортировка массива с одним элементом методом пузырек по возрастанию", () => {
    const inputData = [1];
    const typeSorting='ascending';
    const methodSorting='bubble';
    const expectedData = [1];
    const lengthOutputData = sortingMethods(typeSorting, methodSorting, inputData).length - 1;
    const getStepsTest = jest.fn((type, method, numbers) => {
      if(lengthOutputData>=0){
        return sortingMethods(type, method, numbers)[lengthOutputData].letters
      } else return sortingMethods(type, method, numbers)
    });
    getStepsTest(typeSorting, methodSorting, inputData);
    expect(getStepsTest).toHaveReturnedWith(expectedData);
  });

  it("сортировка массива с одним элементом методом пузырек по убыванию", () => {
    const inputData = [1];
    const typeSorting='descending';
    const methodSorting='bubble';
    const expectedData = [1];
    const lengthOutputData = sortingMethods(typeSorting, methodSorting, inputData).length - 1;
    const getStepsTest = jest.fn((type, method, numbers) => {
      if(lengthOutputData>=0){
        return sortingMethods(type, method, numbers)[lengthOutputData].letters
      } else return sortingMethods(type, method, numbers)
    });
    getStepsTest(typeSorting, methodSorting, inputData);
    expect(getStepsTest).toHaveReturnedWith(expectedData);
  });

  it("сортировка массива с несколькими элементом методом пузырек по возрастанию", () => {
    const inputData = [2, 1];
    const typeSorting='ascending';
    const methodSorting='bubble';
    const expectedData = [1, 2];
    const lengthOutputData = sortingMethods(typeSorting, methodSorting, inputData).length - 1;
    const getStepsTest = jest.fn((type, method, numbers) => {
      if(lengthOutputData>=0){
        return sortingMethods(type, method, numbers)[lengthOutputData].letters
      } else return sortingMethods(type, method, numbers)
    });
    getStepsTest(typeSorting, methodSorting, inputData);
    expect(getStepsTest).toHaveReturnedWith(expectedData);
  });

  it("сортировка массива с несколькими элементом методом пузырек по убыванию", () => {
    const inputData = [1, 2];
    const typeSorting='descending';
    const methodSorting='bubble';
    const expectedData = [2, 1];
    const lengthOutputData = sortingMethods(typeSorting, methodSorting, inputData).length - 1;
    const getStepsTest = jest.fn((type, method, numbers) => {
      if(lengthOutputData>=0){
        return sortingMethods(type, method, numbers)[lengthOutputData].letters
      } else return sortingMethods(type, method, numbers)
    });
    getStepsTest(typeSorting, methodSorting, inputData);
    expect(getStepsTest).toHaveReturnedWith(expectedData);
  });


  it("сортировка пустого массива методом выбор по возрастанию", () => {
    const inputData = [];
    const typeSorting='ascending';
    const methodSorting='choice';
    const expectedData = [];
    const lengthOutputData = sortingMethods(typeSorting, methodSorting, inputData).length - 1;
    const getStepsTest = jest.fn((type, method, numbers) => {
      if(lengthOutputData>=0){
        return sortingMethods(type, method, numbers)[lengthOutputData].letters
      } else return sortingMethods(type, method, numbers)
    });
    getStepsTest(typeSorting, methodSorting, inputData);
    expect(getStepsTest).toHaveReturnedWith(expectedData);
  });

  it("сортировка пустого массива методом выбор по убыванию", () => {
    const inputData = [];
    const typeSorting='descending';
    const methodSorting='choice';
    const expectedData = [];
    const lengthOutputData = sortingMethods(typeSorting, methodSorting, inputData).length - 1;
    const getStepsTest = jest.fn((type, method, numbers) => {
      if(lengthOutputData>=0){
        return sortingMethods(type, method, numbers)[lengthOutputData].letters
      } else return sortingMethods(type, method, numbers)
    });
    getStepsTest(typeSorting, methodSorting, inputData);
    expect(getStepsTest).toHaveReturnedWith(expectedData);
  });

  it("сортировка массива с одним элементом методом выбор по возрастанию", () => {
    const inputData = [1];
    const typeSorting='ascending';
    const methodSorting='choice';
    const expectedData = [1];
    const lengthOutputData = sortingMethods(typeSorting, methodSorting, inputData).length - 1;
    const getStepsTest = jest.fn((type, method, numbers) => {
      if(lengthOutputData>=0){
        return sortingMethods(type, method, numbers)[lengthOutputData].letters
      } else return sortingMethods(type, method, numbers)
    });
    getStepsTest(typeSorting, methodSorting, inputData);
    expect(getStepsTest).toHaveReturnedWith(expectedData);
  });

  it("сортировка массива с одним элементом методом выбор по убыванию", () => {
    const inputData = [1];
    const typeSorting='descending';
    const methodSorting='choice';
    const expectedData = [1];
    const lengthOutputData = sortingMethods(typeSorting, methodSorting, inputData).length - 1;
    const getStepsTest = jest.fn((type, method, numbers) => {
      if(lengthOutputData>=0){
        return sortingMethods(type, method, numbers)[lengthOutputData].letters
      } else return sortingMethods(type, method, numbers)
    });
    getStepsTest(typeSorting, methodSorting, inputData);
    expect(getStepsTest).toHaveReturnedWith(expectedData);
  });

  it("сортировка массива с несколькими элементом методом выбор по возрастанию", () => {
    const inputData = [2, 1];
    const typeSorting='ascending';
    const methodSorting='choice';
    const expectedData = [1, 2];
    const lengthOutputData = sortingMethods(typeSorting, methodSorting, inputData).length - 1;
    const getStepsTest = jest.fn((type, method, numbers) => {
      if(lengthOutputData>=0){
        return sortingMethods(type, method, numbers)[lengthOutputData].letters
      } else return sortingMethods(type, method, numbers)
    });
    getStepsTest(typeSorting, methodSorting, inputData);
    expect(getStepsTest).toHaveReturnedWith(expectedData);
  });

  it("сортировка массива с несколькими элементом методом выбор по убыванию", () => {
    const inputData = [1, 2];
    const typeSorting='descending';
    const methodSorting='choice';
    const expectedData = [2, 1];
    const lengthOutputData = sortingMethods(typeSorting, methodSorting, inputData).length - 1;
    const getStepsTest = jest.fn((type, method, numbers) => {
      if(lengthOutputData>=0){
        return sortingMethods(type, method, numbers)[lengthOutputData].letters
      } else return sortingMethods(type, method, numbers)
    });
    getStepsTest(typeSorting, methodSorting, inputData);
    expect(getStepsTest).toHaveReturnedWith(expectedData);
  });

});