'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider.state('adminActivo', {
    url: '/configActivo',
    template: '<config-activo></config-activo>'
  });
}
