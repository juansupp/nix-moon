'use strict';

describe('Directive: nixTextArea', function() {
  // load the directive's module and view
  beforeEach(module('nixApp.nix-text-area'));
  beforeEach(module('directives/nix-text-area/nix-text-area.html'));

  var element, scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function($compile) {
    element = angular.element('<nix-text-area></nix-text-area>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the nixTextArea directive');
  }));
});
