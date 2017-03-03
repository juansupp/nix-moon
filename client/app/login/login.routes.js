'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('login', {
      url: '/',
      template: '<login></login>'
    });
}
