describe('приложение запустилось', function() {
    it('должно быть доступно на localhost:3000', function() {
      cy.visit('http://localhost:3000');
    });
  }); 