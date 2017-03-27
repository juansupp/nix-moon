'use strict';
const angular = require('angular');
/*@ngInject*/
/*NXDATA = SERVICIO  PARA GUARDAR LOS TEMPLATES DE CADA SELECT O AUTO*/

export function nxDataService() {
	function constructNxData (table, value, display) {
		return {
			t : table,
			v: [value,display]
		}
	}
	this.rol = constructNxData('rol','id_rol','_rol');
}


export default angular.module('nixApp.nxData',[])
		.service('$nxData',nxDataService)
		.name;
