'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');

import routes from './addTicket.routes';

export class AddTicketComponent {
  /*@ngInject*/
  constructor($dialog,$imagenix, moment, Upload, $select, $time, $bi, $hummer, $pop, $scope, $cookieStore, $http) {
    this.$select = $select;
    this.$bi = $bi;
    this.$hummer = $hummer;
    this.$pop = $pop;
    this.$scope = $scope;
    this.$cookieStore = $cookieStore;
    this.$time = $time;
    this.$http = $http;
    this.$upload = Upload;
    this.$imagenix = $imagenix;
    this.moment = moment;
    this.$dialog = $dialog;
  }
  //Autocomplete inputs
  searchOrigen(query) {
    return this.$select.search(query, this.origenList);
  }
  searchServicio(query) {
    return this.$select.search(query, this.servicioList);
  }
  searchActivo(query) {
    return this.$select.searchFull(query, this.activoList);
  }
  selectedActivo(selected) {
    if (selected)
      this.activoSeleccionado = selected.id_activo;
  }



  nuevoTicket(ev,frm) {
    console.log(this.model.contacto)
    if(this.activoSeleccionado.length === 0) 
      this.$pop.show('Debes seleccionar un activo para finalizar.');
    else {
      //Busca en la base de datos el ultimo activo ingresado para hacer la cuenta progresiva de N_Ticket
      this.$bi.ticket('lastTicket').find(['N_Ticket']).then(response => {
        let
          //Se acorta la variable
          data = response.data[0],
          //Declaración del ultimo numero de ticket
          nTicket = data.N_Ticket? data.N_Ticket + 1: '0001',
          //Titlo del cuadro de confirmacion
          titulo = `Ticket Nº${nTicket}`,
          //Texto dentro del dialogo de confirmacion
          texto = "¿Desea registrar un nuevo ticket?";
        //En caso de confirmar se realiza el ticket
        this.$dialog.confirm(ev,titulo, texto).then(() => {
          //Declaración de variables
          let
            //Se define la fecha con formato especial para guardar en documentacion
            hoy = this.moment().format('YYYY[-]MM[-]D'),
            //Se define la hora con formato especial para guardar en documentacion
            ahora = this.moment().format('h:mm:ss'),
            //Se acorta la variable
            idCreador = (this.$cookieStore.get('user')).id_usuario,
            //Se acorta variable
            nombreCreador = (this.$cookieStore.get('user')).nombre,
            //Se convierte el formulario a modelo para poder extraer los valores
            model = this.$hummer.castFormToModel(frm),
            // Se crea el arreglo  para ingresar el ticket
            arrValTicket = [
              nTicket,
              "N",
              model.origen,
              model.servicio,
              this.model.contacto,
              model.tecnico,
              idCreador,
              this.activoSeleccionado[0].id_activo,
              "X" // ==> Cierre X quiere decir que aun no se ha cerrado
            ],
            //Se crea el arreglo para insertar documentacion
            arrValDocum = [hoy, ahora, model.descripcion, "II", nombreCreador];
          //Se inserta el ticket
          this.$bi.ticket().insert(arrValTicket).then(response => {
            //Se agrega al arreglo de documentacion el ticket recien ingresado
            arrValDocum.push(response.data[0].id_ticket);
            //Se inserta la documentacion
            this.$bi.documentacion().insert(arrValDocum).then(responseDocum => {
              //Se acorta variable
              let id_documentacion = responseDocum.data[0].id_documentacion;
              //Si se seleccionaron imagenes
              if (this.model.images) {
                //??Si el array no posee imagenes significa que el filtro rechazo el peso permitido
                if (this.model.images.length <= 0)
                  this.$pop.show("El tamaño de las imagenes supera al permitido {MAX: 1MB per image} "); //??de lo contrario se insertan las imagenes
                else
                  this.$imagenix.save(this.model.images, id_documentacion).then(() => this.$pop.show('Ticket Registrado satisfactoriamente'));
                }
              else {
                //Muestra popo de registro satisfactorio
                this.$pop.show('Ticket Registrado satisfactoriamente');
                //Limpia el modelo
                this.model = {};
              }
            })
          });
        });
      })
    }
  }

  $onInit() {
    //Cara select para origen
    this.$bi.ticket().find(['distinct origen']).then(response => this.origenList = this.$hummer.objectToArray(response.data));
    //Carga select para servicio
    this.$bi.ticket().find(['distinct servicio']).then(response => this.servicioList = this.$hummer.objectToArray(response.data));
    this.$bi.activo().all().then(response => this.activoList = response.data);
    //
    this.$bi.usuario('tecnicos').all().then(response => this.tecnicoList = response.data);
    //Se activa el botón de submit por defecto
    this.btnDisabled = false;
    //Se instancia el select para Activo
    this.activoList = new Array();
    //Objeto de cliente sleccionado
    this.clienteSeleccionado = new Object();
    //Objeto de activo sleccionado
    this.activoSeleccionado = new Object();
    //Objeto de area seleccionada
    this.areaSeleccionada = new Object();
  }
}

export default angular.module('nixApp.addTicket', [uiRouter]).config(routes).component('addTicket', {
  template: require('./addTicket.pug'),
  controller: AddTicketComponent
}).name;
/*this.$upload.upload({
    url: 'api/astral/imagen',
    method: 'POST',
    //data: data, // Any data needed to be submitted along with the files
    file: this.model.images[0]
  });*/
