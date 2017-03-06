'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider.state('adminActivo', {
    url: '/adminActivo',
    template: '<admin-activo></admin-activo>'
  });
}
