'use strict';


export default function ($stateProvider) {
  'ngInject';
  $stateProvider
    .state('m.addActivo',{
      url : '/addActivo',
      template : '<add-activo></add-activo>'
    });

}
