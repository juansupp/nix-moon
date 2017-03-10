'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');
import routes from './addActivo.routes';

export class AddActivoComponent {
  /*@ngInject*/
  constructor($select, $bi, $hummer, $pop,$q) {
    this.$select = $select;
    this.$bi = $bi;
    this.$hummer = $hummer;
    this.$pop = $pop;
    this.$q = $q;
  }

  //Autocomplete inputs
  searchCliente(query) {
    console.log(this.clientesList)
    return this.$select.searchFull(query, this.clientesList, 'nombre');
  }
  searchArea(query) {
    return this.$select.searchFull(query, this.areaList, 'nombre');
  }
  searchMarca(query) {
    console.log(this.marcaList)
    return this.$select.search(query, this.marcaList);
  }

  selectedCliente(selected) {
    if(selected) {
      this.areaDisabled = false;
      let
        arrVal = ['distinct nombre', 'id_area'],
        whereArr = {
          fk_id_cliente: this.model.cliente.id_cliente
        };
      this.$bi.area().find(arrVal, whereArr)
        .then(response => this.areaList = response.data);

    }
  }

  selectedArea(selected) {
    if (selected) this.model.area = selected;
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


 /*
create table caracteristica_activo (
  id_caracteristica_activo int primary key identity,
  fk_id_caracteristica_valor int foreign key references caracteristica_valor(id_caracteristica_valor),
  fk_id_activo int foreign key references activo (id_activo)
)
*/
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

  insertArea(){
    console.log(this.model.cliente)
    return this.$bi.area()
      .insert(
        [
          this.areaSearch,
          this.model.cliente.id_cliente
        ]);
  }

  nuevoActivo(frm) {
    if(this.validateCarValues()){

      this.btnDisabled = true;

      let
        model = this.$hummer.castFormToModel(frm),
        repetition = this.$hummer.evaluateRepetition(
          this.areaList,
          model.area,
          'nombre'
        );


        //En caso que no se repita
      if (!repetition) {
        //Inserta area
        this.insertArea()
          .then(response => {
            this.model.area = response.data[0];
            this.ingresarActivo(model);
          });
      } else {
        this.ingresarActivo(model);
      }
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
      this.model.area.id_area
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
    //Carga el select para tipo de activo
    this.$bi.tipoActivo().all()
      .then(response => this.tipoActivoList = response.data);
    //Carga el select para cliente desde una vista
    this.$bi.cliente('cliente_completo').all()
      .then(response => this.clientesList = response.data);
    //Carga el select para la marca
    this.$bi.activo().find(['distinct marca'])
      .then(response => this.marcaList = this.$hummer.objectToArray(response.data));
    //Se activa el botón de submit por defecto
    this.btnDisabled = false;
    //Se instancia el select para Area
    this.areaList = new Array();
    //Se desactiva por defecto el area para cargarlo con cliente
    this.areaDisabled = true;
    //Objeto de area seleccionada
    this.areaSeleccionada = new Object();
  }
}
export default angular.module('nixApp.addActivo', [uiRouter])
  .config(routes)
  .component('addActivo', {
    template: require('./addActivo.pug'),
    controller: AddActivoComponent
  })
  .name;
