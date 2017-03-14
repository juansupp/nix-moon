'use strict';
const angular = require('angular');

export default angular.module('nixMoonApp.nix-auto', [])
  .directive('nixAuto', function() {
    return {
      template: require('./nix-auto.pug'),
      restrict: 'EA',
      link: function(scope, element, attrs) {}
    };
  })
  .name;
