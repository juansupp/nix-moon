'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('m.addUsuario', {
      url: '/addUsuario',
      template: '<add-usuario></add-usuario>'
    });
}
