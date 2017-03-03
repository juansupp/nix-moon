'use strict';

import angular from 'angular';

export default angular.module('nixApp.constants', [])
  .constant('appConfig', require('../../server/config/environment/shared'))
  .constant('moment',require('moment-timezone'))
  .name;
