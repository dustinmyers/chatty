'use strict';

angular.module('chattyApp')
  
  .controller('MessageCtrl', function ($scope, MessageService) {
    $scope.messages = [];

    $scope.getMessages = function() {
    	MessageService.getMessages()
    		.then(function(response) {
    			$scope.messages = response.data;
    		});
    };
    $scope.getMessages();

    $scope.addChat = function(userName, chatText) {
    	MessageService.addChat(userName, chatText)
    		.then(function(res) {
    			console.log(res)
    			console.log(res.data);
    			$scope.messages = res.data;
    		});
    	$scope.chatText = '';
    };


  });