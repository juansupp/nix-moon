'use strict';
const angular = require('angular');

function nixAuto($bi,$select){
    //Funcion de controlador link para directiva
    function link (scope){
        //Se carga primera instancia  para cargar los datos respectivos del auto
        //loadData();
        //Se define la lista que contendrá los datos
        scope.list = new Array();
        //Funcion de filtro para buscar en el auto
        scope.searchFn = query => {
            return $select.searchFull(query, scope.list, 'display');
        };
        //Cada vez que en el controlador invocado se modifique la variable
        scope.$watch('nxData', data =>{
          if(data) // => en caso que no sea vacio
            loadData(); // => se carga de nuevo los datos
        },() => {});
        //Funcion de carga datos de la base
        function loadData() {
          //Acortado de variables
          let
            data = scope.nxData,
            where =  data.w ? data.w :  {1:'1'}
          //Se consulta en bifrost los datos
          $bi
            .base(data.t)
            .find(data.v,where)
            .then(response => {
                //Variable temporal donde se guardarán los fatos por fila
                let items = new Array();
                //Por cada fila del responsea
                response
                    .data
                    .forEach(base =>
                        //Se alteran los nombres de las columnas para poder ser leidos globalmente y se agregan a la variable temporal
                        items.push({
                            value : base[data.v[0]],
                            display :  base[data.v[1]]
                        })
                    );
                //Finalmente se adjunta la variable temporal a la variable scope de lista
                scope.list = items;
            });
        }
    }

    return {
      template: require('./nix-auto.pug'),
      restrict: 'EA',
      require:"^ngModel",
      scope : {
        nxChange : '&',
        ngModel : '=',
        nxText : '=?',
        label : '@',
        nxData : '=',
        required : '@',
        name : '=',
        frm : '=',
        ngDisabled : '='

      },
      link: link,
    };
}

export default angular.module('nixApp.nix-auto', [])
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