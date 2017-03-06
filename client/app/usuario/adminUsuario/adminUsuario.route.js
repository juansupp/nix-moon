'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider.state('adminUsuario', {
    url: '/adminUsuario',
    template: '<admin-usuario></admin-usuario>'
  });
}
