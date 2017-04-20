'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('m.entrega', {
      url: '/entrega',
      template: '<entrega></entrega>'
    });
}
