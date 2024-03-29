const inputDataSelector = '[data-testid="inputListData"]';
const inputIndexSelector = '[data-testid="inputListIndex"]';
const buttonAddHeadSelector = '[data-testid="buttonListAddHead"]';
const buttonAddTailSelector = '[data-testid="buttonListAddTail"]';
const buttonRemoveHeadSelector = '[data-testid="buttonListRemoveHead"]';
const buttonRemoveTailSelector = '[data-testid="buttonListRemoveTail"]';
const buttonAddOnIndexSelector = '[data-testid="buttonListAddOnIndex"]';
const buttonRemoveOnIndex = '[data-testid="buttonListRemoveOnIndex"]';
const circlesContainerSelector = '[data-testid="circlesContainer"]';
const smallCirclesContainerSelector =
  '[data-testid="circlesContainerHeadTail"]';
const circleBorderSelector = '[data-testid="circleBorder"]';
const circleHeadSelector = '[data-testid="circlesHead"]';
const circleTailSelector = '[data-testid="circlesTail"]';

const displayStep = ({
  el,
  elHead,
  headOne,
  tailOne,
  headTwo = headOne,
  tailTwo = tailOne,
  headThree = headTwo,
  tailThree = tailTwo,
  indexAdd,
  stateD,
  stateC,
  stateM,
  inputData,
  outputDataOne,
  outputDataTwo = outputDataOne,
  outputDataThree = outputDataTwo,
  add,
  steps,
  start = headOne,
}) => {
  cy.get(elHead)
    .children(smallCirclesContainerSelector)
    .children(circleBorderSelector)
    .should("contain", inputData)
    .should("have.css", "border", `4px solid ${stateC}`)
    .as("circleTarget");

  cy.get(el).each(($el, index, mas) => {
    if (index > start) {
      if (index === indexAdd && headOne === indexAdd && add) {
        cy.get($el)
          .should("contain", "")
          .should("not.contain", "tail")
          .children(circleBorderSelector)
          .should("have.css", "border", `4px solid ${stateD}`)
          .should("contain", outputDataOne[index]);
      } else if (index === indexAdd && headOne === indexAdd && !add) {
        cy.get($el)
          .should("contain", "head")
          .should("contain", "")
          .children(circleBorderSelector)
          .should("have.css", "border", `4px solid ${stateD}`)
          .should("contain", outputDataOne[index]);
      } else if (index === headOne && headOne !== indexAdd) {
        cy.get($el)
          .should("contain", "head")
          .should("not.contain", "tail")
          .children(circleBorderSelector)
          .should("have.css", "border", `4px solid ${stateD}`)
          .should("contain", outputDataOne[index]);
      } else if (index === tailOne && indexAdd === tailOne && add) {
        cy.get($el)
          .should("contain", "")
          .should("contain", "tail")
          .children(circleBorderSelector)
          .should("have.css", "border", `4px solid ${stateD}`)
          .should("contain", outputDataOne[index]);
      } else if (index === tailOne && indexAdd === tailOne && !add) {
        cy.get($el)
          .should("not.contain", "head")
          .should("contain", "")
          .children(circleBorderSelector)
          .should("have.css", "border", `4px solid ${stateD}`)
          .should("contain", outputDataOne[index]);
      } else if (index === tailOne && indexAdd !== tailOne) {
        cy.get($el)
          .should("not.contain", "head")
          .should("contain", "tail")
          .children(circleBorderSelector)
          .should("have.css", "border", `4px solid ${stateD}`)
          .should("contain", outputDataOne[index]);
      } else if (
        index === indexAdd &&
        index !== headOne &&
        index !== tailOne &&
        add
      ) {
        cy.get($el)
          .should("contain", "")
          .should("not.contain", "tail")
          .children(circleBorderSelector)
          .should("have.css", "border", `4px solid ${stateD}`)
          .should("contain", outputDataOne[index]);
      } else if (
        index === indexAdd &&
        index !== headOne &&
        index !== tailOne &&
        !add
      ) {
        cy.get($el)
          .should("not.contain", "head")
          .should("contain", "")
          .children(circleBorderSelector)
          .should("have.css", "border", `4px solid ${stateD}`)
          .should("contain", outputDataOne[index]);
      } else if (index !== headOne && index !== tailOne && index !== indexAdd) {
        cy.get($el)
          .should("not.contain", "head")
          .should("not.contain", "tail")
          .children(circleBorderSelector)
          .should("have.css", "border", `4px solid ${stateD}`)
          .should("contain", outputDataOne[index]);
      }
    }
  });
  cy.get(el)
    .children(circleBorderSelector, {
      timeout: 1000 * outputDataTwo.length,
    })
    .should("have.lengthOf", outputDataTwo.length);
  cy.get(el).each(($el, index) => {
    if (index === indexAdd && add) {
      cy.get($el)
        .children(circleBorderSelector)
        .should("have.css", "border", `4px solid ${stateM}`);
    } else {
      cy.get($el)
        .children(circleBorderSelector)
        .should("have.css", "border", `4px solid ${stateD}`);
    }
    if (index === headTwo && headTwo === indexAdd) {
      cy.get($el)
        .should("contain", "head")
        .should("not.contain", "tail")
        .should("contain", outputDataTwo[index]);
    } else if (index === headTwo && headTwo !== indexAdd) {
      cy.get($el)
        .should("contain", "head")
        .should("not.contain", "tail")
        .should("contain", outputDataTwo[index]);
    } else if (index === headTwo && tailTwo === indexAdd) {
      cy.get($el)
        .should("not.contain", "head")
        .should("contain", "tail")
        .should("contain", outputDataTwo[index]);
    } else if (index === tailTwo && tailTwo !== indexAdd) {
      cy.get($el)
        .should("not.contain", "head")
        .should("contain", "tail")
        .should("contain", outputDataTwo[index]);
    } else if (index === indexAdd && index !== headTwo && index !== tailTwo) {
      cy.get($el)
        .should("not.contain", "head")
        .should("not.contain", "tail")
        .should("contain", outputDataTwo[index]);
    } else if (index !== headTwo && index !== tailTwo) {
      cy.get($el)
        .should("not.contain", "head")
        .should("not.contain", "tail")
        .should("contain", outputDataTwo[index]);
    }
  });
  cy.get(el)
    .children(circleBorderSelector, {
      timeout: 1000 * outputDataTwo.length,
    })
    .should("have.lengthOf", outputDataThree.length);
  cy.get(el).each(($el, index) => {
    if (index === headThree) {
      cy.get($el)
        .should("contain", "head")
        .should("not.contain", "tail")
        .children(circleBorderSelector)
        .should("have.css", "border", `4px solid ${stateD}`)
        .should("contain", outputDataThree[index]);
    } else if (index === tailThree) {
      cy.get($el)
        .should("not.contain", "head")
        .should("contain", "tail")
        .children(circleBorderSelector)
        .should("have.css", "border", `4px solid ${stateD}`)
        .should("contain", outputDataThree[index]);
    } else {
      cy.get($el)
        .should("not.contain", "head")
        .should("not.contain", "tail")
        .children(circleBorderSelector)
        .should("have.css", "border", `4px solid ${stateD}`)
        .should("contain", outputDataThree[index]);
    }
  });
};

