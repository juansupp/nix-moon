'use strict';
const angular = require('angular');
/*@ngInject*/
export function hummerService() {
  // AngularJS will instantiate a singleton by calling "new" on this function
  function objectToSentence(theObject, signa = 'and',equals='=') {
    let
      //Se define la variable sentence en donde se concatenara el objecot final
      sentence='',
      //Cuanta cantidad de caracteres se deben restar al terminar la cadena
      lengthSigna = (signa.length * -1);
    //Loop que recorre el objecto para podder concatenarlo
    for (let key in theObject) {
      let
        //se instancia el valor para reducir codigo
        value =  `${theObject[key].toString()}`,
        //equals temporal dentro del for por cada item del objeto
        _equals = equals,
        //signa temporal dentro del for por cada item del objeto        
        _signa = signa;
      //En caso que dentro del value haya un and se toma como fecha
      if(value.indexOf("and") !== -1) _equals = 'between'
      //En caso que dentro del value haya un % se tomo con una sentencia like
      else if(value.indexOf("%") !== -1) { 
        _equals = 'like';
        _signa = 'or';
      }
      //De lo contrario se agregan las comillas simples para leerlo como varchar
      else value = `'${value}'`
      //Se concatena finalmente la sentencia
      sentence += ` ${key} ${_equals} ${value} ${_signa}`;
    }
    //Se elimina el signa de mas que esta al final
    sentence = sentence.slice(0,lengthSigna);
    return sentence;
  }
  //
  function returnQuotes(array) {
    let sentence = '';
    for (var i = 0; i < array.length; i++) {
      if (!(array.length == i + 1))
        sentence += " '" + array[i] + "',";
      else
        sentence += " '" + array[i] + "'";
      }
    return sentence;
  }

  function arrayToSentence(array) {
    let sentence = '';
    for (var i = 0; i < array.length; i++) {
      if (!(array.length == i + 1))
        sentence += " " + array[i] + ",";
      else
        sentence += " " + array[i] + "";
      }
    return sentence;
  }

  function objectToArray(arrayObject) {
    let arrary = [];
    for (var i = 0; i < arrayObject.length; i++)
      arrary.push(Object.values(arrayObject[i]).toString());
    return arrary;
  }
  //frm = Objecto de formulario
  function castFormToModel(frm) {
    //Se declara objecto en donde se guardará cada modelo de cada input
    let castObject = new Object();
    //Bucle para recorrer cada item del objeto
    for (let item in frm)
      //En caso que el key del item empiece con $ se sabe que es propio del formulario
      if (!(item.startsWith('$')))
        //Se pasa al castObject los nuevos valores del modelo
        castObject[item] = frm[item].$modelValue;
    //se retorna el objeto con los modelos
    return castObject;
  }

  function evaluateRepetition(list, value, key) {
    let repeat = false;
    list.forEach(item => {
      if (item[key] === value)
        repeat = true
    });
    return repeat;
  }

  this.evaluateRepetition = evaluateRepetition;
  this.castFormToModel = castFormToModel;
  this.objectToArray = objectToArray;
  this.arrayToSentence = arrayToSentence;
  this.returnQuotes = returnQuotes;
  this.objectToSentence = objectToSentence;
}

export default angular.module('nixApp.hummer', []).service('$hummer', hummerService).name;
