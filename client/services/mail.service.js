'use strict';

const angular = require('angular');
/*@ngInject*/

export function mailService() {

	function send () {


	}

	this.send = send
}

export default angular.module('nixApp.mail',[])
	.service()
	.name;