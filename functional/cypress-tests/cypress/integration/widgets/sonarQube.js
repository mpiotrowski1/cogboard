import Widgets from "../../fixtures/Widgets";
let sonarQube = Widgets.sonarQube;
let name = sonarQube.name;

function fillSonarQube() {
  //Change selector (add data-cy in markup)
  cy.get("#select-endpoint").click();
  //Change selector (add data-cy in markup)
  cy.get(`[data-value="${sonarQube.endpoint}"]`).click();
  cy.fillSchedulePeriod(sonarQube.schedulePeriod);
  //Change selector (add data-cy in markup)
  cy.get('[name="keyString"]').type(sonarQube.key);
  //Change selector (add data-cy in markup)
  cy.get('[name="idNumber"]').type(sonarQube.id);
  //To Do: Choosing metrics
}

describe("Widget - SonarQube", function() {
  beforeEach(function() {
    cy.visit("/");
    cy.login();
  });

  it("Can be added by logged in user and doesn't persist without saving", () => {
    cy.addDashboard(name + " TEST");
    cy.chooseDashboard(name + " TEST");
    cy.saveState();
    cy.clickAddWidgetButton();
    cy.fillNewWidgetGeneral(name, name, false, false, 4, 2);
    cy.get('[data-cy="widget-form-dynamic-tab"]').click();
    fillSonarQube();
    cy.confirmAddWidget();
    cy.contains("h3", name).should("is.visible");
    cy.visit("/");
    cy.openDrawer();
    cy.chooseDashboard(name + " TEST");
    // Assertion below is pretty basic. To Do: thorough widget configuration assertions
    cy.contains("h3", name).should("not.exist");
    cy.removeDashboard(name + " TEST");
    cy.saveState();
  });

  it("Remains on dashboard after save and refresh", () => {
    cy.addDashboard(name + " TEST");
    cy.chooseDashboard(name + " TEST");
    cy.clickAddWidgetButton();
    cy.fillNewWidgetGeneral(name, name, false, false, 4, 2);
    cy.get('[data-cy="widget-form-dynamic-tab"]').click();
    fillSonarQube();
    cy.confirmAddWidget();
    // Assertion below is pretty basic. To Do: thorough widget configuration assertions
    cy.contains("h3", name).should("is.visible");
    cy.saveState();
    cy.visit("/");
    cy.openDrawer();
    cy.chooseDashboard(name + " TEST");
    // Assertion below is pretty basic. To Do: thorough widget configuration assertions
    cy.contains("h3", name).should("is.visible");
    cy.removeDashboard(name + " TEST");
    cy.saveState();
  });
});
