'use strict';

const angular = require('angular');
const uiRouter = require('angular-ui-router');
import routes from './addCliente.routes';

export class AddClienteComponent {
  /*@ngInject*/
  constructor($select, $bi, $hummer, $pop, $state) {
    this.$bi = $bi;
    this.$select = $select;
    this.$hummer = $hummer;
    this.$pop = $pop;
    this.$state = $state;
  }
  search(query){
    return this.$select.search(query);
  }
  nuevoCliente(frm) {
    this.btnDisabled = true;
    let model = this.$hummer.castFormToModel(frm);
    if (model._contrasena === model.contrasena) {
      let arrVal = [
        model.cliente,
        model.sede,
        model.direccion,
        model.telefono,
        model.contacto,
        model.correo,
        model.contrasena
      ];
      //??
      this.$bi.cliente().insert(arrVal)
        .then(() =>{
          this.$pop.show('Cliente registrado satisfactoriamente.');
          this.model = new Object();
        });
    } else {
      this.btnDisabled = false;
      this.$pop.show('Las contraseñas no coinciden');
    }
  }
  $onInit(){
    this.btnDisabled = false;
    this.$bi.cliente().find(['distinct nombre_empresa'])
      .then(response =>
        this.$select.list = this.$hummer.objectToArray(response.data)
      );
  }
}

export default angular.module('nixApp.addCliente', [uiRouter])
  .config(routes)
  .component('addCliente', {
    template: require('./addCliente.pug'),
    controller: AddClienteComponent
  })
  .name
