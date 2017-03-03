'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('m', {
      abstract : true,
      template: '<mimenu></mimenu>'
    });
}
