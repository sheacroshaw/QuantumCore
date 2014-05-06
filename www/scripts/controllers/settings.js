'use strict';

angular.module('quantumRApp')
  .controller('SettingsCtrl', ['$route','$scope','Appdata','WebServiceData',function ($route,$scope,Appdata,WebServiceData) {
    
    function cb (){};
    //Get Settings From Web Service
    $scope.setSettings = function(){        
        WebServiceData.setSet(WebServiceData.getSettingObjFromDB,{
            login_id : $scope.login_id
        });
        //WebServiceData.getSettingObjFromDB();
        //justGetItAll();
    };

    $scope.getSets = function(){
        webdb.getSettings(function(tx,rs){
          for (var i=0; i < rs.rows.length; i++) {
            //console.log(rs.rows.item(i));
            var q = document.getElementById('s');
            q.innerHTML = JSON.stringify(rs.rows.item(i));
          }
        });
    };


    // $scope.selected_employees = [];
    $scope.selectedDetails = WebServiceData.getDetail().ids;
    $scope.selectedDetailsNames = WebServiceData.getDetail().names;
    justGetItAll();

   function justGetItAll(){
        $scope.picklist = WebServiceData.getWebServiceData().picklist;
        $scope.rigs = WebServiceData.getWebServiceData().rigs;
        $scope.details = WebServiceData.getDetail();
   }
    
    $scope.$on('WEB_DATA_UPDATED', function(){
        justGetItAll();
        $scope.$apply();
    })


    $scope.saveShift = function(){
       

        WebServiceData.setDetails(
            {
                "ids" : $scope.selectedDetails.ids,
                "names" : $scope.selectedDetailsNames
            },
            respondToShiftSet
        );
        WebServiceData.getDetails();
        
    };


    function respondToShiftSet () {
        justGetItAll();
        $('#confirm-shift-saved').text('Shift details saved');
    }


    //this is the added stuff for the assets.
    $scope.assets = Appdata.getAssets().dailyAssets.slice(0);
    $scope.customAssets = Appdata.getAssets().customAssets;


    $scope.setAssets = function  () {

        console.log('assets called',$scope.assets,$scope.customAssets);
        WebServiceData.setAssets({
            "assets" : $scope.assets,
            "customAssets" : $scope.customAssets
        }, function(result){
            $('#confirm_asset_set').text('Assets Set');
        });
        Appdata.getData().assets.assets =  $scope.assets; 
    }



    $scope.checkit = function  () {
        WebServiceData.getAssets(function(tx,rs){
            if (rs.rows.length) {
                console.log('this is the details obj', JSON.parse(rs.rows.item(0).assets),$scope.assets,$scope.customAssets );
                $scope.assets = JSON.parse(rs.rows.item(0).assets).assets;
                $scope.customAssets = JSON.parse(rs.rows.item(0).assets).customAssets;

                var dbAssets = JSON.parse(rs.rows.item(0).assets).assets;
                var dbCustomAssets = JSON.parse(rs.rows.item(0).assets).customAssets;

                combineValues($scope.assets, dbAssets);
                combineValues($scope.customAssets, dbCustomAssets);

                var custs = [];
                for(var c in $scope.customAssets){
                    custs.push($scope.customAssets[c]['Equipment_Name']);
                }
                //console.log('the custs', custs)

                for(var c in custs){
                    for (var s in  $scope.assets){

                        //console.log(c, ' ==  ' ,$scope.assets[s]['Equipment_Name']);

                        if (custs[c] == $scope.assets[s]['Equipment_Name']) {
                            $scope.assets.splice($scope.assets.indexOf($scope.assets[s]),1);
                        }
                    }
                }

                if(!$scope.$$phase) {
                    $scope.$apply();
                }
            }
            else {
                console.log('nopeeeee')
            }
        });      
    }
    $scope.checkit();

    function combineValues(std, cust){
        if(typeof std !== 'object' || typeof cust !== 'object'){return;}

        var stdLength = Object.keys(std).length;
        var stdLengthIt;

        for (var c in cust){
            //Unit_Number  Equipment_Name  hours
            stdLengthIt = stdLength;
            while (stdLengthIt--){
                if (std[stdLengthIt]["Equipment_Name"] == cust[c]["Equipment_Name"]) {
                    std[stdLengthIt] == cust[c];
                }
            }

        }
    }//end combine values


    WebServiceData.getAssets(function(tx,rs){
        if (rs.rowsAffected) {
            console.log('this is what is comming back',rs.rows);
        }
        else {

        }
    });


    /***************************************************
    ** set up the login directive *********************/

    WebServiceData.getLogin(function(tx,rs){
      
        if (rs.rows.length) {
            $scope.login_email =  JSON.parse(rs.rows.item(0).login).login_email;
            $scope.login_id = JSON.parse(rs.rows.item(0).login).login_id;            
        }
        else {
            $scope.login_email = null;
            $scope.login_id = null;
        }

        if(!$scope.$$phase) {
            $scope.$apply()
        }
    })
    
    $scope.set_user_info = function(){
        WebServiceData.setLogin({
            login_id : $scope.login_id
        });
    };
    

  }]);