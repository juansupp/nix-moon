'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './configActivo.routes';

export class ConfigActivoComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('nixApp.configActivo', [uiRouter])
  .config(routes)
  .component('configActivo', {
    template: require('./configActivo.pug'),
    controller: ConfigActivoComponent,
    controllerAs: 'configActivoCtrl'
  })
  .name;
