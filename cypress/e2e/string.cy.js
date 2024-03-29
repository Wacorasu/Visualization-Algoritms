const inputDataSelector = '[data-testid="inputString"]';
const buttonAddSelector = '[data-testid="buttonString"]';
const circlesContainerSelector = '[data-testid="circlesContainer"]';
const circleBorderSelector = '[data-testid="circleBorder"]';

describe('компонент "строка" работает корректно', function () {
  before(function () {
    cy.visit("/recursion");
  });

  it("кнопка должна быть недоступной при пустом инпуте", function () {
    cy.get(inputDataSelector).should("contain", "");
    cy.get(buttonAddSelector).should("be.disabled");
  });

  it("кнопка доступна при не пустом инпуте", function () {
    cy.visit("/recursion");
    cy.get(inputDataSelector).type("ABCD");
    cy.get(buttonAddSelector).should("be.enabled");
  });

  it("строка разворачивается корректно с четным количеством элементов", function () {
    cy.visit("/recursion");
    const stringArraySt1 = ["A", "B", "C", "D"];
    const stringArraySt2 = ["D", "B", "C", "A"];
    const stringArraySt3 = ["D", "C", "B", "A"];
    const stateModified = "rgb(127, 224, 81)";
    const stateDefault = "rgb(0, 50, 255)";
    const stateChanging = "rgb(210, 82, 225)";

    cy.get(inputDataSelector).type("ABCD");
    cy.get(buttonAddSelector).click();
    cy.get(circlesContainerSelector).as("circles");

    cy.get("@circles").each(($el, index) => {
      cy.get($el)
        .children(circleBorderSelector)
        .should("contain", stringArraySt1[index])
        .should("have.css", "border", `4px solid ${stateDefault}`);
    });

    cy.get("@circles").each(($el, index) => {
      if (index === 0 || index === stringArraySt1.length - 1) {
        cy.get($el)
          .children(circleBorderSelector)
          .should("contain", stringArraySt1[index])
          .should("have.css", "border", `4px solid ${stateChanging}`);
      } else {
        cy.get($el)
          .children(circleBorderSelector)
          .should("contain", stringArraySt1[index])
          .should("have.css", "border", `4px solid ${stateDefault}`);
      }
    });

    cy.get("@circles").each(($el, index) => {
      if (index === 0 || index === stringArraySt2.length - 1) {
        cy.get($el)
          .children(circleBorderSelector)
          .should("contain", stringArraySt2[index])
          .should("have.css", "border", `4px solid ${stateModified}`);
      } else {
        cy.get($el)
          .children(circleBorderSelector)
          .should("contain", stringArraySt2[index])
          .should("have.css", "border", `4px solid ${stateDefault}`);
      }
    });

    cy.get("@circles").each(($el, index) => {
      if (index === 1 || index === stringArraySt2.length - 2) {
        cy.get($el)
          .children(circleBorderSelector)
          .should("contain", stringArraySt2[index])
          .should("have.css", "border", `4px solid ${stateChanging}`);
      } else {
        cy.get($el)
          .children(circleBorderSelector)
          .should("contain", stringArraySt2[index])
          .should("have.css", "border", `4px solid ${stateModified}`);
      }
    });

    cy.get("@circles").each(($el, index) => {
      if (index === 1 || index === stringArraySt3.length - 2) {
        cy.get($el)
          .children(circleBorderSelector)
          .should("contain", stringArraySt3[index])
          .should("have.css", "border", `4px solid ${stateModified}`);
      } else {
        cy.get($el)
          .children(circleBorderSelector)
          .should("contain", stringArraySt3[index])
          .should("have.css", "border", `4px solid ${stateModified}`);
      }
    });
  });

  it("строка разворачивается корректно с нечетным количеством элементов", function () {
    cy.visit("/recursion");
    const stringArraySt1 = ["A", "B", "C"];
    const stringArraySt2 = ["C", "B", "A"];
    const stringArraySt3 = ["C", "B", "A"];
    const stateModified = "rgb(127, 224, 81)";
    const stateDefault = "rgb(0, 50, 255)";
    const stateChanging = "rgb(210, 82, 225)";

    cy.get(inputDataSelector).type("ABC");
    cy.get(buttonAddSelector).click();
    cy.get(circlesContainerSelector).as("circles");

    cy.get("@circles").each(($el, index) => {
      cy.get($el)
        .children(circleBorderSelector)
        .should("contain", stringArraySt1[index])
        .should("have.css", "border", `4px solid ${stateDefault}`);
    });

    cy.get("@circles").each(($el, index) => {
      if (index === 0 || index === stringArraySt1.length - 1) {
        cy.get($el)
          .children(circleBorderSelector)
          .should("contain", stringArraySt1[index])
          .should("have.css", "border", `4px solid ${stateChanging}`);
      } else {
        cy.get($el)
          .children(circleBorderSelector)
          .should("contain", stringArraySt1[index])
          .should("have.css", "border", `4px solid ${stateDefault}`);
      }
    });

    cy.get("@circles").each(($el, index) => {
      if (index === 0 || index === stringArraySt2.length - 1) {
        cy.get($el)
          .children(circleBorderSelector)
          .should("contain", stringArraySt2[index])
          .should("have.css", "border", `4px solid ${stateModified}`);
      } else {
        cy.get($el)
          .children(circleBorderSelector)
          .should("contain", stringArraySt2[index])
          .should("have.css", "border", `4px solid ${stateDefault}`);
      }
    });

    cy.get("@circles").each(($el, index) => {
      if (index === 1) {
        cy.get($el)
          .children(circleBorderSelector)
          .should("contain", stringArraySt2[index])
          .should("have.css", "border", `4px solid ${stateChanging}`);
      } else {
        cy.get($el)
          .children(circleBorderSelector)
          .should("contain", stringArraySt2[index])
          .should("have.css", "border", `4px solid ${stateModified}`);
      }
    });

    cy.get("@circles").each(($el, index) => {
      if (index === 1) {
        cy.get($el)
          .children(circleBorderSelector)
          .should("contain", stringArraySt3[index])
          .should("have.css", "border", `4px solid ${stateModified}`);
      } else {
        cy.get($el)
          .children(circleBorderSelector)
          .should("contain", stringArraySt3[index])
          .should("have.css", "border", `4px solid ${stateModified}`);
      }
    });
  });
});
