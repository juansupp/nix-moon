'use strict';
const angular = require('angular');

function nixText(){
    function link (scope,attrs) {
        if(!scope.type) scope.type = 'text';
    }
   return {
        template: require('./nix-text.pug'),
        restrict: 'EA',
        require : 'ngModel',
        scope : {
            ngModel : '=',
            label : '@',
            required : '=',
            name : '=',
            frm : '=',
            type : '@'
        },
        link : link
    };
}



export default angular.module('nixApp.nix-text', [])
  .directive('nixText', nixText)
  .name;
