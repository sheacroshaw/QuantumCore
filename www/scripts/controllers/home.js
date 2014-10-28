'use strict';

angular.module('quantumRApp')
  .controller('HomeCtrl', ['$rootScope','$route','$location','$http','$scope','Appdata','WebServiceData',function ($rootScope,$route,$location,$http,$scope,Appdata,WebServiceData) {
    $scope.getRecords = true;
    $scope.records = [];
    

    var did = typeof device === 'undefined' ? "" : device.uuid || "";

    if($scope.getRecords){
    	$http.get('https://meta.layne.com/QuantumR/request_submits.php?id='+did)
    	.success(function(data){
    		$scope.records = data;
    		$scope.getRecords = false;
    	})
    	.error(function(err){
            $http.get('sim_data/lastten.html')
            .success(function(data){
                $scope.records = data;
                $scope.getRecords = false;
            });
        });
    }


    $scope.supervisorApprove = function (didid) { 
        console.log("running super admin");
       // var did = 23;

        $http.post(
                'https://meta.layne.com/QuantumR/send_to_client_upgrade.php', {Daily_Id: didid})
            .success(function(result){
               $scope.get_field_dailies_again();
                
            })
            .error(function(err){
                console.log("Failed");
                });
     }
   

     $scope.get_field_dailies_again = function () { 
        $http.get('https://meta.layne.com/QuantumR/request_submits.php?id='+did)
        .success(function(data){
            $scope.records = data;
            $scope.getRecords = false;
        })
        .error(function(err){
            $http.get('sim_data/lastten.html')
            .success(function(data){
                $scope.records = data;
                $scope.getRecords = false;
            });
        });
    }



    function Next(callbacks, action){
        var me = this;
        this.callbacks = callbacks || {};
        this.gotBack = function(key){
            me.callbacks[key] = true;  
            me.moveOn();
        }
        this.moveOn = function(){
            console.log('moveOn called ', me.callbacks)
            var move = true;
            for(var i in me.callbacks){
                if (!me.callbacks[i]){
                    move = false;
                    break;
                }
            }
            if (move){
                action();                
            }
        }
    };
    


    $scope.editDaily = function(index){
        console.log(JSON.parse($scope.records[index].JSON));

        var next = new Next({
                details : false,
                assets : false
            },
            function(){
                $location.path('/employees');
                if(!$scope.$$phase) $scope.$apply();
        });

        var daily = JSON.parse($scope.records[index].JSON);
        Appdata.setData(daily.data);
        Appdata.setIsEdit($scope.records[index].Id);
        WebServiceData.setDetails(daily.constants,function(){
           WebServiceData.getDetails();
           next.gotBack('details');
        });
        WebServiceData.setAssets({
            "assets" : daily.assets,
            "customAssets" : daily.customAssets
        }, function(result){
           next.gotBack('assets');
        });
    };

    $scope.deleteDaily = function(index){
        if (confirm('Permanitly Delete Daily?')){
            var Id = $scope.records[index].Id;
            $http.get('https://meta.layne.com/QuantumR/delete_main.php?id='+Id)
            .success(function(data){
                if (data){
                    console.log(data);
                    $route.reload();
                }
            })
            .error(function(e){
                console.log('nope did not make it', e)
            })
        }
        
    };//end deleteDaily

    $scope.resend = function  (index) {
        var Id = $scope.records[index].Id;
         $http.get('https://meta.layne.com/QuantumR/resend.php?id='+Id)
        .success(function(data){
            alert("Daily Resent");
            if (data){
                console.log("From the resend: ",data);
            }
        })
        .error(function(e){
            console.log('nope did not make it', e)
        })
    };//end resend

    $scope.partials = [];
    $scope.hasPartial = false;
    $scope.currentPartial = {};
    webdb.getLocals(function(tx,rs){
        if (rs.rows.length) {
            $scope.hasPartial = true;
            $scope.currentPartial = JSON.parse(rs.rows.item(0).locals);
            console.log('the webLocals', $scope.currentPartial)
        }
    });


    $scope.continuePartial = function(){
        
        var next = new Next({
                details : false,
                assets : false
            },
            function(){
                $location.path('/employees');
                if(!$scope.$$phase) $scope.$apply();
        });

        var daily = $scope.currentPartial;
        console.log('setit ',daily)
        Appdata.setData(daily.data);
        WebServiceData.setDetails(daily.constants,function(){
           WebServiceData.getDetailObjFromDB();
           next.gotBack('details');

        });
        WebServiceData.setAssets({
            "assets" : daily.assets,
            "customAssets" : daily.customAssets
        }, function(result){
           next.gotBack('assets');
        });       
    }


  }]);