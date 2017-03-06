'use strict';
const angular = require('angular');

export class seeHistoryComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'World';
  }
}

export default angular.module('nixApp.seeHistory', [])
  .component('seeHistory', {
    template: '<h1>Hello {{ $ctrl.message }}</h1>',
    bindings: { message: '<' },
    controller: seeHistoryComponent
  })
  .name;
