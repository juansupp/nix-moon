'use strict'
const angular = require('angular');
/*@ngInject*/

export function dialogService($mdDialog) {

  function confirm(ev, title, text) {
    let confirm =
      $mdDialog.confirm()
      .title(title)
      .textContent(text)
      .ariaLabel('Dialogo')
      .targetEvent(ev)
      .ok('Aceptar')
      .cancel('Cancelar');

    return $mdDialog.show(confirm)
  }

  this.confirm = confirm;
}

export default
angular.module('nixApp.dialog', [])
  .service('$dialog', dialogService)
  .name;
