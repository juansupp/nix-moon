'use strict'
const angular = require('angular');
/*@ngInject*/
export function popService($mdToast) {

  function show(text) {
    let toast = $mdToast.simple().textContent(text).hideDelay(3000);
    $mdToast.show(toast);
  }

  this.show = show;
}

export default angular.module('nixApp.pop', []).service('$pop', popService).name;
