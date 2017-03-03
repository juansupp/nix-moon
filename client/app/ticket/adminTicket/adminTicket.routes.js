'use strict';


export default function ($stateProvider){
  'ngInject';
  $stateProvider
    .state('m.adminTicket',{
      url : '/adminTicket',
      template: '<admin-ticket></admin-ticket>'
    })
}
