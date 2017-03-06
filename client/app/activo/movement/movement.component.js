'use strict';
const angular = require('angular');

export class movementComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'World';
  }
}

export default angular.module('nixApp.movement', [])
  .component('movement', {
    template: '<h1>Hello {{ $ctrl.message }}</h1>',
    bindings: { message: '<' },
    controller: movementComponent
  })
  .name;
