'use strict';

angular.module('quantumRApp')
  .directive('login', function () {
    return {
      templateUrl: './template/login.html',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {

        var email = element.find('#login_email');
        var pass = element.find('#login_id');
        
        email.on('blur',function(){
        	scope.set_user_info();
        });
        pass.on('blur',function(){
        	scope.set_user_info();
        });
      }
    };
  });
