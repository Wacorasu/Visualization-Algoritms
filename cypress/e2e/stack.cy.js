const inputDataSelector = '[data-testid="inputStack"]';
const buttonAddSelector = '[data-testid="buttonStackAdd"]';
const buttonRemoveSelector = '[data-testid="buttonStackRemove"]';
const buttonResetSelector = '[data-testid="buttonStackReset"]';
const circlesContainerSelector = '[data-testid="circlesContainer"]';
const circleBorderSelector = '[data-testid="circleBorder"]';
const stackContainerSelector = "[data-testid='stackContainer']";

describe('компонент "стек" работает корректно', function () {
  before(function () {
    cy.visit("/stack");
  });

  it("кнопка добавления должна быть недоступной при пустом инпуте", function () {
    cy.get(inputDataSelector).should("contain", "");
    cy.get(buttonAddSelector).should("be.disabled");
  });

  it("кнопка доступна при не пустом инпуте", function () {
    cy.visit("/stack");
    cy.get(inputDataSelector).type("2");
    cy.get(buttonAddSelector).should("be.enabled");
  });

  it("значение 2 корректно добавляется в начало стека", function () {
    cy.visit("/stack");
    const inputData = "2";
    const outputData = ["2"];
    const stateDefault = "rgb(0, 50, 255)";
    const stateChanging = "rgb(210, 82, 225)";

    cy.get(inputDataSelector).type(inputData);
    cy.get(buttonAddSelector).click();
    cy.get(circlesContainerSelector).as("circles");

    cy.get("@circles").each(($el, index) => {
      cy.get($el)
        .should("contain", "Top")
        .children(circleBorderSelector)
        .should("contain", outputData[index])
        .should("have.css", "border", `4px solid ${stateChanging}`);
    });
    cy.get("@circles").each(($el, index) => {
      cy.get($el)
        .should("contain", "Top")
        .children(circleBorderSelector)
        .should("contain", outputData[index])
        .should("have.css", "border", `4px solid ${stateDefault}`);
    });
  });

  it("значения '1', '2' и '3' корректно добавляется и удаляются из стека", function () {
    cy.visit("/stack");
    const inputDataSt1 = "1";
    const inputDataSt2 = "2";
    const inputDataSt3 = "3";
    const outputDataSt1 = ["1"];
    const outputDataSt2 = ["1", "2"];
    const outputDataSt3 = ["1", "2", "3"];
    const stateDefault = "rgb(0, 50, 255)";
    const stateChanging = "rgb(210, 82, 225)";

    cy.get(inputDataSelector).type(inputDataSt1);
    cy.get(buttonAddSelector).click();
    cy.get(circlesContainerSelector).as("circles");

    cy.get("@circles").each(($el, index) => {
      cy.get($el)
        .should("contain", "Top")
        .children(circleBorderSelector)
        .should("contain", outputDataSt1[index])
        .should("have.css", "border", `4px solid ${stateChanging}`);
    });
    cy.get("@circles").each(($el, index) => {
      cy.get($el)
        .should("contain", "Top")
        .children(circleBorderSelector)
        .should("contain", outputDataSt1[index])
        .should("have.css", "border", `4px solid ${stateDefault}`);
    });

    cy.get(inputDataSelector).type(inputDataSt2);
    cy.get(buttonAddSelector).click();

    cy.get("@circles").each(($el, index) => {
      if (index === outputDataSt2.length - 1) {
        cy.get($el)
          .should("contain", "Top")
          .children(circleBorderSelector)
          .should("contain", outputDataSt2[index])
          .should("have.css", "border", `4px solid ${stateChanging}`);
      } else {
        cy.get($el)
          .should("not.contain", "Top")
          .children(circleBorderSelector)
          .should("contain", outputDataSt2[index])
          .should("have.css", "border", `4px solid ${stateDefault}`);
      }
    });
    cy.get("@circles").each(($el, index) => {
      if (index === outputDataSt2.length - 1) {
        cy.get($el)
          .should("contain", "Top")
          .children(circleBorderSelector)
          .should("contain", outputDataSt2[index])
          .should("have.css", "border", `4px solid ${stateDefault}`);
      } else {
        cy.get($el)
          .should("not.contain", "Top")
          .children(circleBorderSelector)
          .should("contain", outputDataSt2[index])
          .should("have.css", "border", `4px solid ${stateDefault}`);
      }
    });

    cy.get(inputDataSelector).type(inputDataSt3);
    cy.get(buttonAddSelector).click();

    cy.get("@circles").each(($el, index) => {
      if (index === outputDataSt3.length - 1) {
        cy.get($el)
          .should("contain", "Top")
          .children(circleBorderSelector)
          .should("contain", outputDataSt3[index])
          .should("have.css", "border", `4px solid ${stateChanging}`);
      } else {
        cy.get($el)
          .should("not.contain", "Top")
          .children(circleBorderSelector)
          .should("contain", outputDataSt3[index])
          .should("have.css", "border", `4px solid ${stateDefault}`);
      }
    });
    cy.get("@circles").each(($el, index) => {
      if (index === outputDataSt3.length - 1) {
        cy.get($el)
          .should("contain", "Top")
          .children(circleBorderSelector)
          .should("contain", outputDataSt3[index])
          .should("have.css", "border", `4px solid ${stateDefault}`);
      } else {
        cy.get($el)
          .should("not.contain", "Top")
          .children(circleBorderSelector)
          .should("contain", outputDataSt3[index])
          .should("have.css", "border", `4px solid ${stateDefault}`);
      }
    });

    cy.get(buttonRemoveSelector).click();

    cy.get("@circles").each(($el, index) => {
      if (index === outputDataSt3.length - 1) {
        cy.get($el)
          .should("contain", "Top")
          .children(circleBorderSelector)
          .should("contain", outputDataSt3[index])
          .should("have.css", "border", `4px solid ${stateChanging}`);
      } else {
        cy.get($el)
          .should("not.contain", "Top")
          .children(circleBorderSelector)
          .should("contain", outputDataSt3[index])
          .should("have.css", "border", `4px solid ${stateDefault}`);
      }
    });

    cy.get("@circles")
      .children(circleBorderSelector, {
        timeout: 500 * outputDataSt2.length,
      })
      .should("have.lengthOf", outputDataSt2.length);

    cy.get("@circles").each(($el, index, mas) => {
      cy.log(mas);
      if (index === outputDataSt2.length - 1) {
        cy.get($el)
          .should("contain", "Top")
          .children(circleBorderSelector)
          .should("contain", outputDataSt2[index])
          .should("have.css", "border", `4px solid ${stateDefault}`);
      } else {
        cy.get($el)
          .should("not.contain", "Top")
          .children(circleBorderSelector)
          .should("contain", outputDataSt2[index])
          .should("have.css", "border", `4px solid ${stateDefault}`);
      }
    });

    cy.get(buttonRemoveSelector).click();

    cy.get("@circles").each(($el, index) => {
      if (index === outputDataSt2.length - 1) {
        cy.get($el)
          .should("contain", "Top")
          .children(circleBorderSelector)
          .should("contain", outputDataSt2[index])
          .should("have.css", "border", `4px solid ${stateChanging}`);
      } else {
        cy.get($el)
          .should("not.contain", "Top")
          .children(circleBorderSelector)
          .should("contain", outputDataSt2[index])
          .should("have.css", "border", `4px solid ${stateDefault}`);
      }
    });

    cy.get("@circles")
      .children(circleBorderSelector, {
        timeout: 500 * outputDataSt1.length,
      })
      .should("have.lengthOf", outputDataSt1.length);

    cy.get("@circles").each(($el, index) => {
      if (index === outputDataSt1.length - 1) {
        cy.get($el)
          .should("contain", "Top")
          .children(circleBorderSelector)
          .should("contain", outputDataSt1[index])
          .should("have.css", "border", `4px solid ${stateDefault}`);
      } else {
        cy.get($el)
          .should("not.contain", "Top")
          .children(circleBorderSelector)
          .should("contain", outputDataSt1[index])
          .should("have.css", "border", `4px solid ${stateDefault}`);
      }
    });

    cy.get(buttonRemoveSelector).click();

    cy.get("@circles").each(($el, index) => {
      if (index === outputDataSt1.length - 1) {
        cy.get($el)
          .should("contain", "Top")
          .children(circleBorderSelector)
          .should("contain", outputDataSt1[index])
          .should("have.css", "border", `4px solid ${stateChanging}`);
      } else {
        cy.get($el)
          .should("not.contain", "Top")
          .children(circleBorderSelector)
          .should("contain", outputDataSt1[index])
          .should("have.css", "border", `4px solid ${stateDefault}`);
      }
    });

    cy.get(stackContainerSelector).children().should("have.length", 0);
  });

  it("стек очищается корректно", function () {
    cy.visit("/stack");
    const inputDataSt1 = "1";
    const inputDataSt2 = "2";
    const outputDataSt1 = ["1"];
    const outputDataSt2 = ["1", "2"];
    const stateDefault = "rgb(0, 50, 255)";
    const stateChanging = "rgb(210, 82, 225)";

    cy.get(inputDataSelector).type(inputDataSt1);
    cy.get(buttonAddSelector).click();
    cy.get(circlesContainerSelector).as("circles");

    cy.get("@circles").each(($el, index) => {
      cy.get($el)
        .should("contain", "Top")
        .children(circleBorderSelector)
        .should("contain", outputDataSt1[index])
        .should("have.css", "border", `4px solid ${stateChanging}`);
    });
    cy.get("@circles").each(($el, index) => {
      cy.get($el)
        .should("contain", "Top")
        .children(circleBorderSelector)
        .should("contain", outputDataSt1[index])
        .should("have.css", "border", `4px solid ${stateDefault}`);
    });

    cy.get(inputDataSelector).type(inputDataSt2);
    cy.get(buttonAddSelector).click();

    cy.get("@circles").each(($el, index) => {
      if (index === outputDataSt2.length - 1) {
        cy.get($el)
          .should("contain", "Top")
          .children(circleBorderSelector)
          .should("contain", outputDataSt2[index])
          .should("have.css", "border", `4px solid ${stateChanging}`);
      } else {
        cy.get($el)
          .should("not.contain", "Top")
          .children(circleBorderSelector)
          .should("contain", outputDataSt2[index])
          .should("have.css", "border", `4px solid ${stateDefault}`);
      }
    });
    cy.get("@circles").each(($el, index) => {
      if (index === outputDataSt2.length - 1) {
        cy.get($el)
          .should("contain", "Top")
          .children(circleBorderSelector)
          .should("contain", outputDataSt2[index])
          .should("have.css", "border", `4px solid ${stateDefault}`);
      } else {
        cy.get($el)
          .should("not.contain", "Top")
          .children(circleBorderSelector)
          .should("contain", outputDataSt2[index])
          .should("have.css", "border", `4px solid ${stateDefault}`);
      }
    });

    cy.get(buttonResetSelector).click();

    cy.get(stackContainerSelector).children().should("have.length", 0);
  });
});
