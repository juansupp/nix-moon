'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('m.alistarActivo', {
      url: '/alistarActivo',
      template: '<alistar-activo></alistar-activo>'
    });
}
