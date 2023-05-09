const inputDataSelector = '[data-testid="inputQueue"]';
const buttonAddSelector = '[data-testid="buttonQueueAdd"]';
const buttonRemoveSelector = '[data-testid="buttonQueueRemove"]';
const buttonResetSelector = '[data-testid="buttonQueueReset"]';
const circlesContainerSelector = '[data-testid="circlesContainer"]';
const circleBorderSelector = '[data-testid="circleBorder"]';

const displayStep = ({
  el,
  headOne,
  tailOne,
  headTwo = headOne,
  tailTwo = tailOne,
  stateOne,
  stateTwo,
  outputDataOne,
  outputDataTwo = outputDataOne,
  add,
}) => {
  cy.get(el).each(($el, index) => {
    if (headOne <= index && index <= tailOne) {
      if (add && tailOne === index) {
        cy.get($el)
          .children(circleBorderSelector)
          .should("have.css", "border", `4px solid ${stateOne}`);
      } else if (headOne === index && !add) {
        cy.get($el)
          .children(circleBorderSelector)
          .should("have.css", "border", `4px solid ${stateOne}`);
      } else {
        cy.get($el)
          .children(circleBorderSelector)
          .should("have.css", "border", `4px solid ${stateTwo}`);
      }
      if (headOne === index && index === tailOne) {
        cy.get($el)
          .should("contain", "head")
          .should("contain", "tail")
          .children(circleBorderSelector)
          .should("contain", outputDataOne[index]);
      } else if (headOne === index) {
        cy.get($el)
          .should("contain", "head")
          .children(circleBorderSelector)
          .should("contain", outputDataOne[index]);
      } else if (tailOne === index) {
        cy.get($el)
          .should("contain", "tail")
          .children(circleBorderSelector)
          .should("contain", outputDataOne[index]);
      } else {
        cy.get($el)
          .children(circleBorderSelector)
          .should("contain", outputDataOne[index]);
      }
    }
  });
  cy.get(el).each(($el, index) => {
    if (headTwo <= index && index <= tailTwo) {
      cy.get($el)
        .children(circleBorderSelector)
        .should("have.css", "border", `4px solid ${stateTwo}`);
      if (headTwo === index && index === tailTwo) {
        cy.get($el)
          .should("contain", "head")
          .should("contain", "tail")
          .children(circleBorderSelector)
          .should("contain", outputDataTwo[index]);
      } else if (headTwo === index) {
        cy.get($el)
          .should("contain", "head")
          .children(circleBorderSelector)
          .should("contain", outputDataTwo[index]);
      } else if (tailTwo === index) {
        cy.get($el)
          .should("contain", "tail")
          .children(circleBorderSelector)
          .should("contain", outputDataTwo[index]);
      } else {
        cy.get($el)
          .children(circleBorderSelector)
          .should("contain", outputDataTwo[index]);
      }
    }
  });
};

