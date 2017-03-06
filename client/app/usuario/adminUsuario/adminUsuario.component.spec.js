'use strict';

describe('Component: adminUsuario', function() {
  // load the component's module
  beforeEach(module('nixApp.adminUsuario'));

  var adminUsuarioComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    adminUsuarioComponent = $componentController('adminUsuario', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
