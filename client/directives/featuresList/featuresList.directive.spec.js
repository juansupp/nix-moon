'use strict';

describe('Directive: featuresList', function() {
  // load the directive's module and view
  beforeEach(module('nixApp.featuresList'));
  beforeEach(module('directives/featuresList/featuresList.html'));

  var element, scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function($compile) {
    element = angular.element('<features-list></features-list>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the featuresList directive');
  }));
});
