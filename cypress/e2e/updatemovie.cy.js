describe("Update Movie Functionality", () => {
    it("should successfully update a movie", () => {
      // Step 1: Visit the base URL and log in
      cy.visit("/"); // Visit the base URL
      cy.get('input[name="email"]').type("erna@gmail.com");
      cy.get('input[name="password"]').type("erna123");
      cy.contains("button", "Sign in").click();
  
     
      cy.contains("Authorized").should("be.visible");
      cy.contains("button", "Okay").click();
      cy.url().should("include", "/homepage");
  
      
      cy.contains("Your Movies").should("be.visible");
  
      cy.get('a[name="mymovielists"]').click(); // Click on 'Your Movies' link
      cy.url().should("include", "/movielists"); // Verify navigation to /movielists
  
    
      cy.get('button[name="edit"]').eq(0).click(); // Click the edit button for the movie
    //   cy.get('button[name="status"]').click(); // Open status dropdown
    //   cy.contains("Watched").should("be.visible"); // Verify 'Watched' option is visible
    //   cy.contains("Released").should("be.visible"); // Verify 'Released' option is visible
    //   cy.contains('li','Watched').click(); 
  
      
      cy.get('textarea[id="feedback"]').type("OK. Best movie ever"); // Add feedback
      cy.contains('button',"Update").click(); // Click the action button to submit the update
   
      cy.contains("has been updated successfully").should("be.visible"); 
      cy.contains('button', 'Okay').click(); 
      cy.url().should("include", "/movielists"); 
    });
  });
  