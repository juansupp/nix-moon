'use strict';

describe('Directive: nixText', function() {
  // load the directive's module and view
  beforeEach(module('nixApp.nix-text'));
  beforeEach(module('directives/nix-text/nix-text.html'));

  var element, scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function($compile) {
    element = angular.element('<nix-text></nix-text>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the nixText directive');
  }));
});
