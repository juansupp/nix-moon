'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './pruebas.routes';

export class PruebasComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
    this.some = '';
  }

  submit (frm) {

    console.log(frm,this.some);
  }
  $onInit() {

  }
}

export default angular.module('nixMoonApp.pruebas', [uiRouter])
  .config(routes)
  .component('pruebas', {
    template: require('./pruebas.pug'),
    controller: PruebasComponent
  })
  .name;
