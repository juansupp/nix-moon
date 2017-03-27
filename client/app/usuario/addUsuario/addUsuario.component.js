'use strict';

const angular = require('angular');
const uiRouter = require('angular-ui-router');
import routes from './addUsuario.routes';

export class AddUsuarioComponent {
  /*@ngInject*/
  constructor($select, $bi, $hummer, $pop, $state,$nxData) {
    this.$bi = $bi;
    this.$select = $select;
    this.$hummer = $hummer;
    this.$pop = $pop;
    this.$state = $state;
    this.nxData = $nxData;
  }
  nuevoUsuario(frm) {
    this.btnDisabled = true;
    let model = this.$hummer.castFormToModel(frm);
    if (model._contrasena === model.contrasena) {
      let arrVal = [
        model.apellido,
        model.nombre,
        model.telefono,
        model.correo,
        model.contrasena,
        model.rol
      ];      
      this.$bi.usuario().insert(arrVal)
        .then(() =>{
          this.$pop.show('Usuario registrado satisfactoriamente.');
          this.model = new Object();
        });
    } else {
      this.btnDisabled = false;
      this.$pop.show('Las contraseñas no coinciden');
    }
  }
  $onInit() {
    this.btnDisabled = false;
  }
}
export default angular.module('nixApp.addUsuario', [uiRouter])
  .config(routes)
  .component('addUsuario', {
    template: require('./addUsuario.pug'),
    controller: AddUsuarioComponent
  })
  .name;
