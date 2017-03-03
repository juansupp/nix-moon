'use strict'

export default function ($stateProvider){
  'ngInject';
  $stateProvider
    .state('m.addCliente',{
      url : '/addCliente',
      template :'<add-cliente></add-cliente>'
    });
}
