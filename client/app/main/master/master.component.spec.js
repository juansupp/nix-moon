'use strict';

describe('Component: MasterComponent', function() {
  // load the controller's module
  beforeEach(module('nixApp.master'));

  var MasterComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    MasterComponent = $componentController('master', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
