'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './ligarActivo.routes';

export class LigarActivoComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }

  

  $onInit(){

  }
}

export default angular.module('nixApp.ligarActivo', [uiRouter])
  .config(routes)
  .component('ligarActivo', {
    template: require('./ligarActivo.pug'),
    controller: LigarActivoComponent,
  })
  .name;
