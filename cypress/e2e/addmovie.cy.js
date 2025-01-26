describe("Add Movie Functionality", () => {
  it("should successfully add a movie", () => {
    cy.visit("/"); // Visit the base URL
    cy.get('input[name="email"]').type("sofea@gmail.com");
    cy.get('input[name="password"]').type("sofea123");
    cy.contains("button", "Sign in").click();
    cy.contains("Authorized").should("be.visible");
    cy.contains("button", "Okay").click();
 

  cy.url().should("include", "/homepage");

  cy.get('button[name="bookmark"]', { timeout: 50000 })
  .should('be.visible')
  .each(($button, index) => {
    if (index < 3) {
      // Click the button
      cy.wrap($button).click();

      // Step 2: Verify the state of the button after the click
      // Check if the 'v-if' or 'v-else' renders the correct SVG with the expected fill
      cy.wrap($button)
        .find('svg')
        .first()
        .should('have.attr', 'fill', 'currentColor'); // Verify the 'fill' attribute
    }
  });

});

//   it("should successfully remove a movie", () => {
//     cy.visit("/"); // Visit the base URL
//     cy.get('input[name="email"]').type("sofea@gmail.com");
//     cy.get('input[name="password"]').type("sofea123");
//     cy.contains("button", "Sign in").click();
//     cy.contains("You are good to go!").should("be.visible");
//     cy.contains("button", "Okay").click();
//   });

//   cy.url().should("include", "/homepage");

//   cy.get('button[name="bookmark"]').slice(0, 3).each(($button) => {
//     cy.wrap($button).click();

//     // Step 2: Verify the state of the button after the click (if clicked, show filled icon)
//     cy.wrap($button).find('svg').first().should('have.class', 'w-6 h-6'); // Adjust based on your icon
//     cy.contains("has been added into your library").should("be.visible");
//     cy.contains("button", "Okay").click();
//   });

});

