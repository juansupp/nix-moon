'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './alistarActivo.routes';

export class AlistarActivoComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }

  $onInit(){
    this.models = {
        selected: null,
        lists: {"A": [], "B": []}
    };

    // Generate initial model
    for (var i = 1; i <= 3; ++i) {
        this.models.lists.A.push({label: "Item A" + i});
        this.models.lists.B.push({label: "Item B" + i});
    }

  }
}

export default angular.module('nixApp.alistarActivo', [uiRouter])
  .config(routes)
  .component('alistarActivo', {
    template: require('./alistarActivo.pug'),
    controller: AlistarActivoComponent
  })
  .name;
