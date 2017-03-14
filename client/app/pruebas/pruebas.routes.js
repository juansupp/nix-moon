'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('pruebas', {
      url: '/pruebas',
      template: '<pruebas></pruebas>'
    });
}
