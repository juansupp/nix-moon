'use strict';
const angular = require('angular');
/*@ngInject*/
export function bifrostService($http, $hummer) {
  let
    url = '/api/astral',
    entity = '',
    methods = {
      find: find,
      insert: insert,
      all: all,
      update : update,
      paginate : paginate
    };
  /*ACTIONS*/
  function update (valObj,whereObj){
    let
      where = whereObj ? $hummer.objectToSentence(whereObj) : '1=1',
      val = $hummer.objectToSentence(valObj,','),
      dataObject = {
        where: where,
        val: val,
        entity: entity
      };
    return $http.put(url + '/', dataObject);
  }
  function find(valArray, whereObj) {
      let
        where = whereObj ? $hummer.objectToSentence(whereObj) : '1=1',
        val = $hummer.arrayToSentence(valArray),
        dataObject = {
          where: where,
          val: val,
          entity: entity
        };
      return $http.post(url + '/find', dataObject);
  }

  function paginate(whereObj,page,numPage,valArray = '*'){
    let
      where = whereObj ? $hummer.objectToSentence(whereObj) : '1=1',
      val = valArray ===  '*' ? valArray : $hummer.arrayToSentence(valArray),
      dataObject = {
        where: where,
        val: val,
        entity: entity,
        page : page,
        numb : numPage
      };
    return $http.post(url + '/pagination',dataObject)
  }

  function all(whereArray) {
      let
        where = whereArray ? $hummer.objectToSentence(whereArray) : '1=1';
      return $http.post(url + '/find', {
        where: where,
        entity: entity
      });
  }

  function insert(valArray) {
    let
      _val = $hummer.returnQuotes(valArray);
    return $http.post(url, {
      val: _val,
      entity: entity
    });
  }
  /*PRIVATE FUNCTIONS */



  /*PUBLIC FUNCTIONS */
  function especificacion (_entity ='especificacion'){
    entity = _entity;
    return methods;
  }
  function usuario(_entity = 'usuario') {
    entity = _entity
    return methods;
  }

  function cliente(_entity = 'cliente') {
    entity = _entity;
    return methods;
  }

  function activo(_entity='activo') {
    entity = _entity
    return methods;
  }

  function area(_entity ='area') {
    entity = _entity;
    return methods;
  }

  function ticket(_entity = 'ticket'){
    entity = _entity
    return methods;
  }

  function documentacion(_entity = 'documentacion'){
    entity = _entity;
    return methods;
  }

  function imagen (_entity='imagen'){
    entity = _entity;
    return methods;
  }

  function respuesta (_entity = 'respuesta') {
    entity = _entity;
    return methods;
  }

  function pregunta (_entity='pregunta'){
    entity =_entity;
    return methods;
  }
  function encuesta (_entity='encuesta') {
    entity = _entity;
    return methods;
  }

  this.encuesta = encuesta;
  this.respuesta = respuesta;
  this.pregunta = pregunta;
  this.imagen = imagen;
  this.documentacion = documentacion;
  this.ticket = ticket;
  this.area = area;
  this.usuario = usuario;
  this.cliente = cliente;
  this.activo = activo;
  this.especificacion = especificacion;
}

export default angular.module('nixApp.bifrost', [])
  .service('$bi', bifrostService)
  .name;
