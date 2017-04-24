'use strict'
const angular = require('angular');
/*@ngInject*/

/*
		TIPOS DE HISTORIAL 

	1. Al cambiar la placa de seguridad = PS
	2. Al cambiar la placa de inventario = PI
	3. Al hacer una modificaciones en las especificaciones del activo  = ME
	4. Al realizar un ticket  = NT
	5. Al realizar una entrega = NE
	6. Al realizar un retiro = NR
	7. Al modificar el software (en el alistamiento) = NS
	8. Al realizar un asignamiento de contacto = AC

*/
export function hojaService($bi) {
	function trigger(fkActivo,tipo,key,texto=''){
		let arrVal = [
			key,
			tipo,
			texto,
			fecha
			hora
			fkActivo 

		]
		/*
			struct 
			[
				id_hoja_vida int primary key identity,
				_key varchar(20),
				tipo char(2),
				texto varchar(max) default null,
				fecha date default getdate(),
				hora time(0) default convert(time(0),getdate()),
				fk_id_activo int foreign key references activo (id_activo)
			]
		*/
		$bi.hoja.insert(arrVal);
	}
 	this.trigger = trigger;
}

export default
angular.module('nixApp.hoja', [])
  .service('$hoja', hojaService)
  .name;