const displayStepIndex = ({
  el,
  elHead,
  headOne,
  tailOne,
  headTwo = headOne,
  tailTwo = tailOne,
  headThree = headTwo,
  tailThree = tailTwo,
  indexAdd,
  stateD,
  stateC,
  stateM,
  inputData,
  outputDataOne,
  outputDataTwo = outputDataOne,
  outputDataThree = outputDataTwo,
  add,
}) => {
  cy.get(el).each(($el, index, mas) => {
    if (add) {
      cy.get(elHead)
        .children(smallCirclesContainerSelector)
        .children(circleBorderSelector)
        .should("contain", inputData)
        .should("have.css", "border", `4px solid ${stateC}`)
        .as("circleTarget");
    }

    if (index < indexAdd && add) {
      cy.get($el)
        .children(circleBorderSelector)
        .should("have.css", "border", `4px solid ${stateC}`);
    } else if (index <= indexAdd && !add) {
      cy.get($el)
        .children(circleBorderSelector)
        .should("have.css", "border", `4px solid ${stateC}`);
    } else {
      cy.get($el)
        .children(circleBorderSelector)
        .should("have.css", "border", `4px solid ${stateD}`);
    }
  });
  if (!add) {
    displayStep({
      el: el,
      elHead: elHead,
      headOne: headOne,
      tailOne: tailOne,
      headTwo: headTwo,
      tailTwo: tailTwo,
      headThree: headThree,
      tailThree: tailThree,
      indexAdd: indexAdd,
      stateC: stateC,
      stateD: stateD,
      stateM: stateM,
      outputDataOne: outputDataTwo,
      outputDataTwo: outputDataTwo,
      outputDataThree: outputDataThree,
      inputData: inputData,
      add: add,
    });
  }
  if (add) {
    displayStep({
      el: el,
      elHead: elHead,
      headOne: headOne,
      tailOne: tailTwo,
      headTwo: headTwo,
      tailTwo: tailTwo,
      indexAdd: indexAdd,
      stateC: stateC,
      stateD: stateD,
      stateM: stateM,
      outputDataOne: outputDataTwo,
      outputDataTwo: outputDataTwo,
      inputData: inputData,
      add: add,
      start: indexAdd,
    });
  }
};

