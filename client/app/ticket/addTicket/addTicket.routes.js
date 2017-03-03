'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('m.addTicket', {
      url: '/addTicket',
      template: '<add-ticket></add-ticket>'
    });
}
