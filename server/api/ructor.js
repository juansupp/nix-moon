'use strict';

import sql from 'mssql';
import Promise from 'promise';
// Get list of connections

export default class ructor {

  constructor() {

  }
  con(sentence, open) {
    let config = {
      user: 'sa',
      password: 'A*96NIXZ1996',
      server: '170.117.20.7', // You can use 'localhost\\instance' to connect to named instance
      database: 'ivory_elph' // IVORY PRODUCTION
    }
    return new Promise(function(resolve, reject) {
      var connection = new sql.Connection(config, function(err) {
        var request = new sql.Request(connection);
        request.query(sentence, function(err, recordset) {
          connection.close();
          if (open)
            err ? reject({
              err: err
            }) : resolve({
              recordset: recordset
            });
          else
            err ? reject(err) : resolve(err);
        });
      });
    });
  }

  all() {
    let sentence = 'select * from ' + entity;
    console.log(sentence);
    return this.con(sentence, true);
  }

  findBy(entity, where, val) {
    let sentence = "  select " + val + " from  " + entity + " where " + where;
    console.dir(sentence);
    return this.con(sentence, true);
  }

  paginate (entity,where,val,page,numPerPage) {
    //select count(id_ticket)  from ticket
    //select * from ticket order by id_ticket offset 0 rows fetch next 10 Rows Only
    let 
      total = (page * numPerPage),
      sentence = 
          `select ${val} from ${entity} where ${where} 
          order by id_${entity} desc offset ${total} rows fetch next ${numPerPage} Rows Only`;
    console.log(sentence);
    return this.con(sentence,true);  
  }

  insert(entity, val) {
    let
      sentence =
      "insert into " + entity + " Output inserted.id_"+ entity +" values (" + val + ")"
    //console.dir(sentence);
    return this.con(sentence, true);
  }

  update(entity, val,where) {
    let sentence = 'update ' + entity +' set ' + val + ' where ' + where;
    //console.dir(sentence);
    return this.con(sentence, false);
  }

}



//Constructor de consulta
/*
function  con (sentence,open) {
  return new Promise(function(resolve,reject){
    var connection = new sql.Connection(config, function(err) {
        var request = new sql.Request(connection);
        request.query(sentence, function(err, recordset) {
             connection.close();
             if(open)
                err ? reject({err: err}) : resolve({recordset: recordset});
              else
                err ? reject(err): resolve(err);
        });
    });
  });
}


let entity = new Object();

export function inner (_entity) {
  entity = _entity;
}

export function all () {
  let sentence = 'select * from '+ entity ;
  return con(sentence,true);
}

export function findBy(where,val){
  let sentence  = "  select "+val+" from  " + entity + " where "+where;
  console.dir(sentence);
  return con(sentence,true);
}

export function insert(val){
  let sentence = "insert into "+ entity +" values ("+ val +")"
  console.dir(sentence);
  return con(sentence,false);
}

export function update(struct){
  let sentence = 'update '+ entity +' set ' + struct.val + ' where ' + struct.where  ;
  return con(sentence,false);
}
*/
