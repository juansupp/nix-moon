'use strict';
const angular = require('angular');


function nixSelect () {
    function link (scope,element,attrs) {


        scope.nxOptions = new Array();


    }

    return {
      template: require('./nix-select.pug'),
      restrict: 'EA',
      require : 'ngModel',
      scope : {
        ngModel : '=',
        ngChange : '&',
        placeholder : '@',
        nxData : '@'
      },
      link : link
    };
}


export default angular.module('nixMoonApp.nix-select', [])
  .directive('nixSelect', nixSelect)
  .name;
