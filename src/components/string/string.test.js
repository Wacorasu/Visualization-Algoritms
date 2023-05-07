import "@testing-library/jest-dom/extend-expect";
import { getSteps } from "./utils";

describe("Проверка на разворот строки", () => {
  it("разворот строки с четным количеством символов", () => {
    const inputData = "ABCD";
    const expectedData = ["D", "C", "B", "A"];
    const lengthOutputData = getSteps(inputData).length - 1;
    const getStepsTest = jest.fn((data) => {
      if (lengthOutputData > 0) {
        return getSteps(data)[lengthOutputData].letters;
      } else return getSteps(data);
    });
    getStepsTest(inputData);
    expect(getStepsTest).toHaveReturnedWith(expectedData);
  });

  it("разворот строки с нечетным количеством символов", () => {
    const inputData = "ABC";
    const expectedData = ["C", "B", "A"];
    const lengthOutputData = getSteps(inputData).length - 1;
    const getStepsTest = jest.fn((data) => {
      if (lengthOutputData > 0) {
        return getSteps(data)[lengthOutputData].letters;
      } else return getSteps(data);
    });
    getStepsTest(inputData);
    expect(getStepsTest).toHaveReturnedWith(expectedData);
  });

  it("разворот строки с одним символом", () => {
    const inputData = "A";
    const expectedData = ["A"];
    const lengthOutputData = getSteps(inputData).length - 1;
    const getStepsTest = jest.fn((data) => {
      if (lengthOutputData > 0) {
        return getSteps(data)[lengthOutputData].letters;
      } else return getSteps(data);
    });
    getStepsTest(inputData);
    expect(getStepsTest).toHaveReturnedWith(expectedData);
  });

  it("разворот пустой строки", () => {
    const inputData = "";
    const expectedData = [];
    const lengthOutputData = getSteps(inputData).length - 1;
    const getStepsTest = jest.fn((data) => {
      if (lengthOutputData > 0) {
        return getSteps(data)[lengthOutputData].letters;
      } else return getSteps(data);
    });
    getStepsTest(inputData);
    expect(getStepsTest).toHaveReturnedWith(expectedData);
  });
});
