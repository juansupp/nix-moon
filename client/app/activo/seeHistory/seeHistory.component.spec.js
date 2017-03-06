'use strict';

describe('Component: seeHistory', function() {
  // load the component's module
  beforeEach(module('nixApp.seeHistory'));

  var seeHistoryComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    seeHistoryComponent = $componentController('seeHistory', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
