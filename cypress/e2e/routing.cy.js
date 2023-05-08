const buttonToMainSelector = '[data-test-id="main"]';

describe("переход по страницам работает корректно", function () {
  before(function () {
    cy.visit("/");
  });

  it("Должна открываться страница с алгоритмом строка", function () {
    cy.get('[data-test-id="recursion"]').click();
    cy.contains("Строка");
  });

  it("Должна открываться главная страница по клику назад на странице строка", function () {
    cy.visit("/recursion");
    cy.get(buttonToMainSelector).click();
    cy.visit("/");
  });

  it("Должна открываться страница с алгоритмом последовательность фибоначчи", function () {
    cy.visit("/");
    cy.get('[data-test-id="fibonacci"]').click();
    cy.contains("Последовательность Фибоначчи");
  });

  it("Должна открываться главная страница по клику назад на странице последовательность фибоначчи", function () {
    cy.visit("/fibonacci");
    cy.get(buttonToMainSelector).click();
    cy.visit("/");
  });

  it("Должна открываться страница с алгоритмами сортировки массивов", function () {
    cy.visit("/");
    cy.get('[data-test-id="sorting"]').click();
    cy.contains("Сортировка массива");
  });

  it("Должна открываться главная страница по клику назад на странице сортировки массивов", function () {
    cy.visit("/sorting");
    cy.get(buttonToMainSelector).click();
    cy.visit("/");
  });

  it("Должна открываться страница с алгоритмом стека", function () {
    cy.visit("/");
    cy.get('[data-test-id="stack"]').click();
    cy.contains("Стек");
  });

  it("Должна открываться главная страница по клику назад на странице алгоритма стека", function () {
    cy.visit("/stack");
    cy.get(buttonToMainSelector).click();
    cy.visit("/");
  });

  it("Должна открываться страница с алгоритмом очереди", function () {
    cy.visit("/");
    cy.get('[data-test-id="queue"]').click();
    cy.contains("Очередь");
  });

  it("Должна открываться главная страница по клику назад на странице алгоритма очереди", function () {
    cy.visit("/queue");
    cy.get(buttonToMainSelector).click();
    cy.visit("/");
  });

  it("Должна открываться страница с алгоритмом списка", function () {
    cy.visit("/");
    cy.get('[data-test-id="list"]').click();
    cy.contains("Связный список");
  });

  it("Должна открываться главная страница по клику назад на странице алгоритма списка", function () {
    cy.visit("/list");
    cy.get(buttonToMainSelector).click();
    cy.visit("/");
  });
});
