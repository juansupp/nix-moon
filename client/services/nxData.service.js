'use strict';
const angular = require('angular');
/*@ngInject*/
/*NXDATA = SERVICIO  PARA GUARDAR LOS TEMPLATES DE CADA SELECT O AUTO*/

export function nxDataService() {
	function constructNxData (table, value, display,where=false) {
		let data = {
			t: table,
			v : [value,display]
		}

		if(where) data['w'] = where
		return data;
	}
	this.rol = constructNxData('rol','id_rol','_rol');
	this.modelo = constructNxData('modelo','id_modelo','_modelo');
	this.marca = constructNxData('marca','id_marca','_marca');
	this.tipoActivo = constructNxData('tipo_activo','id_tipo_activo','_tipo_activo');
	this.servicio = constructNxData('servicio','id_servicio','_servicio');
	this.tecnico = constructNxData('full_usuario','id_usuario','_usuario',{_rol: 'Tech' });
	//this.tipoActivo = constructNxData('tipo_activo','id_tipo_activo','_tipo_activo');
}


export default angular.module('nixApp.nxData',[])
		.service('$nxData',nxDataService)
		.name;
