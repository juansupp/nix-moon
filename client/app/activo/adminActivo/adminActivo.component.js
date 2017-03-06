'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');

import route from './adminTicket.route';
export class adminActivoComponent {
  /*@ngInject*/
  constructor($bi,$hummer,$pop) {
    this.$bi = $bi;
    this.$hummer = $hummer;
    this.$pop = $pop;
  }

  searchactivos(){
    this.$bi.activo().paginate()
  }

  allUsers(filter,page) {
    this.currenTotal(filter);
    this.$bi.activo()
      .paginate(filter,page-1,2)
      .then(response => this.activos = response.data);
  }

  currenTotal (filter) {
    this.$bi.activo()
      .find(['count(id_activo) total'],filter)
      .then(response => this.totalTickets = response.data[0].total);
  }


  updateactivo(frm) {
    //Se convierte el formulario a modelo para poder extraer los valores
    let model = this.$hummer.castFormToModel(frm);
    if(model.contrasena === model._contrasena){
      let
      valObj = {
        apellido : model.apellido,
        nombre : model.nombre,
        correo : model.correo,
        telefono : model.telefono,
        rol : model.rol,
        contrasena : model.contrasena
      },
      whereObj = {
        id_activo : this.selected.id_activo
      };

      this.$bi.activo().update(valObj,whereObj)
        .then(()=>this.$pop.show('activo actualizado satisfactoriamente'));
    }else {
      this.$pop.show('Las credenciales son incorrectas');
    }


  }

  $onInit(){
    this.current = 1;

    this.allUsers({"1":"1"},1);
    // ARRAY  => OBJECTS !!
    this.selected = new Array();
    /**
     * Dont use
     */
    this.activos = [
      {
        nombre : 'Juan',
        apellido : 'Gom',
        correo : 'correo',
        id_activo : 1,
      },{
        nombre : 'Juan2',
        apellido : 'Gom2',
        correo : 'correo2',
        id_activo : 2,
      },{
        nombre : 'Juan3',
        apellido : 'Gom3',
        correo : 'correo3',
        id_activo : 3,
      }
    ]
    /*this.$bi.activo().all()
      .then(response => this.activos = response.data);*/
  }
}

export default
  angular
  .module('nixApp.adminTicket', [])
  .config(route)
  .component('adminTicket', {
    template: require('./adminTicket.pug'),
    controller: adminTicketComponent
  })
  .name;
