'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');
const _ = require("lodash");
import routes from './addActivo.routes';

export class AddActivoComponent {
  /*@ngInject*/
  constructor($select, $bi, $hummer, $pop,$q,$nxData,$scope) {
    this.$select = $select;
    this.$bi = $bi;
    this.$hummer = $hummer;
    this.$pop = $pop;
    this.$q = $q;
    this.nxData = $nxData;
    this.$scope = $scope;
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
    _.defer(()=>{
      console.log(this.model.tipoActivo);
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
    });
  }

  selectMarca(){
    /*
    Carga modelo.
    Se hace uso de temporizador defer para esperar a que acabe la digestión y poder aplicar los cambios del modelo de la directiva ya que se ejecuta prmero este metodo antes que se aplique el cambio al ngModel inicial
     */
    _.defer( () => {
      //Se aplican los cambios para ver los modelos actuales
      this.$scope.$apply();
      //En caso que se haya seleccionado mas no borrado alguna letra
      if(this.model.marca){
        //Se hace la modificacion al nxData para modelo
        this.nxData.modelo.w = {fk_id_marca : this.model.marca.value};
        //Se resetea la variable modelo para evitar problemas
        this.model.modelo = '';
        //Se habilita la seleccion de modelo
        this.disabled.modelo = false;

      }
    })

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

  getModelo (fkMarca) {
    if(!this.model.modelo)
      return this.$bi.modelo().insert([this.text.modelo,fkMarca])
        .then(response => {return response.data[0].id_modelo });
    else{

      let deferred = this.$q.defer();
      deferred.resolve( this.model.modelo.value )
      return deferred.promise;
    }
  }

  getMarca () {
   if(!this.model.marca)
    return this.$bi.marca().insert([this.text.marca])
      .then(response =>{ return response.data[0].id_marca});
    else{
      let deferred = this.$q.defer();
      deferred.resolve( this.model.marca.value )
      return deferred.promise;
    }
  }

  getCaracteristicaValor(fkActivo){
    this.caracteristicas.forEach(c => {
      this.$bi
      .carActivo()
      .insert([c.selected,fkActivo])
    });
  }
  /*FIXX FOR FOCUS Insert arrays or objects */
  getActivo(fkModelo) {
    let arrVal = [
      this.model.serial,
      this.model.inventario,
      this.model.seguridad,
      this.model.tipoActivo,
      fkModelo,
      "1", // => NOTA: 1 hace referencia al contacto por defecto nix-boot
    ];
    return this.$bi
      .activo()
      .insert(arrVal)
      .then(response => {return response.data[0].id_activo});

        /*this.$pop.show('Activo registrado Satisfactoriamente')
        this.model = new Object();*/
  }

///*****//FOCUS******//***///
  nuevoActivo(frm) {
    console.log(this.model)
    //Se valida que los input de caracteristicas sean validos
    if(this.validateCarValues()){
      //Desabilitamos en botón de registro para evitar duplicidad
      this.disabled.submit = true;
      //Convertimos a modelo el formulario
      let
        model = this.$hummer.castFormToModel(frm);



      this.getMarca().then(rMarca => {
        this.getModelo(rMarca).then(rModelo => {
          //Pre modelo
          this.getActivo(rModelo).then(rActivo => {
            //Post modelo
            this.getCaracteristicaValor(rActivo);
          })
        })
      })

    }else {
      this.$pop.show('Debes seleccionar las especificaciones del activo');
    }
  }



  $onInit() {
    //Se instancia el repetidor de caracteristicas
    this.caracteristicas = new Array();
    //Por defecto no se muestran las caracteristicas hasta seleccionar un tipo de activo
    this.showCar = false;
    //Modelo del controlador
    this.model  = new Object();
    //Se activa el botón de submit por defecto
    this.disabled  = {
      submit : false,
      modelo : true
    };
  }
}
export default angular.module('nixApp.addActivo', [uiRouter])
  .config(routes)
  .component('addActivo', {
    template: require('./addActivo.pug'),
    controller: AddActivoComponent
  })
  .name;
