'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './pruebas.routes';

export class PruebasComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
    this.some = '';
    this.sme = '';
  }

  submit (frm) {

    console.log(frm,this.some);
  }
  $onInit() {
    this.pru = new Object();
    this.nxData = {
      t :  'usuario',
      v : ['id_usuario','correo']
    }
  }
}

export default angular.module('nixMoonApp.pruebas', [uiRouter])
  .config(routes)
  .component('pruebas', {
    template: require('./pruebas.pug'),
    controller: PruebasComponent
  })
  .name;
