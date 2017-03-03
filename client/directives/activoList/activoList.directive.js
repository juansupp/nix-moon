'use strict';
const angular = require('angular');
const _ = require('lodash');

let activoList = ($bi,$time,$select) => {

  let link = (scope,element,attrs) => {
    //Carga los activos y posteriormente los clientes
    loadClientes();
    //Por defecto se desactiva la seleccion de area hasta seleccionar primero   el cliente
    scope.areaDisabled = true;
    //Variable para guardar el activo seleccionado
    scope.selected = new Array();
    //Variable para estructurar el filtro y guardar los modelos de autos y text 
    scope.model = new Object();
    scope.filter = new Object();
    //Vigilante a selected para cambiar el modelo de raiz del controlador
    scope.$watch('selected', activo => scope.ngModel = activo,() => {});
    //Vigilante a buscar para busqueda global a partir de 3 digitos
    scope.$watch('model.buscar', buscar =>{
      if(buscar)
        if(buscar.length >= 2)
          allActivos(buscar);
    },() => {});
    //Servicio de busqueda para cliente
    /*scope.searchCliente = query => 
      $select.searchFull(query, scope.clientesList, 'nombre');
    //Servicio de busqueda para area
    scope.searchArea = query => 
      $select.searchFull(query, scope.areaList, 'nombre');    */
    //Carga los clientes
    function loadClientes() {
      $bi.cliente('cliente_completo').all()
        .then(response => scope.clientesList = response.data);
    }
    //Carga todos los activos dependiendo el filtro
    function allActivos(busqueda) {
      //Se instancia variable filter para poder usarla como where 
      let filter = new Object();
      //En caso que se haya realizado una busqueda 
      if(busqueda){
        //Se crea variable que compartiran las columnas del object
        let  search = `'%${busqueda}%'`;
        //Se modifica filter para estructurar el where
        filter = {
          serial : search,
          inventario : search,
          seguridad : search
        }
      }
      //Se hace un merge del filter actual con el del modelo
      _.assign(filter,scope.filter)
      
      ////Finalmente se realiza la busqueda con el filtro 
      $bi.activo('full_activo').all(filter)
        .then(response=> scope.activos =response.data);
    }
    //Evento de seleccion de cliente 
    scope.selectedCliente = () => {
      //Activa el select del area
      scope.areaDisabled = false;
      //Hace reset a los filtros
      scope.filter = new Object();
      //Se modifica el cliente
      scope.filter["id_cliente"] = scope.model.cliente;
      //Se cargan los activos
      allActivos();
      //Variables de busqueda
      let
        arrVal = ['distinct nombre', 'id_area'],
        whereArr = {
          fk_id_cliente: scope.filter["id_cliente"]
        };
      //Busqueda de areas
      $bi.area().find(arrVal, whereArr)
        .then(response => scope.areaList = response.data);
    }
    //Evento de seleccion de area
    scope.selectedArea = (selected) => {
      //Se modifica el area
      scope.filter["id_area"] = scope.model.area;
      //Se buscan los activos con los filtros
      allActivos();
    }
  }

  return {
    template: require('./activoList.pug'),
    restrict: 'EA',
    require : 'ngModel',
    scope : {ngModel : '='},
    link : link
  };
}

export default angular.module('nixApp.activoList', [])
  .directive('activoList', activoList)
  .name;

