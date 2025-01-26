describe("Signup Functionality", () => {
  it("should successfully signup and navigate to the sign in page", () => {
    cy.visit("/"); // Visit the base URL
    cy.contains('a', 'Register here').click();
    cy.get('input[name="name"]').type("Sofea");
    cy.get('input[name="email"]').type("sofea@gmail.com");
    cy.get('input[name="password"]').type("sofea123");
    cy.contains("button", "Sign up").click();
    cy.contains("You are good to go!").should("be.visible");
    cy.contains('button', 'Okay').click();

    // Redirect to sign in page
    cy.url().should("include", "/welcome");
  });

  it("should display an error message for taken credentials", () => {
    cy.visit("/");
    cy.contains('a', 'Register here').click();
    cy.get('input[name="name"]').type("Sofea");
    cy.get('input[name="email"]').type("sofea@gmail.com");
    cy.get('input[name="password"]').type("sofea123");
    cy.contains("button", "Sign up").click();
    cy.contains("Email has already been taken").should("be.visible");
  });
});
