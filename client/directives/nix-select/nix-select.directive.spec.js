'use strict';

describe('Directive: nixSelect', function() {
  // load the directive's module and view
  beforeEach(module('nixApp.nix-select'));
  beforeEach(module('directives/nix-select/nix-select.html'));

  var element, scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function($compile) {
    element = angular.element('<nix-select></nix-select>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the nixSelect directive');
  }));
});
