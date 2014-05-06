'use strict';

angular.module('quantumRApp')
  .controller('EmployeesCtrl', ['$scope','Appdata','WebServiceData',function ($scope,Appdata,WebServiceData) {
    
  	$scope.selected_employees = [];
   	
    $scope.details = WebServiceData.getDetail();
    $scope.employeeList = WebServiceData.getWebServiceData().employees;
   	
   	$scope.$on('WEB_DATA_UPDATED', function(){
      $scope.details = WebServiceData.getDetail();
      $scope.employeeList = WebServiceData.getWebServiceData().employees;
      $scope.$apply();
   	})
    
    //init the data from the service, if any
   	$scope.selected_employees = Appdata.getShift().employees;
    $scope.safety = Appdata.getShift().safety;
    $scope.details = WebServiceData.getDetail();
    

   	$scope.addEmployee = function(emp){
      emp.perdiem = null;
      emp.hours = null;
      emp.travel = null;
   		$scope.selected_employees.push(emp);
   	}


   	$scope.removeEmp = function(index) {
   		$scope.selected_employees.splice(index,1);
   	}


    /***************************************************
    set up the date stuff *****************************/
      if(!$scope.details.names.date) {
        $scope.details.names.date = new Date();
      }
  
      $scope.showWeeks = false;
      $scope.toggleWeeks = function () {
        $scope.showWeeks = ! $scope.showWeeks;
      };


      $scope.clear = function () {
       $scope.details.names.date = null;
      };


      $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
      };

      $scope.dateOptions = {
        'year-format': "'yy'",
        'starting-day': 1
      };

      $scope.formats = ['yyyy-MM-dd', 'yyyy/MM/dd', 'shortDate'];
      $scope.format = $scope.formats[0];
      
  }]);
