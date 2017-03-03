'use strict';

let
  express = require('express'),
  controller = require('./astral.controller'),
  router = express.Router();
/*var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();*/


router.get('/', controller.index);
router.post('/find', controller.find);
router.post('/', controller.insert);
router.put('/', controller.update);
router.post('/pagination', controller.pagination);
//router.post('/imagen', multipartyMiddleware ,controller.imagen);

module.exports = router;
