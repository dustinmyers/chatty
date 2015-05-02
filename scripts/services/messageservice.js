'use strict';

angular.module('chattyApp')
  .factory('MessageService', function MessageService($http) {
    return {
    	getMessages: function() {
    		return $http({
    			method: "GET",
    			url: "http://localhost:8888",
    		});
    	},

    	addChat: function(chatObj) {
    		return $http({
    			method: "POST",
    			url: "http://localhost:8888",
    			data: chatObj
    		});
    	}
    };
  });
