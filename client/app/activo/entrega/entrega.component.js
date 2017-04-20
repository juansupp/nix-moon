//Librerias a usar
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routes from './entrega.routes';

export class entregaComponent {
  /*@ngInject*/
  constructor($bi, $pop, $state, $cookieStore) {
    //Se declaran dependencias /*SERVICIOS*/
    this.$bi = $bi;
    this.$pop = $pop;
    this.$state = $state;
    this.$cookieStore = $cookieStore;
  }

  /* VARIABLES*/
  $onInit() {

  }
}

export default angular.module('nixApp.entrega', [uiRouter])
.config(routes).component('entrega', {
  template: require('./entrega.pug'),
  controller: entregaComponent
}).name;
