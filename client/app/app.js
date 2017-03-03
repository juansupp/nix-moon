'use strict';
import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import uiRouter from 'angular-ui-router';
//MY IMPORTS
import ngMaterial from 'angular-material';
import ngMessages from 'angular-messages';
import ngLoading from 'angular-loading-bar';
import ngFileUpload from 'ng-file-upload';
import moment from  'moment';
import momentTimeZone from 'moment-timezone';
import es from 'moment/locale/es.js'
import ngMoment from 'angular-moment';
import ngPagination from 'angular-utils-pagination';
import mdDataTable from 'angular-material-data-table';
moment.locale('es');
//TRASH
import {
  routeConfig,
  runConfig
} from './app.config';
import constants from './app.constants';
import util from '../components/util/util.module';
//SERVICES
import bifrost from '../services/bifrost.service';
import pop from '../services/pop.service';
import dialog from '../services/dialog.service';
import hummer from '../services/hummer.service';
import select from '../services/select.service';
import timer from '../services/time.service';
import imagenix from '../services/image.service';
//COMPONENTS ROUTERS
import login from './login/login.component';
import menu from './menu/menu.component';
import master from './main/master/master.component';
import addUsuario from './usuario/addUsuario/addUsuario.component';
import addCliente from './cliente/addCliente/addCliente.component';
import addActivo from './activo/addActivo/addActivo.component';
import addTicket from './ticket/addticket/addTicket.component';
import adminTicket from './ticket/adminTicket/adminTicket.component';
import documTicket from './ticket/documTicket/documTicket.component';
import adminCliente from './cliente/adminCliente/adminCliente.component';
//Directives
import featuresList from '../directives/featuresList/featuresList.directive';
import activoList from '../directives/activoList/activoList.directive';
//STYLESHEETS
import './app.styl';
import '../../node_modules/angular-material/angular-material.min.css'
import '../../node_modules/angular-loading-bar/build/loading-bar.min.css'
//import '../../node_modules/angular-material-accordion/css/ang-accordion.css'
import '../../node_modules/angular-material-data-table/dist/md-data-table.min.css'

angular.module('nixApp', [
    ngCookies, ngResource, ngSanitize, uiRouter, constants, util, ngMaterial,
    ngMessages, ngLoading, ngFileUpload, ngMoment,ngPagination,mdDataTable, //==>EXTERNAL MODUELES
    bifrost, pop, dialog, hummer, select, timer,imagenix, //==> SERVICES
    login, menu, master, addUsuario, addCliente, addActivo, addTicket,
    adminTicket,documTicket,adminCliente, // ==> COMPONENTS
    featuresList,activoList // ==> DIRECTIVES
  ])
  .config(routeConfig)
  .run(runConfig);

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['nixApp'], {
      strictDi: true
    });
  });
