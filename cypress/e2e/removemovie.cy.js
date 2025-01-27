describe("Remove Movie Functionality", () => {
    it("should successfully remove a movie", () => {
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
  
    
      cy.get('button[name="delete"]').eq(0).click();
      cy.contains("will be removed from your library").should("be.visible"); 
    //   cy.get('button[name="status"]').click(); // Open status dropdown
    //   cy.contains("Watched").should("be.visible"); // Verify 'Watched' option is visible
    //   cy.contains("Released").should("be.visible"); // Verify 'Released' option is visible
    //   cy.contains('li','Watched').click(); 
  
      cy.contains('button',"Confirm").click(); // Click the action button to submit the update
   
      cy.contains("has been removed from your library").should("be.visible"); 
      cy.contains('button', 'Okay').click(); 
      cy.url().should("include", "/movielists"); 
    });
  });
  