'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider.state('configActivo', {
    url: '/configActivo',
    template: '<config-activo></config-activo>'
  });
}
