'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');
import route from './documTicket.routes';

export class DocumTicketCmponent {
  /*@ngInject*/
  constructor($q,$imagenix, moment, $http, $select, $bi, $hummer, $pop, $scope, $cookieStore, $time, $stateParams) {
    this.$select = $select;
    this.$bi = $bi;
    this.$hummer = $hummer;
    this.$pop = $pop;
    this.$scope = $scope;
    this.$cookieStore = $cookieStore;
    this.$time = $time;
    this.$http = $http;
    this.$stateParams = $stateParams;
    this.moment = moment;
    this.$imagenix = $imagenix;
    this.$q = $q;

  }
  messageRight() {
    this.$pop.show("Documentacion registrada satisfactoriamente")
  }
  openFeatures(feature) {
    this.features[feature].visible = !this.features[feature].visible;
  }
  /*
   *   Proceso global de documentar
   *   @tipo = tipo de documentacion OO,SS,CC,EE
   */
  nota(tipo) {
    let valObj = {
        estado: 'P'
      },
      whereObj = {
        id_ticket: this.$stateParams.id
      };
    this.$bi.ticket().update(valObj, whereObj);
    //Async same time
    let hoy = this.moment().format('YYYY[-]MM[-]D'),
      ahora = this.moment().format('h:mm:ss'),
      nombreUsuario = `${this.$cookieStore.get('user').apellido} ${this.$cookieStore.get('user').nombre}`,
      arrVal = [
        hoy,
        ahora,
        this.model.texto,
        tipo,
        nombreUsuario,
        this.$stateParams.id
      ];

    if (this.model.images) {
      return this.$bi.documentacion().insert(arrVal).then(response => {
        this.$imagenix.save(this.model.images, response.data[0].id_documentacion)
      });
    } else {
      return this.$bi.documentacion().insert(arrVal);
    }
  }

  cerrar() {
    // Registrar la encuesta
    let valObj = {
        estado: 'C'
      },
      whereObj = {
        id_ticket: this.$stateParams.id
      };
    this.$bi.ticket().update(valObj, whereObj).then(() => {
      this.preguntas.forEach((pregunta) => {
        this.$bi.encuesta().insert([pregunta.model, this.$stateParams.id]);
      });
    });
    this.messageRight();
  }

  escalar() {
    //Se actualiza el te4cnico en el ticket
    let valObj = {
        fk_id_tecnico: this.model.tecnico,
        estado: 'P'
      },
      whereObj = {
        id_ticket: this.$stateParams.id
      };
    this.$bi.ticket().update(valObj, whereObj).then(() => this.messageRight());
  }

  solucionar() {
    let valObj = {
        cierre: this.model.cierre,
        estado: 'V'
      },
      whereObj = {
        id_ticket: this.$stateParams.id
      };
    this.$bi.ticket().update(valObj, whereObj).then(() => this.messageRight());
  }

  frmSubmit() {
    if (this.modo === 'N' || this.modo === 'P') {
      //NOTA O SOLUCION
      let tipo = this.model.cierre === "NN"
        ? "OO"
        : "SS";
      this.nota(tipo).then(response => {
        //SI ES SOLUCION
        if (tipo === 'SS')
          this.solucionar(); //SI ES NOTA
        else
          this.messageRight();
        }
      );
    } else if (this.modo === 'V')
      this.nota("CC").then(() => this.cerrar());
    else if (this.modo === 'E')
      this.nota("EE").then(() => this.escalar());
    }

  cargarPreguntas() {
    this.$bi.pregunta().all().then(response => {
      for (var i = 0; i < response.data.length; i++) {
        let pregunta = new Object(),
          id = response.data[i].id_pregunta;
        pregunta = {
          id: id,
          name: `pregunta${id}`,
          model: `pregunta${id}`,
          placeholder: response.data[i].pregunta
        }
        this.$bi.respuesta().all({fk_id_pregunta: response.data[i].id_pregunta}).then(respuestas => {
          pregunta["respuestas"] = respuestas.data
          this.preguntas.push(pregunta);
        })
      }
    });
  }
  cargarCaracteristicas() {
    //Activo
    //
    //Cliente
  }
  cargarImagenes() {
    this.$bi.imagen("full_images").all({id_ticket: this.$stateParams.id}).then(imgs => {
      this.imgs = imgs.data;
    });
  }
  cargarDocumentacion() {
    this.$bi.documentacion().all({fk_id_ticket: this.$stateParams.id}).then(response => {
      response.data.forEach((_documento) => {

        /*this.$imagenix.load(_documento.id_documentacion)
            .then(imgs => {
              console.log(imgs);
              _documento.images = imgs.data_image;
            });*/
        //console.log(_documento.images);
        _documento.fecha = this.$time.date(_documento.fecha, "LL", 1)
        _documento.hora = this.$time.time(_documento.hora);
      });
      this.documentos = response.data;
    });
  }

  cargarTecnicos() {
    this.$bi.usuario("tecnicos").all().then(response => {
      this.tecnicos = response.data;
    })
  }

  $onInit() {
    this.id = this.$stateParams.id;
    this.cargarImagenes();
    //
    this.hoy = this.moment().format('LL')
    //
    this.cargarDocumentacion();
    //instancia de preguntas
    this.preguntas = new Array();
    //Instancia de modelo
    this.model = new Object();
    //Por defecto es un nota mas no un cierre
    this.model.cierre = 'NN';
    //*FALTA IMAGEN
    this.image = '';
    //El modeo en el que se ejecuta la documentacion ESCALAR|DOCUMENTAR-SOLUCIONAR|CERRAR(ENCUESTA)
    this.modo = this.$stateParams.modo;
    if (this.modo === 'V')
      this.cargarPreguntas();
    if (this.modo === 'E')
      this.cargarTecnicos();

    //
    let url = 'http://picasaweb.google.com/data/entry/api/user/mortombolo@gmail.com?alt=json';
    this.$http.get(url).then(response => this.image = response.data.entry.gphoto$thumbnail.$t).catch(err => console.log(err))
    // data => entry => gphoto$thumbnail ==> $t
   // this.features = require('./docum.struct')
  }
}

export default angular.module('nixApp.documTicket', [uiRouter]).config(route).component('documTicket', {
  template: require('./documTicket.pug'),
  controller: DocumTicketCmponent
}).name;
