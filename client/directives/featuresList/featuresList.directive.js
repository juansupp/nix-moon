'use strict';
const angular = require('angular');

let featuresList = ($bi,$time) => {

  let link = (scope,element,attrs) => {

    scope.openFeatures =  feature =>  {
        scope.struct[feature].visible = !scope.struct[feature].visible;
      }
      scope.struct = require('./feature.struct');
      //
      let arrVal = [
        "N_Ticket",
        "estado",
        "fecha",
        "hora",
        "servicio",
        "origen",
        "usuario_final",
        "cliente",
        "area",
        "direccion",
        "telefono",
        "contacto",
        "correo_contacto",
        "activo",
        "serial",
        "modelo",
        "inventario",
        "seguridad"
      ],
      objWhere = {tipo : 'II',id_ticket : scope.id};
      //
      $bi.ticket("full_out_ticket")
        .find(arrVal,objWhere)
        .then(_ticket => {
          scope.struct.forEach(item => {
            for (let tick in _ticket.data[0])
              if(item.list[tick]){
                if (tick === 'fecha') 
                  item.list[tick].value = $time.date(_ticket.data[0][tick], "LL", 1);
                else if (tick === 'hora') 
                  item.list[tick].value =  $time.time(_ticket.data[0][tick]); 
                else 
                  item.list[tick].value = _ticket.data[0][tick];
              }
          });
      });
  }

  return {
    template: require('./featuresList.pug'),
    restrict: 'EA',
    scope : {id : '='},
    link : link
  };
}

export default angular.module('nixApp.featuresList', [])
  .directive('featuresList', featuresList)
  .name;