describe('компонент "очередь" работает корректно', function () {
  before(function () {
    cy.visit("/queue");
  });

  it("кнопка добавления должна быть недоступной при пустом инпуте", function () {
    cy.get(inputDataSelector).should("contain", "");
    cy.get(buttonAddSelector).should("be.disabled");
  });

  it("кнопка доступна при не пустом инпуте", function () {
    cy.visit("/queue");
    cy.get(inputDataSelector).type("2");
    cy.get(buttonAddSelector).should("be.enabled");
  });

  it("значение 2 корректно добавляется в начало стека", function () {
    cy.visit("/queue");
    const inputData = "2";
    const outputData = ["2", "", "", "", "", "", ""];
    const stateDefault = "rgb(0, 50, 255)";
    const stateChanging = "rgb(210, 82, 225)";

    cy.get(inputDataSelector).type(inputData);
    cy.get(buttonAddSelector).click();
    cy.get(circlesContainerSelector).as("circles");

    displayStep({
      el: "@circles",
      headOne: 0,
      tailOne: 0,
      stateOne: stateChanging,
      stateTwo: stateDefault,
      outputDataOne: outputData,
      add: true,
    });
  });

  it("значения '1', '2', '3' корректно добавляется в стек", function () {
    cy.visit("/queue");
    const inputDataSt1 = "1";
    const inputDataSt2 = "2";
    const inputDataSt3 = "3";
    const outputDataSt1 = ["1", "", "", "", "", "", ""];
    const outputDataSt2 = ["1", "2", "", "", "", "", ""];
    const outputDataSt3 = ["1", "2", "3", "", "", "", ""];
    const outputDataSt4 = ["", "2", "3", "", "", "", ""];
    const outputDataSt5 = ["", "", "3", "", "", "", ""];
    const stateDefault = "rgb(0, 50, 255)";
    const stateChanging = "rgb(210, 82, 225)";
    const headSt1 = 0;
    const tailSt1 = 0;
    const headSt2 = 0;
    const tailSt2 = 1;
    const headSt3 = 0;
    const tailSt3 = 2;
    const headSt4 = 1;
    const tailSt4 = 2;
    const headSt5 = 2;
    const tailSt5 = 2;

    cy.get(inputDataSelector).type(inputDataSt1);
    cy.get(buttonAddSelector).click();
    cy.get(circlesContainerSelector).as("circles");

    displayStep({
      el: "@circles",
      headOne: headSt1,
      tailOne: tailSt1,
      stateOne: stateChanging,
      stateTwo: stateDefault,
      outputDataOne: outputDataSt1,
      add: true,
    });

    cy.get(inputDataSelector).type(inputDataSt2);
    cy.get(buttonAddSelector).click();

    displayStep({
      el: "@circles",
      headOne: headSt2,
      tailOne: tailSt2,
      stateOne: stateChanging,
      stateTwo: stateDefault,
      outputDataOne: outputDataSt2,
      add: true,
    });

    cy.get(inputDataSelector).type(inputDataSt3);
    cy.get(buttonAddSelector).click();

    displayStep({
      el: "@circles",
      headOne: headSt3,
      tailOne: tailSt3,
      stateOne: stateChanging,
      stateTwo: stateDefault,
      outputDataOne: outputDataSt3,
      add: true,
    });

    cy.get(buttonRemoveSelector).click();

    displayStep({
      el: "@circles",
      headOne: headSt3,
      tailOne: tailSt3,
      headTwo: headSt4,
      tailTwo: tailSt4,
      stateOne: stateChanging,
      stateTwo: stateDefault,
      outputDataOne: outputDataSt3,
      outputDataTwo: outputDataSt4,
      add: false,
    });

    cy.get(buttonRemoveSelector).click();

    displayStep({
      el: "@circles",
      headOne: headSt4,
      tailOne: tailSt4,
      headTwo: headSt5,
      tailTwo: tailSt5,
      stateOne: stateChanging,
      stateTwo: stateDefault,
      outputDataOne: outputDataSt4,
      outputDataTwo: outputDataSt5,
      add: false,
    });

    cy.get(buttonRemoveSelector).click();

    displayStep({
      el: "@circles",
      headOne: headSt5,
      tailOne: tailSt5,
      stateOne: stateChanging,
      stateTwo: stateDefault,
      outputDataOne: outputDataSt5,
      outputDataTwo: outputDataSt1,
      add: false,
    });

    cy.get(inputDataSelector).type(inputDataSt3);
    cy.get(buttonAddSelector).click();

    displayStep({
      el: "@circles",
      headOne: headSt5,
      tailOne: tailSt5,
      stateOne: stateChanging,
      stateTwo: stateDefault,
      outputDataOne: outputDataSt4,
      add: true,
    });
  });

  it("стек очищается корректно", function () {
    cy.visit("/queue");
    const inputDataSt1 = "1";
    const inputDataSt2 = "2";
    const outputDataSt1 = ["1", "", "", "", "", "", ""];
    const outputDataSt2 = ["1", "2", "", "", "", "", ""];
    const stateDefault = "rgb(0, 50, 255)";
    const stateChanging = "rgb(210, 82, 225)";
    const headSt1 = 0;
    const tailSt1 = 0;
    const headSt2 = 0;
    const tailSt2 = 1;

    cy.get(inputDataSelector).type(inputDataSt1);
    cy.get(buttonAddSelector).click();
    cy.get(circlesContainerSelector).as("circles");

    displayStep({
      el: "@circles",
      headOne: headSt1,
      tailOne: tailSt1,
      stateOne: stateChanging,
      stateTwo: stateDefault,
      outputDataOne: outputDataSt1,
      add: true,
    });

    cy.get(inputDataSelector).type(inputDataSt2);
    cy.get(buttonAddSelector).click();

    displayStep({
      el: "@circles",
      headOne: headSt2,
      tailOne: tailSt2,
      stateOne: stateChanging,
      stateTwo: stateDefault,
      outputDataOne: outputDataSt2,
      add: true,
    });

    cy.get(buttonResetSelector).click();

    cy.get("@circles").each(($el) => {
      cy.get($el)
        .should("not.contain", "head")
        .should("not.contain", "tail")
        .children(circleBorderSelector)
        .should("contain", "");
    });
  });
});
