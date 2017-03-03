'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('m.master', {
      url: '/master',
      template: '<master></master>'
    });
}
