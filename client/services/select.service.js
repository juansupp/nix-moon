'use strict'
const angular = require('angular');

/*@ngInject*/
export function selectService() {

  function createFilterFor(query) {
    return function filterFn(item) {
      return (item.indexOf(query) === 0);
    };
  }

  function createFilterForFull(query,display) {
    return function filterFn(item) {
      return (item[display].indexOf(query) === 0);
    };
  }

  function search(query, _list) {

    let
      lastList = _list ? _list : this.list,
      results = query ? lastList.filter(createFilterFor(query)) : lastList,
      deferred;
    return results;
  }

  function searchFull(query, _list,display) {
    let
      lastList = _list ? _list : this.list,
      results = query ? lastList.filter(createFilterForFull(query,display)) : lastList,
      deferred;
    return results;

  }

  this.search = search;
  this.searchFull = searchFull;
  this.list = new Object();

}

export default angular.module('nixApp.select', [])
  .service('$select', selectService)
  .name;
