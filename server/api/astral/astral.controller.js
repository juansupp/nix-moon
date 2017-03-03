'use strict';
//const ructor = require('../ructor');
import ructor from '../ructor';
//let fs = require('fs')
let Ructor = new ructor;

export function index(req, res) {
  Ructor.all().then(response => res.json(response.recordset));
}

export function find(req, res) {
  let
    where = req.body.where,
    val = req.body.val ? req.body.val : '*',
    entity = req.body.entity;
  Ructor.findBy(entity, where, val)
    .then(response => res.json(response.recordset))
    .catch(err => console.log(err));
}

export function insert(req, res) {
  let val = req.body.val,
    entity = req.body.entity;
  Ructor.insert(entity,val).then(response => res.json(response.recordset));
}

export function update (req,res){
  let val = req.body.val,
    where = req.body.where,
    entity = req.body.entity;
  Ructor.update(entity,val,where).then(response => res.send(response))
}

export function pagination (req,res){
  /*Pagina y tabla */
  let
    where = req.body.where,
    val = req.body.val,
    entity = req.body.entity,
    page = req.body.page,
    numPerPage = req.body.numb;
  Ructor.paginate(entity, where, val,page,numPerPage)
    .then(response => res.json(response.recordset))
    .catch(err => console.log(err));

}
/*export function imagen (req,res){
  console.dir(req.files.file);
  //fs.writeFile('C:\Users\ivory\Pictures\dus'+req.files.file.name)
}*/
