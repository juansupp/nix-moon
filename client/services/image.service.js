'use strict'
const angular = require('angular')
/*@ngInject*/
export function imageService($bi,$q) {

  function save(imgArray, id_documentacion) {
    //Crea variable para agregar las promesas indefinidas
    let imgPromises = new Array();
    //Recorre el array de imagenes por parametro
    imgArray.forEach(img => {
      //Crea un nuevo lector de imagenes
      let reader = new FileReader();
      //Crea un evento al terminal de leer la imagen para de esta forma insertarla
      reader.addEventListener('loadend', () => {
        //Crea imagen encriptada base 64
        img = 'data:image/jpeg;base64,'+btoa(reader.result);
        //Hace un push por cada imagen dentro del array
        imgPromises.push($bi.imagen().insert([img, id_documentacion]));
      }, false);
      //Lee la imagen
      reader.readAsBinaryString(img);
    });
    //
    return $q.all(imgPromises);
  }

  function load(id_documentacion) {
    let defer =  $q.defer();
    $bi.imagen().all({fk_id_documentacion: id_documentacion})
      .then(images => {
        if(images.data.length >= 1)
          defer.resolve(images.data);
        else
          defer.resolve(false);
      });
    return defer.promise;
  }

  this.load = load;
  this.save = save;
}

export default angular.module('nixApp.image', []).service('$imagenix', imageService).name
