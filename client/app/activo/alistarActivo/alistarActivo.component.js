'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './alistarActivo.routes';

export class AlistarActivoComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('nixApp.alistarActivo', [uiRouter])
  .config(routes)
  .component('alistarActivo', {
    template: require('./alistarActivo.pug'),
    controller: AlistarActivoComponent,
    controllerAs: 'alistarActivoCtrl'
  })
  .name;
