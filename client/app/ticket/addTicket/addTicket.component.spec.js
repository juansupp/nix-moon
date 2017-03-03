'use strict';

describe('Component: AddTicketComponent', function() {
  // load the controller's module
  beforeEach(module('nixApp.addTicket'));

  var AddTicketComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    AddTicketComponent = $componentController('addTicket', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
