'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider.state('m.configActivo', {
    url: '/configActivo',
    template: '<config-activo></config-activo>'
  });
}
