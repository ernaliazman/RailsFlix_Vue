describe("Add Movie Functionality", () => {
  it("should successfully add a movie", () => {
    cy.visit("/"); 
    cy.get('input[name="email"]').type("erna@gmail.com");
    cy.get('input[name="password"]').type("erna123");
    cy.contains("button", "Sign in").click();
    cy.contains("Authorized").should("be.visible");
    cy.contains("button", "Okay").click();

    cy.url().should("include", "/homepage");

    // Click the first three 'bookmark' buttons
    cy.get('button[name="bookmark"]', { timeout: 10000 }).eq(0).click();
    cy.contains("has been added into your library").should("be.visible");
    cy.contains("button", "Okay").click();
    cy.url().should("include", "/homepage");

    cy.get('button[name="bookmark"]').eq(1).click();
    cy.contains("has been added into your library").should("be.visible");
    cy.contains("button", "Okay").click();
    cy.url().should("include", "/homepage");

    cy.get('button[name="bookmark"]').eq(2).click();
    cy.contains("has been added into your library").should("be.visible");
    cy.contains("button", "Okay").click();
    cy.url().should("include", "/homepage");
  });

  // it("should successfully remove a movie", () => {
    
  //   cy.visit("/"); // Visit the base URL
  //   cy.get('input[name="email"]').type("erna@gmail.com");
  //   cy.get('input[name="password"]').type("erna123");
  //   cy.contains("button", "Sign in").click();
  //   cy.contains("Authorized").should("be.visible");
  //   cy.contains("button", "Okay").click();
  //   cy.url().should("include", "/homepage");
  
   
  //   cy.get('button[name="bookmark"]')
  //     .find('svg') // Find the svg inside the button
  //     .should('have.attr', 'fill', 'currentColor'); // Check if fill is currentColor
  

  //   cy.get('button[name="bookmark"]')
  //     .find('svg')
  //     .click(); 
  
  //     cy.get('button[name="bookmark"]')
  //     .find('svg')
  //     .should('have.attr', 'fill').and('not.equal', 'currentColor'); 
  // });
});