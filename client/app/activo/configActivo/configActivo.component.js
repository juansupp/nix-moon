'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-route');


import route from './configActivo.route'

export class configActivoComponent {
  /*@ngInject*/
  constructor($bi) {
    this.$bi = $bi;
  }


  insertTipo(tipo,descripcion){
    let arrVal = [tipo,descripcion];
    return this.$bi.tipoActivo().insert(arrVal)
  }

  insertEsp(idTipoActivo,esp){
    let arrVal = [esp,idTipoActivo];
    return this.$bi.esp().insert(arrVal)
  }

  insertEspValor(idEsp,valor){
    let arrVal = [valor,idEsp];
    return this.$bi.espValor().insert(arrVal)
  }

  // all-one by update
  loadTipoActivoOnce(where){
    return this.$bi.tipo_activo().find(where);
  }
  loadTipoActivoAll(where){
    return this.$bi.tipo_activo().all(where);
  }

  $onInit(){
    this.model = new Object();
  }
}

export default angular
  .module('nixApp.configActivo', [])
  .config(route)
  .component('configActivo', {
    template: require('./configActivo.pug'),
    controller: configActivoComponent
  })
  .name;
