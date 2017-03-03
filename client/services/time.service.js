'use strict';
const angular = require('angular');

/*@ngInject*/
export function timeService(moment) {

  function date (_date,format='YYYY[-]MM[-]D',dayMore=0){
    return moment(_date).add(dayMore,'day').format(format);
  }
  function time(_time,format='HH:mm:ss') {
    return moment.utc(_time).format(format);
  }

  this.date = date;
  this.time = time;
}

export default angular.module('nixApp.time', [])
  .service('$time', timeService)
  .name;
