describe('Home Page E2E Tests', () => {
    beforeEach(() => {
      cy.visit('/'); 
    });
  
    it('should display trending and popular movies', () => {
     
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(2000); 
  
      
      cy.contains('Trending').should('be.visible');
      
   
  
    
      cy.get('.movie_list').should('be.visible').should('have.length.greaterThan', 0); 
    });
  
    it('should handle search functionality', () => {
     
      cy.get('#search').type('Inception');
  
  
      cy.get('form').submit();
  
   
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(2000); 
   
      cy.url().should('include', '/search-results');
  

      cy.contains('Search Results').should('be.visible');
    });
  
    
  });
  