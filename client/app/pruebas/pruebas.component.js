'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './pruebas.routes';

export class PruebasComponent {
  /*@ngInject*/
  constructor($bi) {
    this.message = 'Hello';
    this.some = '';
    this.sme = '';
    this.$bi = $bi;
  }

  submit (frm) {

    let ins = [
      'GOnzalez',
      'jjuan',
      '319705244',
      'eas@asd.com',
      '123',
      '1'
    ]

    this.$bi.usuario().insert(ins).then(response => console.log(response))
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
