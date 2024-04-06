describe("Navigate to each customer", () => {
   // test for each customer
   it("should be able to see title of each customer and not see site under maintainenance", () => {
      //   console.log("hello");
      customerData.customers.forEach((customer) => {
         cy.visit(customer.url);

         // wait until loader is not visible in the DOM
         cy.get('[data-qa="activity-indicator"]').should("not.exist");

         // assert the title of each customer
         cy.get(".nlanding-page__brand-title > span").should(
            "contain",
            "Welcome To " + customer.title
         );
      });
   });
})