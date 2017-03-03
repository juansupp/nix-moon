'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider.state('m.adminCliente', {
    url: '/adminCliente',
    template: '<admin-cliente></admin-cliente>'
  });
}
