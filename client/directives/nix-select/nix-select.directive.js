'use strict';
const angular = require('angular');


function nixSelect ($bi) {
    function link (scope,element,attrs) {
        let
            data = scope.nxData,
            where =  data.w ? data.w :  {1:'1'}
        $bi
            .base(data.t)
            .find(data.v,where)
            .then(response => {
                let items = new Array();
                response
                    .data
                    .forEach(base =>
                        items.push({
                            value : base[data.v[0]],
                            display :  base[data.v[1]]
                        })
                    );
                scope.nxOptions = items;
            });
    }

    return {
      template: require('./nix-select.pug'),
      restrict: 'EA',
      require : 'ngModel',
      scope : {
        ngModel : '=',
        ngChange : '&',
        label : '@',
        nxData : '=',
        required : '@',
        name : '=',
        frm : '='
      },
      link : link
    };
}


export default angular.module('nixMoonApp.nix-select', [])
  .directive('nixSelect', nixSelect)
  .name;
