'use strict';
const angular = require('angular');

function nixText(){
   return {
        template: require('./nix-text.pug'),
        restrict: 'EA',
        require : 'ngModel',
        scope : {
            ngModel : '=',
            label : '@',
            required : '=',
            name : '=',
            flex : '@',
            frm : '='
        }
    };
}



export default angular.module('nixMoonApp.nix-text', [])
  .directive('nixText', nixText)
  .name;
