'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './pruebas.routes';

export class PruebasComponent {
  /*@ngInject*/
  constructor($bi,$nxData) {
    this.message = 'Hello';
    this.some = '';
    this.sme = '';
    this.$bi = $bi;
    this.nxData =  $nxData;
  }

  change(){

    console.log(this.model.marca)
    /*this.nxData.modelo.w = {
      fk_id_marca  : this.marca
    };*/

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
    this.model = new Object();
    this.pru = new Object();

  }
}

export default angular.module('nixApp.pruebas', [uiRouter])
  .config(routes)
  .component('pruebas', {
    template: require('./pruebas.pug'),
    controller: PruebasComponent
  })
  .name;
