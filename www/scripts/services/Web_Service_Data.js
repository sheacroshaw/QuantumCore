'use strict';

angular.module('quantumRApp')
  .service('WebServiceData', ['$http','$rootScope','$timeout', function WebServiceData($http,$rootScope,$timeout) {
    var webData = {};
    var shiftDetails = {"ids":{},"names":{}};
    var currentCodes = {};


    function getSettingObjFromDB(){
        webdb.getSettings(function(tx,rs){
            if (rs.rows.length) {
                webData = JSON.parse(rs.rows.item(0).settings);
                $rootScope.$broadcast('WEB_DATA_UPDATED');
                console.log("did the WEB DATA UPDATED Happen?", webData);
            }
        });
    }
    //try to initially get the settings out of the db
    getSettingObjFromDB();

    function getDetailObjFromDB(){
        webdb.getDetail(function(tx,rs){
            if (rs.rows.length) {
                //console.log('this is the details obj', JSON.parse(rs.rows.item(0).shift_detail));
                shiftDetails.ids = JSON.parse(rs.rows.item(0).shift_detail).ids;
                shiftDetails.names = JSON.parse(rs.rows.item(0).shift_detail).names;
                shiftDetails.names.date = "";
                $rootScope.$broadcast('WEB_DATA_UPDATED');
                console.log("is it this one?");
            }
        });
    }
    //try to initially get the settings out of the db
    getDetailObjFromDB();

    function getCodeObjFromDB(){
        
        if (shiftDetails.ids.selectedContract && webData.codes[shiftDetails.ids.selectedContract]){
            currentCodes = webData.codes[shiftDetails.ids.selectedContract];
            currentCodes.standardCodes = webData.stdCodes;

            console.log('da codes', webData.codes[shiftDetails.ids.selectedContract]);



        }
        else {
            console.log("here is the else");
            currentCodes = {
                "activities" : [],
                "consumables" : [],
                "standardCodes" : webData.stdCodes && webData.stdCodes || []
            }
        }

    }
    //try to initially get the settings out of the db
    getCodeObjFromDB();


    //so.. makes a call to the webdb module to clear put the 
    //settings and passes to it a callback that will get the 
    //new settings from the web which it self has a callback 
    //that sets the settings in the DB which itself has a 
    //callback that can be passed in from outside to be run 
    //after the insert statement of the new settings is 
    //run successfuly 
    function setSet(cb, passToServer){
        webdb.clearSettings(getSettingObjFromWeb(webdb.setSettings,cb,passToServer));
        
    }
    function setDetails(setObj,cb){
        webdb.clearDetail();
        webdb.setShiftDetails(setObj,cb);
    }
    function getDetails() {
        webdb.getDetail(function(tx,rs){
            if (rs.rows.length) {
                //shiftDetails.ids = JSON.parse(rs.rows.item(0).shift_detail);
                shiftDetails.ids = JSON.parse(rs.rows.item(0).shift_detail).ids;
                shiftDetails.names = JSON.parse(rs.rows.item(0).shift_detail).names;
                //$rootScope.$broadcast('WEB_DATA_UPDATED');
                $rootScope.$apply()
            }
        });
    }


    //for now the callback's context is bound to the webdb 
    //obj that it attached to the root scope and addargs may
    //be passed in to serve as a callback from the insert fn
    function getSettingObjFromWeb(cb, addargs, passToServer){
        console.log(cb, addargs, passToServer, "this is the sent to server call")
        $http.post('https://meta.layne.com/QuantumR/request_settings.php',(passToServer || {}))
        .success(function (result) {
            $('#passfail').text('Success getting settings from web service')
            cb.call(webdb,result,addargs);
        })
        .error(function(){            
             $http.get('sim_data/web.html',{})
             .success(function  (result) {
                $('#passfail').text('Failed to get internet resourse, used simulated data fallback');
                cb.call(webdb,result,addargs);
             })
        });
    }//end getSettingObjFromWeb

    function getAssets (callback) {
        webdb.getAssets(callback);
    }

    function setAssets (obj, callback) {

        if (!callback){
            var callback = function(){console.log('no callback sent')};  
        }
        webdb.clearAssets(function(){
            webdb.setAssets(obj,callback);
        });
    }

    function setLogin(obj, cb){
        webdb.clearLogin(function(){
            webdb.setLogin(obj, cb);
        });
    }

    function getLogin (cb) {
        webdb.getLogin(cb);
    }


    return {
        getWebServiceData : function  () {
            return webData;
        },
        getDetail : function(){
            return shiftDetails;
        },
        getCodes : function(){
            return currentCodes;
        },
        getSettingObjFromDB : getSettingObjFromDB,
        setSet : setSet,
        setDetails : setDetails,
        getDetails : getDetails,
        getCodeObjFromDB: getCodeObjFromDB,
        getAssets : getAssets,
        setAssets : setAssets,
        getLogin : getLogin,
        setLogin: setLogin
    }

  }]);