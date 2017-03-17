'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('alistarActivo', {
      url: '/alistarActivo',
      template: '<alistar-activo></alistar-activo>'
    });
}
