'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './master.routes';

export class MasterComponent {
  /*@ngInject*/
  constructor() {

  }
  $onInit(){
    
  }
}

export default angular.module('nixApp.master', [uiRouter])
  .config(routes)
  .component('master', {
    template: require('./master.pug'),
    controller: MasterComponent
  })
  .name;
