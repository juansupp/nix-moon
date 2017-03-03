//Librerias a usar
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routes from './login.routes';

export class LoginComponent {
  /*@ngInject*/
  constructor($bi, $pop, $state, $cookieStore) {
    //Se declaran dependencias /*SERVICIOS*/
    this.$bi = $bi;
    this.$pop = $pop;
    this.$state = $state;
    this.$cookieStore = $cookieStore;
  }
  /*FUNCTIONS */
  login() { // => Funcion login donde valida si las credenciales son validas
    //Variable donde se construye el array de where's
    let whereArray = {
      correo: this.model.correo,
      pass: this.model.pass
    }
    //Se hace la consulta a la base de datos
    this.$bi.usuario().all(whereArray).then(response => {
      //Se guarda el tamaño del data segun response
      let data = response.data
      //En caso que el tamaño del data sea mayor a uno
      if (!data.length)
        this.$pop.show(`Credenciales incorrectas`)
      else {
        this.$cookieStore.put('user', data[0]);
        this.$state.go(`m.${data[0].rol}`)
      }

    });
  }
  /* VARIABLES*/
  $onInit() {
    let userData = this.$cookieStore.get('user');
    if (userData)
      this.$state.go(`m.${userData.rol}`)
    this.model = new Object();
  }
}

export default angular.module('nixApp.login', [uiRouter]).config(routes).component('login', {
  template: require('./login.pug'),
  controller: LoginComponent
}).name;
