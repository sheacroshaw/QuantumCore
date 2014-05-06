'use strict';

angular.module('quantumRApp')
  .controller('ActivitiesCtrl', ['$scope','Appdata','WebServiceData',function ($scope,Appdata,WebServiceData) {
    
    // set up a blank activity 
    var activity = function(act){
    	this.Description = act.Description || null;
    	this.id = act.id || null;
    	this.from = this.to = this.notes = null;
        this.Cost_Code = act.Name || null;
    };


    // grab the data off the service
    $scope.activitiesList = WebServiceData.getWebServiceData().activities;
    $scope.activities = Appdata.getActivities();

    WebServiceData.getCodeObjFromDB();
    $scope.activitiesList = WebServiceData.getCodes().activities;

    // get the activities and merge them, if existing, 
    // with presets 
    var codesAndStandards = WebServiceData.getCodes();

    if( codesAndStandards.standardCodes 
        && codesAndStandards.standardCodes.activities
        && typeof codesAndStandards.standardCodes.activities === 'object') {

        $scope.activitiesList = $scope.activitiesList.concat(codesAndStandards.standardCodes.activities);
    }


    // push obj literal onto activities
    $scope.addCustomActivity = function(){
        $scope.activities.push({
            Description :  "",
            Start_Time : "",
            End_Time :  "",
            Hours :  0,
            Notes :  "",
            isCustom : true,
            Cost_Code : '' 
        });

        setLastAddedActivityFromTime ();

    }


    function setLastAddedActivityFromTime () {
        if ($scope.activities.length > 1){
            $scope.activities[$scope.activities.length - 1]
                .from = $scope.activities[$scope.activities.length - 2].to;
        }
    }



    $scope.addActivity = function(actToAdd){
    	
        var act = angular.fromJson(angular.toJson(actToAdd));

    	if ($scope.activities.length > 0) {
    		act.from = $scope.activities[$scope.activities.length -1 ].to;
    	}

    	$scope.activities.push(act);
        setLastAddedActivityFromTime ();
    };

    

    $scope.removeActivity = function(index) {
    	$scope.activities.splice(index,1)
    };

    

    $scope.setNext = function(index){

    	if ($scope.activities[index+1])
    		$scope.activities[index+1].from = $scope.activities[index].to;
    	
    };

    

    $scope.updateHours = function(index){
        
        var act = $scope.activities[index];
        var from = act && act.from;
        var to = act && act.to;

        if (!(typeof from === 'string' && typeof to === 'string')) {return}

        from = parseFloat(from.replace(/:/,'')) || 0;
        to = parseFloat(to.replace(/:/,''   )) || 0;


        if (from > to) {
            to += 1200;
        }

        act.hours = to - from;

        act.hours = adjustTimeToDecimal(act.hours);
    }

    function adjustTimeToDecimal (myTime) {
        var base = Number((myTime / 100).toFixed(0));
        var afterDec = (myTime / 100) - base;
        var convertBack = Math.round(afterDec * 100);
        var minsToPercentage = Number((convertBack / 60).toFixed(2));

        return base +  minsToPercentage;
    }


  }]);
