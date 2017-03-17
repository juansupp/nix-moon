'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('ligarActivo', {
      url: '/ligarActivo',
      template: '<ligar-activo></ligar-activo>'
    });
}
