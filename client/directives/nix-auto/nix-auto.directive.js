'use strict';
const angular = require('angular');

function nixAuto($bi,$select){

    function link (scope){
        loadData();
        scope.list = new Array();
        scope.searchFn = query => {
            return $select.searchFull(query, scope.list, 'display');
        };

        scope.$watch('nxData', data =>{
          if(data)
            loadData();
        },() => {});

        function loadData() {
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
                scope.list = items;
            });  
        }
    }

    return {
      template: require('./nix-auto.pug'),
      restrict: 'EA',
      scope : {
        ngModel : '=',
        label : '@',
        nxData : '=',
        required : '@',
        name : '=',
        frm : '=',
        ngChange : '&'
      },
      link: link,
    };
}

export default angular.module('nixMoonApp.nix-auto', [])
  .directive('nixAuto', nixAuto)
  .name;


/*
searchArea(query) {
    return this.$select.searchFull(query, this.areaList, 'nombre');
  }
  searchMarca(query) {
    console.log(this.marcaList)
    return this.$select.search(query, this.marcaList);
  }
 */