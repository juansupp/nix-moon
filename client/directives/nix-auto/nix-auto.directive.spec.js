'use strict';

describe('Directive: nixAuto', function() {
  // load the directive's module and view
  beforeEach(module('nixApp.nix-auto'));
  beforeEach(module('directives/nix-auto/nix-auto.html'));

  var element, scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function($compile) {
    element = angular.element('<nix-auto></nix-auto>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the nixAuto directive');
  }));
});
