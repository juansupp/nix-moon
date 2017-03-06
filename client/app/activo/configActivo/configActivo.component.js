'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-route');


import route from './configActivo.route'

/*

SQL

create table tipo_activo (
  id_tipo_activo int primary key identity,
  nombre_tipo_activo varchar(150),
  descripcion varchar(max)
)

go

create table esp (
  id_esp int primary key identity,
  _esp varchar(100),
  fk_id_tipo_activo int foreign key references tipo_activo (id_tipo_activo)
)

go

create  table esp_valor (
  id_esp_valor int primary key identity,
  _esp_valor varchar(200),
  fk_id_esp int foreign key references esp (id_esp)
)


------.VIEW .___ GRID DE VISTA

create view full_tipo_activo
as
select * from tipo_activo
inner  join esp on esp.fk_id_tipo_activo = tipo_activo.id_tipo_activo
inner join esp_valor on esp_valor.fk_id_esp = esp.id_esp


 */

export class configActivoComponent {
  /*@ngInject*/
  constructor($bi) {
    this.$bi = $bi;
  }


  insertTipo(tipo,descripcion){
    let arrVal = [tipo,descripcion];
    return this.$bi.tipoActivo().insert(arrVal)
  }

  insertEsp(idTipoActivo,esp){
    let arrVal = [esp,idTipoActivo];
    return this.$bi.esp().insert(arrVal)
  }

  insertEspValor(idEsp,valor){
    let arrVal = [valor,idEsp];
    return this.$bi.espValor().insert(arrVal)
  }

  // all-one by update
  loadTipoActivoOnce(where){
    return this.$bi.tipo_activo().find(where);
  }
  loadTipoActivoAll(where){
    return this.$bi.tipo_activo().all(where);
  }

  $onInit(){
    this.model = new Object();
  }
}

export default angular
  .module('nixApp.configActivo', [])
  .config(route)
  .component('configActivo', {
    template: require('./configActivo.pug'),
    controller: configActivoComponent
  })
  .name;
