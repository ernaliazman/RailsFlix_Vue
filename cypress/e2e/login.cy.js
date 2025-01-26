describe("Login Functionality", () => {
    it("should successfully log in and navigate to the homepage", () => {
      cy.visit("/"); // Visit the base URL
      cy.get('input[name="email"]').type("erna@gmail.com"); // Replace with your input selector
      cy.get('input[name="password"]').type("erna123"); // Replace with your input selector
      cy.contains('button', 'Sign in').click(); // Replace with your button selector
    
      cy.contains("Authorized").should("be.visible");
      cy.contains('button', 'Okay').click();
      // Assert successful login
      cy.url().should("include", "/homepage"); // Verify redirection

      //cy.contains('confirmButtonText', 'Okay').click(); 
      cy.contains("Welcome back, Erna").should("be.visible"); // Verify a welcome message or element
    });
  
    it("should display an error message for invalid credentials", () => {
      cy.visit("/");
      cy.get('input[name="email"]').type("wrong@example.com");
      cy.get('input[name="password"]').type("wrongpassword");
      cy.contains('button', 'Sign in').click();
  
      // Assert error message
      cy.contains("Invalid email or password").should("be.visible");
    });
  });
  