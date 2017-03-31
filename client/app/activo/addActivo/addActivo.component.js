'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');
import routes from './addActivo.routes';

export class AddActivoComponent {
  /*@ngInject*/
  constructor($select, $bi, $hummer, $pop,$q,$nxData) {
    this.$select = $select;
    this.$bi = $bi;
    this.$hummer = $hummer;
    this.$pop = $pop;
    this.$q = $q;
    this.nxData = $nxData;
  }

  loadCaracteristicas(idTipo) {
    return this.$bi
      .car()
      .all({fk_id_tipo_activo : idTipo});
  }

  loadCaracteristicaValores(idCar) {
    return this.$bi
      .carValor()
      .all({fk_id_caracteristica : idCar});
  }

  selectTipoActivo(){
    //Por defecto se resetea la vista de las caracteristicas
    this.showCar = false;
    //Se resetean las caracteristicas
    this.caracteristicas = new Array();
    //Cargamos las caracteristicas del tipo de activo seleccionado
    this.loadCaracteristicas(this.model.tipoActivo)
      .then(response => {

        //En caso que hayan caracteristicas
        if(response.data.length > 0){
          //Se muestra el campo de las caracteristicas
          this.showCar = true;
          //Variables de acorte proximo
          let
            caracteristicas  = new Array(),
            valores = new Array();
          //Acorte de variable
          caracteristicas = response.data;
          //Por cada caracteristica del tipo  de activo
          caracteristicas.forEach(c => {
            // c = caracteristica actual
            //Se cargan los valores de la caracteristica
            this.loadCaracteristicaValores(c.id_caracteristica)
              .then(responseV => {
                //Se acorta variable
                valores = responseV.data;
                //Se crea variable temporal obj para agregar al array
                let obj = {
                  selected : '', // => hace referencia al ngModel
                  values : valores, //=> Se guardan los valores de la caracteristica
                  _caracteristica : c._caracteristica // Referencia para el placeholder
                }
                //Finalmente se agregan la caracteristica
                this.caracteristicas.push(obj)
              });
          });
        }
      });
  }

  selectMarca(){
    console.log('as');
    this.nxData.modelo.w = {fk_id_marca : this.model.marca};
  } 

  validateCarValues(){
    let full = true;
    this.caracteristicas.forEach(c => {
      if(!c.selected) full = false;
    })
    return full
  }

  insertCarActivo(arrVal){
    return this.$bi
      .carActivo()
      .insert(arrVal)
  }

///*****//FOCUS******//***///
  nuevoActivo(frm) {
    if(this.validateCarValues()){

      this.btnDisabled = true;

      let
        model = this.$hummer.castFormToModel(frm);
      this.ingresarActivo(model);
    }else {
      this.$pop.show('Debes seleccionar las especificaciones del activo');
    }
  }

  ingresarActivo(model) {
    let arrVal = [
      model.serial,
      model.marca,
      model.modelo,
      model.inventario,
      model.seguridad,
      this.model.tipoActivo,
      'null'
    ];
    this.$bi
      .activo()
      .insert(arrVal)
      .then(response => {
        console.log(response.data)
        //Acortamos variable
        let idActivo = response.data[0].id_activo;
        //Se insertan las caracteristicas en caso de tener
        this.caracteristicas.forEach(c => {
          this.$bi
          .carActivo()
          .insert([c.selected,idActivo])
        });
        this.$pop.show('Activo registrado Satisfactoriamente')
        this.model = new Object();
      });
  }

  $onInit() {
    //Se instancia el repetidor de caracteristicas
    this.caracteristicas = new Array();
    //Por defecto no se muestran las caracteristicas hasta seleccionar un tipo de activo
    this.showCar = false;
    //Modelo del controlador
    this.model  = new Object();
    //Se activa el botón de submit por defecto
    this.btnDisabled = false;
  }
}
export default angular.module('nixApp.addActivo', [uiRouter])
  .config(routes)
  .component('addActivo', {
    template: require('./addActivo.pug'),
    controller: AddActivoComponent
  })
  .name;
