'use strict';

export default function ($stateProvider) {
  'ngInject';
  $stateProvider
    .state('m.documTicket', {
      url : '/documTicket/:id/:modo',
      template : '<docum-ticket></docum-ticket>'
    });

}
