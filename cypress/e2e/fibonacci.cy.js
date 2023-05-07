
describe('компонент "фибоначчи" работает корректно', function () {
  before(function () {
    cy.visit("/fibonacci");
  });

  it("кнопка должна быть недоступной при пустом инпуте", function () {
    cy.get('[data-testid="inputFibonacci"]').should("contain", "");
    cy.get('[data-testid="buttonFibonacci"]').should("be.disabled");
  });

  it("кнопка доступна при не пустом инпуте", function () {
    cy.visit("/fibonacci");
    cy.get('[data-testid="inputFibonacci"]').type("2");
    cy.get('[data-testid="buttonFibonacci"]').should("be.enabled");
  });

  it("результат разворачивается корректно для значения ввода 0", function () {
    cy.visit("/fibonacci");
    const inputData = "0";
    const outputData = ["1"];

    cy.get('[data-testid="inputFibonacci"]').type(inputData);
    cy.get('[data-testid="buttonFibonacci"]').click();
    cy.get('[data-testid="circlesContainer"]').as("circles");

    cy.get("@circles").each(($el, index) => {
      cy.get($el)
        .children('[data-testid="circleBorder"]')
        .should("contain", outputData[index]);
    });
  });

  it("результат разворачивается корректно для значения ввода 1", function () {
    cy.visit("/fibonacci");
    const inputData = "1";
    const outputData = ["1", "1"];

    cy.get('[data-testid="inputFibonacci"]').type(inputData);
    cy.get('[data-testid="buttonFibonacci"]').click();
    cy.get('[data-testid="circlesContainer"]').as("circles");

    cy.get("@circles")
      .children('[data-testid="circleBorder"]', { timeout: 500*outputData.length })
      .should("have.lengthOf", outputData.length);

    cy.get("@circles").each((element, index, mass) => {
      cy.get(element)
        .children('[data-testid="circleBorder"]')
        .should("contain", outputData[index]);
    });
  });

  it("результат разворачивается корректно для значения ввода 4", function () {
    cy.visit("/fibonacci");
    const inputData = "4";
    const outputData = ["1", "1", "2", "3", "5"];

    cy.get('[data-testid="inputFibonacci"]').type(inputData);
    cy.get('[data-testid="buttonFibonacci"]').click();
    cy.get('[data-testid="circlesContainer"]').as("circles");

    cy.get("@circles")
      .children('[data-testid="circleBorder"]', { timeout: 500*outputData.length })
      .should("have.lengthOf", outputData.length);

    cy.get("@circles").each(($el, index) => {
      cy.get($el)
        .children('[data-testid="circleBorder"]')
        .should("contain", outputData[index]);
    });
  });

  it("результат разворачивается корректно для значения ввода 19", function () {
    cy.visit("/fibonacci");
    const inputData = "19";
    const outputData = [
      "1",
      "1",
      "2",
      "3",
      "5",
      "8",
      "13",
      "21",
      "34",
      "55",
      "89",
      "144",
      "233",
      "377",
      "610",
      "987",
      "1597",
      "2584",
      "4181",
      "6765",
    ];

    cy.get('[data-testid="inputFibonacci"]').type(inputData);
    cy.get('[data-testid="buttonFibonacci"]').click();
    cy.get('[data-testid="circlesContainer"]').as("circles");

    cy.get("@circles")
      .children('[data-testid="circleBorder"]', { timeout: 500*outputData.length })
      .should("have.lengthOf", outputData.length);

    cy.get("@circles").each(($el, index) => {
      cy.get($el)
        .children('[data-testid="circleBorder"]')
        .should("contain", outputData[index]);
    });
  });
});