describe('компонент "Связный список" работает корректно', function () {
  before(function () {
    cy.visit("/list");
  });

  it("кнопки добавления и удаления по индексу должны быть недоступны при пустом инпуте", function () {
    cy.get(inputDataSelector).should("contain", "");
    cy.get(buttonAddHeadSelector).should("be.disabled");
    cy.get(buttonAddTailSelector).should("be.disabled");
    cy.get(buttonAddOnIndexSelector).should("be.disabled");
    cy.get(buttonRemoveOnIndex).should("be.disabled");
  });

  it("начальный список отрисовывается корректно", function () {
    cy.visit("/list");
    const outputData = ["1", "2", "3", "4"];
    const head = 0;
    const tail = outputData.length - 1;
    const stateDefault = "rgb(0, 50, 255)";

    cy.get(circlesContainerSelector).as("circles");

    cy.get("@circles").each(($el, index) => {
      if (index === head) {
        cy.get($el)
          .should("contain", "head")
          .should("not.contain", "tail")
          .children(circleBorderSelector)
          .should("have.css", "border", `4px solid ${stateDefault}`)
          .should("contain", outputData[index]);
      } else if (index === tail) {
        cy.get($el)
          .should("not.contain", "head")
          .should("contain", "tail")
          .children(circleBorderSelector)
          .should("have.css", "border", `4px solid ${stateDefault}`)
          .should("contain", outputData[index]);
      } else {
        cy.get($el)
          .should("not.contain", "head")
          .should("not.contain", "tail")
          .children(circleBorderSelector)
          .should("have.css", "border", `4px solid ${stateDefault}`)
          .should("contain", outputData[index]);
      }
    });
  });

  it("добавление элемента в head отрисовывается корректно", function () {
    cy.visit("/List");
    const inputData = "22";
    const outputDataSt1 = ["1", "2", "3", "4"];
    const outputDataSt2 = ["22", "1", "2", "3", "4"];
    const headSt1 = 0;
    const tailSt1 = outputDataSt1.length - 1;
    const headSt2 = 0;
    const tailSt2 = outputDataSt2.length - 1;
    const indexAdd = 0;
    const stateDefault = "rgb(0, 50, 255)";
    const stateChanging = "rgb(210, 82, 225)";
    const stateModified = "rgb(127, 224, 81)";

    cy.get(inputDataSelector).type(inputData);
    cy.get(buttonAddHeadSelector).click();
    cy.get(circlesContainerSelector).as("circles");
    cy.get(circleHeadSelector).as("circlesHead");
    displayStep({
      el: "@circles",
      elHead: "@circlesHead",
      headOne: headSt1,
      tailOne: tailSt1,
      headTwo: headSt2,
      tailTwo: tailSt2,
      indexAdd: indexAdd,
      stateC: stateChanging,
      stateD: stateDefault,
      stateM: stateModified,
      outputDataOne: outputDataSt1,
      outputDataTwo: outputDataSt2,
      inputData: inputData,
      add: true,
    });
  });

  it("добавление элемента в tail отрисовывается корректно", function () {
    cy.visit("/List");
    const inputData = "22";
    const outputDataSt1 = ["1", "2", "3", "4"];
    const outputDataSt2 = ["1", "2", "3", "4", "22"];
    const headSt1 = 0;
    const tailSt1 = outputDataSt1.length - 1;
    const headSt2 = 0;
    const tailSt2 = outputDataSt2.length - 1;
    const indexAdd = outputDataSt2.length - 1;
    const stateDefault = "rgb(0, 50, 255)";
    const stateChanging = "rgb(210, 82, 225)";
    const stateModified = "rgb(127, 224, 81)";

    cy.get(inputDataSelector).type(inputData);
    cy.get(buttonAddTailSelector).click();
    cy.get(circlesContainerSelector).as("circles");
    cy.get(circleHeadSelector).as("circlesHead");
    displayStep({
      el: "@circles",
      elHead: "@circlesHead",
      headOne: headSt1,
      tailOne: tailSt1,
      headTwo: headSt2,
      tailTwo: tailSt2,
      indexAdd: indexAdd,
      stateC: stateChanging,
      stateD: stateDefault,
      stateM: stateModified,
      outputDataOne: outputDataSt1,
      outputDataTwo: outputDataSt2,
      inputData: inputData,
      add: true,
    });
  });

  it("добавление элемента по индексу отрисовывается корректно", function () {
    cy.visit("/List");
    const inputData = "22";
    const outputDataSt1 = ["1", "2", "3", "4"];
    const outputDataSt2 = ["1", "2", "22", "3", "4"];
    const headSt1 = 0;
    const tailSt1 = outputDataSt1.length - 1;
    const headSt2 = 0;
    const tailSt2 = outputDataSt2.length - 1;
    const indexAdd = 2;
    const stateDefault = "rgb(0, 50, 255)";
    const stateChanging = "rgb(210, 82, 225)";
    const stateModified = "rgb(127, 224, 81)";

    cy.get(inputDataSelector).type(inputData);
    cy.get(inputIndexSelector).type(indexAdd);
    cy.get(buttonAddOnIndexSelector).click();
    cy.get(circlesContainerSelector).as("circles");
    cy.get(circleHeadSelector).as("circlesHead");
    displayStepIndex({
      el: "@circles",
      elHead: "@circlesHead",
      headOne: headSt1,
      tailOne: tailSt1,
      headTwo: headSt2,
      tailTwo: tailSt2,
      indexAdd: indexAdd,
      stateC: stateChanging,
      stateD: stateDefault,
      stateM: stateModified,
      outputDataOne: outputDataSt1,
      outputDataTwo: outputDataSt2,
      inputData: inputData,
      add: true,
      steps: true,
    });
  });

  it("удаление элемента из head отрисовывается корректно", function () {
    cy.visit("/List");
    const inputData = "1";
    const outputDataSt1 = ["", "2", "3", "4"];
    const outputDataSt2 = ["", "2", "3", "4"];
    const outputDataSt3 = ["2", "3", "4"];
    const headSt1 = 0;
    const tailSt1 = outputDataSt1.length - 1;
    const headSt2 = 0;
    const tailSt2 = outputDataSt2.length - 1;
    const headSt3 = 0;
    const tailSt3 = outputDataSt3.length - 1;
    const indexAdd = 0;
    const stateDefault = "rgb(0, 50, 255)";
    const stateChanging = "rgb(210, 82, 225)";
    const stateModified = "rgb(127, 224, 81)";

    cy.get(buttonRemoveHeadSelector).click();
    cy.get(circlesContainerSelector).as("circles");
    cy.get(circleTailSelector).as("circlesTail");
    displayStep({
      el: "@circles",
      elHead: "@circlesTail",
      headOne: headSt1,
      tailOne: tailSt1,
      headTwo: headSt2,
      tailTwo: tailSt2,
      headThree: headSt3,
      tailThree: tailSt3,
      indexAdd: indexAdd,
      stateC: stateChanging,
      stateD: stateDefault,
      stateM: stateModified,
      outputDataOne: outputDataSt1,
      outputDataTwo: outputDataSt2,
      outputDataThree: outputDataSt3,
      inputData: inputData,
      add: false,
    });
  });

  it("удаление элемента из tail отрисовывается корректно", function () {
    cy.visit("/List");
    const inputData = "4";
    const outputDataSt1 = ["1", "2", "3", ""];
    const outputDataSt2 = ["1", "2", "3", ""];
    const outputDataSt3 = ["1", "2", "3"];
    const headSt1 = 0;
    const tailSt1 = outputDataSt1.length - 1;
    const headSt2 = 0;
    const tailSt2 = outputDataSt2.length - 1;
    const headSt3 = 0;
    const tailSt3 = outputDataSt3.length - 1;
    const indexAdd = 3;
    const stateDefault = "rgb(0, 50, 255)";
    const stateChanging = "rgb(210, 82, 225)";
    const stateModified = "rgb(127, 224, 81)";

    cy.get(buttonRemoveTailSelector).click();
    cy.get(circlesContainerSelector).as("circles");
    cy.get(circleTailSelector).as("circlesTail");
    displayStep({
      el: "@circles",
      elHead: "@circlesTail",
      headOne: headSt1,
      tailOne: tailSt1,
      headTwo: headSt2,
      tailTwo: tailSt2,
      headThree: headSt3,
      tailThree: tailSt3,
      indexAdd: indexAdd,
      stateC: stateChanging,
      stateD: stateDefault,
      stateM: stateModified,
      outputDataOne: outputDataSt1,
      outputDataTwo: outputDataSt2,
      outputDataThree: outputDataSt3,
      inputData: inputData,
      add: false,
    });
  });

  it("удаление элемента по индексу отрисовывается корректно", function () {
    cy.visit("/List");
    const inputData = "3";
    const outputDataSt1 = ["1", "2", "3", "4"];
    const outputDataSt2 = ["1", "2", "", "4"];
    const outputDataSt3 = ["1", "2", "4"];
    const headSt1 = 0;
    const tailSt1 = outputDataSt1.length - 1;
    const headSt2 = 0;
    const tailSt2 = outputDataSt2.length - 1;
    const headSt3 = 0;
    const tailSt3 = outputDataSt3.length - 1;
    const indexAdd = 2;
    const stateDefault = "rgb(0, 50, 255)";
    const stateChanging = "rgb(210, 82, 225)";
    const stateModified = "rgb(127, 224, 81)";

    cy.get(inputDataSelector).type(inputData);
    cy.get(inputIndexSelector).type(indexAdd);
    cy.get(buttonRemoveOnIndex).click();
    cy.get(circlesContainerSelector).as("circles");
    cy.get(circleTailSelector).as("circlesTail");
    displayStepIndex({
      el: "@circles",
      elHead: "@circlesTail",
      headOne: headSt1,
      tailOne: tailSt1,
      headTwo: headSt2,
      tailTwo: tailSt2,
      headThree: headSt3,
      tailThree: tailSt3,
      indexAdd: indexAdd,
      stateC: stateChanging,
      stateD: stateDefault,
      stateM: stateModified,
      outputDataOne: outputDataSt1,
      outputDataTwo: outputDataSt2,
      outputDataThree: outputDataSt3,
      inputData: inputData,
      add: false,
    });
  });
});
