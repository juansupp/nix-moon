'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('m.Admin', { // => Se cambia a admin DB
      url: '/master',
      template: '<master></master>'
    });
}
