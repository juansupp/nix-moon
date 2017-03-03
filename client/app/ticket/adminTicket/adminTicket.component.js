'use strict'
//Libreries
const angular = require('angular');
const uiRouter = require('angular-ui-router');
const _ = require('lodash');
//Import the route
import routes from './adminTicket.routes'

export class AdminTicketComponent {
  /*@ngInject*/
  constructor(/*moment,*/ $select, $bi, $hummer, $pop, $scope, $cookieStore, $time) {
    this.$select = $select;
    this.$bi = $bi;
    this.$hummer = $hummer;
    this.$pop = $pop;
    this.$scope = $scope;
    this.$cookieStore = $cookieStore;
    this.$time = $time;
    //this.moment = moment;
  }

  allTickets(filter,page) {
    if (filter) 
      filter["tipo"] = 'II';
    this.currenTotal(filter);
    this.$bi.ticket('full_ticket')
      .paginate(filter,page-1,10)
      .then(response => {
      response.data.forEach(ticket => {
        ticket.fecha = this.$time.date(ticket.fecha,"LL",1);
        this.estados.forEach(estado => {
          if (estado.value == ticket.estado)
            ticket.icon = estado.icon
        });
      });
      //this.tickets = _.sortBy(response.data, 'N_Ticket').reverse();
      this.tickets = response.data;
      //count the files 
    });
  }

  filterDates(second) {
    //reset page ? 
    let fecha = new Array();
    if (!second) {
      fecha[0] = this.$time.date(this.fecha[0]) //this.moment(this.fecha[0]).format(sqlFormat);
      fecha[1] = fecha[0];
    } else {
      fecha[0] = this.$time.date(this.fecha[0]);
      fecha[1] = this.$time.date(this.fecha[1]);
    }
    this.model.fecha = `'${fecha[0]}' and '${fecha[1]}'`;
    this.allTickets(this.model,1);
  }

  currenTotal (filter) {
    this.$bi.ticket('full_ticket')
      .find(['count(id_ticket) total'],filter)
      .then(response => this.totalTickets = response.data[0].total);
  }


  $onInit() {
    this.current = 1;
    //Carga todos los tickets sin filtro inicial
    this.allTickets({tipo: 'II'},1);
    //Modelo
    this.model = new Object();
    //Tecnicos
    this.$bi.usuario('tecnicos')
      .all()
      .then(response => this.tecnicos = response.data);
    //SERVICIOS
    this.$bi.ticket()
      .find(['distinct servicio'])
      .then(response => this.servicios = this.$hummer.objectToArray(response.data));
    //CLIENTES
    this.$bi.cliente('cliente_completo').all().then(response => this.clientes = response.data);

    //Estados
    this.estados = [
      {
        value: 'N',
        display: 'Abierto',
        icon: 'error_outline'
      }, {
        value: 'P',
        display: 'En proceso',
        icon: 'loop'
      }, {
        value: 'V',
        display: 'Cierre pendiente',
        icon: 'phone_locked'
      }, {
        value: 'C',
        display: 'Cerrado',
        icon: 'remove_circle_outline'
      }
    ];


  }
}

export default
angular.module('nixApp.adminTicket', [uiRouter]).config(routes).component('adminTicket', {
  template: require('./adminTicket.pug'),
  controller: AdminTicketComponent
}).name;
