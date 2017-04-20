'use strict';
const angular = require('angular');
//const uiRouter = require('angular-ui-route');


import route from './configActivo.route'

export class configActivoComponent {
  /*@ngInject*/
  constructor($bi,$q,$dialog,$pop) {
    this.$bi = $bi;
    this.$q = $q;
    this.$dialog = $dialog;
    this.$pop = $pop;
  }

  insertTipo(tipo,descripcion){
    let arrVal = [tipo,descripcion];
    return this.$bi.tipoActivo().insert(arrVal)
  }

  insertCar(esp,idTipoActivo){
    let arrVal = [esp,idTipoActivo];
    return this.$bi.car().insert(arrVal)
  }

  insertCarValor(valor,idCar){
    let arrVal = [valor,idCar];
    return this.$bi.carValor().insert(arrVal)
  }

  // all-one by update
  loadTipoActivoOnce(where){
    return this.$bi.tipo_activo().find(where);
  }
  /*loadTipoActivoAll(where){
    return this.$bi.tipo_activo().all(where);
  }*/

  /* Faltan las validaciones */

  addTipo (ev) {
    this.$dialog
    .confirm(ev,'Confirmación','¿Está seguro que desea registrar el tipo de activo?')
    .then( (e) => {
      console.log(e)


      //Inserta el tipo de activo primero
    this.insertTipo(this.model.tipo,this.model.descripcion)
      .then(response=>{
        let
          //Declara acortado de respuesta para id_tipo
          idTipo = response.data[0].id_tipo_activo,
          //Declara acortado para proxima respuesta
          idCaracteristica ='';
        //Looop para recorrer cada una de las caracteristicas
        this.model.caracteristicas.forEach(c =>{
          //insertamos la caracteristica
          this.insertCar(c.name,idTipo).then(responseCar=>{
            //Acortamos variable idCaracteristica
            idCaracteristica = responseCar.data[0].id_caracteristica
            //Se reccorre cada una de los valores por cada una de las caracteristicas
            c.values.forEach(value =>this.insertCarValor(value,idCaracteristica))
            this.$pop.show('Tipo de activo registrado satisfactoriamente')
          })
        })

      })

    })


  }

  addCaracteristica(){
    let defaultValues = { name:'', values:[] };
    this.model.caracteristicas.push(defaultValues);
  }

  $onInit(){
    let defaultValues = { name:'', values:[] };
    this.model = new Object();
    this.model.caracteristicas = [defaultValues];
  }
}

export default angular
  .module('nixApp.configActivo', [])
  .config(route)
  .component('configActivo', {
    template: require('./configActivo.pug'),
    controller: configActivoComponent
  })
  .name;
