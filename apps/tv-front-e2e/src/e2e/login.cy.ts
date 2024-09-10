describe('Login Modal E2E Tests', () => {
    beforeEach(() => {
    
      cy.visit('/');
    });
  
    it('should open the login modal', () => {
      cy.get('button').contains('Login').click();
      

      cy.get('.modal_overlay').should('be.visible');
    });
  
    it('should log in a user and redirect to home', () => {
     
      cy.get('button').contains('Login').click(); 
  
      
      cy.get('#email').type('test@gmail.com');
      cy.get('#password').type('test');
      
      
      cy.get('.login_form').submit();
  
      
      cy.url().should('include', '/home');
      
      cy.url().should('include', 'userId=');
    });
  
    it('should show an error message on login failure', () => {
      cy.get('button').contains('Login').click(); 
  
      cy.get('#email').type('wrong-email@something.com');
      cy.get('#password').type('wrongPassword');
      
      cy.get('.login_form').submit();
  
      cy.get('.error_message').should('be.visible').and('contain.text', 'Invalid credentials');
    });
  });
  