'use strict';

angular.module('quantumRApp')
  .controller('ReviewCtrl', ['$location', '$timeout', '$route','$http','$scope','Appdata','WebServiceData',function ($location,$timeout,$route,$http,$scope,Appdata,WebServiceData) {
    
    $scope.appData = Appdata.getData();
    $scope.daily = angular.toJson(Appdata.getData(), true);

    $scope.assets = Appdata.getAssets().assets;
    $scope.customAssets = Appdata.getAssets().customAssets;






    var asset = function(){
        this.name = null;
        this.unit = null;
        this.Hours = null;
        this.Rental = 0;
        this.Unit_Number = null;
    };

    // $scope.assets = Appdata.getAssets().assets;
    // $scope.customAssets = Appdata.getAssets().customAssets;
   
    $scope.addCustomAsset = function () {
        $scope.customAssets.push(new asset());
    };
 



$scope.checkit = function  () {
        WebServiceData.getAssets(function(tx,rs){

            if (rs.rows.length) {

               var dbAssets = JSON.parse(rs.rows.item(0).assets).assets;
               var dbCustomAssets = JSON.parse(rs.rows.item(0).assets).customAssets;

            console.log('INITIALLY', dbAssets, dbCustomAssets )

                combineValues(  $scope.assets,dbAssets);
                combineValues( $scope.customAssets, dbCustomAssets );

                var custs = [];
                for(var c in $scope.customAssets){
                    custs.push($scope.customAssets[c]['Equipment_Name']);
                }
                console.log('the custs', custs)

                for(var c in custs){
                    for (var s in  $scope.assets){

                        console.log(c, ' ==  ' ,$scope.assets[s]['Equipment_Name']);

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


 function combineValues (daily,settings) {
        for (var s in settings){
            var found = false;
            for (var d in daily ){
                if (settings[s]['Equipment_Name'] == daily[d]['Equipment_Name']){
                    found = true;
                    daily[d]['Unit_Number'] = settings[s]['Unit_Number'];
                    daily[d]['Rental'] = settings[s]['Rental'];
                }
            }
            if(!found){
                daily.push(settings[s])
            } 
        }
    }

























    $scope.assembledReview = {};
    //console.log('call it')

    function justGetItAll(){
        $scope.picklist = WebServiceData.getWebServiceData().picklist;
        $scope.rigs = WebServiceData.getWebServiceData().rigs;
        $scope.details = WebServiceData.getDetail();
  

   }
   justGetItAll();
  
    $scope.$on('WEB_DATA_UPDATED', function(){

        justGetItAll();
        $scope.$apply();
        
    })

console.log("Assembled: ", $scope.details);  

    var updatedAssets = Appdata.getData().assets;
    //console.log('these are the assets', updatedAssets)

    try{
        var customAssetsLength = 0;
        if(updatedAssets.customAssets && updatedAssets.customAssets.length){
            customAssetsLength = updatedAssets.customAssets.length;
            //updatedAssets.assets.concat();
            while(customAssetsLength--){
                if (updatedAssets.assets.indexOf(updatedAssets.customAssets[customAssetsLength]) === -1) {
                    updatedAssets.assets.push(updatedAssets.customAssets[customAssetsLength]);
                }
                
            }
        }
        

        $scope.assembledReview = prepDataToSend(updatedAssets.assets, updatedAssets.customAssets);
    }
    catch(e){
        console.log(e.message, "failed to prep data");
    }
    





    function prepDataToSend (assets, customAssets) {
        console.log("Why here?");
        var constants = WebServiceData.getDetail()
        var data = Appdata.getData();
        var currDate = new Date()
        var date = currDate.getFullYear() + "-" + (currDate.getMonth() + 1) + "-" + currDate.getDate();
        var dfrom = 0, dto = 0, hole = '', hangle = 0, hsize = 0;

        var resolvedDate = null;
        if($scope.details && $scope.details.names && $scope.details.names.date) {
            resolvedDate = $scope.details.names.date;
        } 

        if(data.hole.information[0]){
          dfrom = data.hole.information[0].startingDepth || 0;
          dto = data.hole.information[0].endingDepth || 0;
          hole = data.hole.information[0].number || "";

          hangle = data.hole.information[0].angleDegree || 0;
          hsize = data.hole.information[0].size || 0;
        }          
    

        var did = typeof device === 'undefined' ? "" : device.uuid || "";

        var client_notes = data.notes.client_notes ? data.notes.client_notes : " "; // replace(/'/g,'').replace(/"/g,'') || "",
        var internal_notes = data.notes.internal_notes ? data.notes.internal_notes : " "; //.replace(/'/g,'').replace(/"/g,'') || "",

        var Field_Main = {
           Responsible_Account : WebServiceData.getWebServiceData().office || "No Office Set",
           Device_UUID : did,
           Log_Number : 12345,
           date : resolvedDate || date,
           Resolved_Date: resolvedDate,
           Scope_Date: $scope.details.names.date,
           Crew_Shift : constants.names.selectedShiftName || "",
           Rig : $scope.details.names.selectedRigName || "",
           Incident : data.shift.safety.incident ? 1 : 0,
           Incident_Description : data.shift.safety.incident_description,
           Job : constants.names.selectedJobName || "",
           Location : constants.names.selectedLocationName || "",
           Client : constants.names.selectedClientName || "",
           client_notes : client_notes.replace(/"/g,'') || "",
           internal_notes : internal_notes.replace(/'/g,'').replace(/"/g,'') || "",

           Depth_From : dfrom,
           Depth_To : dto,
           Hole_Number : hole,
           Hole_Size : hsize,
           Hole_Degrees : hangle,
           Hole_Angle : hangle,

           JSON : JSON.stringify({ 
                    data : Appdata.getData(),
                    constants : WebServiceData.getDetail(),
                    assets : assets,
                    customAssets : customAssets
                  })
        };


        var actLength = data.activities.length;
        var Field_Activity = [];
        var tmpActivity;
        while (actLength--) {

            var Notes = data.activities[actLength].notes ? data.activities[actLength].notes : " ";// .replace(/'/g,'').replace(/"/g,'') || "";

            tmpActivity = {
                Description : data.activities[actLength].Description || "" , 
                Start_Time : data.activities[actLength].from || "", 
                End_Time : data.activities[actLength].to || "", 
                Hours : data.activities[actLength].hours || 0, 
                Notes : Notes.replace(/'/g,'').replace(/"/g,'') || "",
                Cost_Code : data.activities[actLength].Cost_Code || "" 
            }
            Field_Activity.unshift(tmpActivity);
        }

        var bitLength = data.hole.bit.length;
        var Field_Bit = [];
        var tmpBit;
        while (bitLength--){
            tmpBit = {
                Depth_From : data.hole.bit[bitLength].from || 0,
                Depth_To : data.hole.bit[bitLength].to || 0,
                Description : data.hole.bit[bitLength].description || "",
                Type : data.hole.bit[bitLength].type || "",
                Size : data.hole.bit[bitLength].size || "",
                Serial_Number : data.hole.bit[bitLength].serial || ""
            }
            Field_Bit.push(tmpBit);
        }


        var holeLength = data.hole.information.length;
        var Field_Hole = [];
        var tmpHole;
        while(holeLength--){
          tmpHole = {
            Angle : data.hole.information[holeLength].angle || 0,
            Number : data.hole.information[holeLength].number || 0,
            Size : data.hole.information[holeLength].size || 0,
            Depth_From : data.hole.information[holeLength].startingDepth || 0,
            Depth_To : data.hole.information[holeLength].endingDepth || 0,
            Runs : data.hole.information[holeLength].runs || 0,
            Total_Depth : data.hole.information[holeLength].totalDepth || 0
          }
          Field_Hole.push(tmpHole);
        }

        var empLength = data.shift.employees.length;
        var Field_Employee = [];
        var tmpEmployee;
        while(empLength--){
            tmpEmployee = {
                Name : data.shift.employees[empLength].Name.replace(/'/g,'').replace(/"/g,'') || "", 
                Hours :  data.shift.employees[empLength].hours || 0, 
                Per_Diem : data.shift.employees[empLength].perdiem || 0, 
                Employee_Id : data.shift.employees[empLength].Id || "",
                Travel_Hours : data.shift.employees[empLength].travel || 0
            }
            
            tmpEmployee.Is_Driller = empLength;
            
            Field_Employee.unshift(tmpEmployee);
        }

        var consumablesLength = data.consumables.length;
        var Field_Consumables = [];
        var tmpConsumable;
        while(consumablesLength--){
            tmpConsumable = {
                Consumable : data.consumables[consumablesLength].Description.replace(/'/g,'').replace(/"/g,'') || "",
                Units : data.consumables[consumablesLength].qty || 0,
                Cost_Code : data.consumables[consumablesLength].Cost_Code || ""
            }
            Field_Consumables.unshift(tmpConsumable);
        }

        var Field_Fuel = [];
        Field_Fuel.push({
            Description : "Diesel (Red)",
            Qty : data.assets.fuel.redDiesel.qty || 0,
            Price :data.assets.fuel.redDiesel.price || 0,
            Vendor : data.assets.fuel.redDiesel.vendor || ""
        },{
            Description : "Diesel (Clear)",
            Qty : data.assets.fuel.clearDiesel.qty || 0,
            Price :data.assets.fuel.clearDiesel.price || 0,
            Vendor : data.assets.fuel.clearDiesel.vendor || ""
        },{
            Description : "Unleaded",
            Qty : data.assets.fuel.unleaded.qty || 0,
            Price :data.assets.fuel.unleaded.price || 0,
            Vendor : data.assets.fuel.unleaded.vendor || ""
        });

        var waterLength = data.assets.water.length;
        var Field_Water = [];
        var tmpWater;
        while(waterLength--){
            tmpWater = {
                Number_Loads : data.assets.water[waterLength].loads || 0,
                Tank_Size : data.assets.water[waterLength].tankSize || 0
            }
            Field_Water.push(tmpWater);
        }
        //[Total_Qty], [Number_Loads], [Tank_Size]

        var assetsToSend = [], show;
        for (var a in assets){
            show = (assets[a].Unit_Number)
            if (show){
                if (assets[a].Rental) {
                    assets[a].Rental = 1;
                } 
                else {
                    assets[a].Rental = 0;
                }
                 if (assets[a].hours) {
                    //assets[a].hours = 1;
                } 
                else {
                    assets[a].hours = 0;
                }
                assetsToSend.push(assets[a]);
            }
        }

        return {
            "Field_Main" : Field_Main,
            "Field_Activity" : Field_Activity,
            "Field_Bit" : Field_Bit,
            "Field_Equipment" : assetsToSend,
            "Field_Employee" : Field_Employee,
            "Field_Consumables" : Field_Consumables,
            "Field_Fuel" : Field_Fuel,
            "Field_Water" : Field_Water,
            "Field_Hole" : Field_Hole,
            "isEdit" : Appdata.isEdit()

        };
    }//end prepDataToSend
//


    function clearPartials () {
        webdb.clearLocals(function(){});
    }
    

    /* this is ulgy right now, there needs to be a better way 
    to handle async getting of the assets before sticking them
    on the obj on the way out */
    $scope.sendFinal = function(){


        if (!$scope.details.names.selectedRigName) { 
           alert("No Rig: Please set in settings");
        } else { 
            
        


        //$('#sending').show();
        $('#sendfinal').removeClass('btn-success').addClass('btn-warning').text('Sending');

        try {
            $http.post(
                'https://meta.layne.com/QuantumR/recieve_daily.php',
                prepDataToSend(updatedAssets.assets || [], updatedAssets.customAssets || []))
            .success(function(result){
               console.log('i sent',prepDataToSend(updatedAssets.assets || [], updatedAssets.customAssets || []),result);
                alert("Daily Sent");
                 $('#sendfinal').removeClass('btn-warning').addClass('btn-success').text('Daily Sent');
                 $scope.details.names.date = new Date();
                 resetSaveButton();
                 Appdata.setNotEdit();
                 Appdata.resetData();
                 clearPartials();
                 $location.path('/home');
                
            })
            .error(function(err){
                console.log('cant send it',prepDataToSend(updatedAssets.assets || [], updatedAssets.customAssets || []),{
                    "data"          : Appdata.getData(),
                    "constants"     : WebServiceData.getDetail(),
                    "assets"        : assets,
                    "customAssets"  : customAssets
                });
                alert('Daily Failed To Send');
                //$('#sending').hide();
                $('#sendfinal').removeClass('btn-success').addClass('btn-danger').text('Daily Not Sent');
                resetSaveButton()
            });
        }
        catch (e){
            $('#sendfinal').removeClass('btn-success').addClass('btn-danger').text('Daily Not Sent');
            resetSaveButton()
        }

        } // end if the rig is not set. 

    };//end sendFinal 

    function resetSaveButton() {
        $timeout(function() {
            $('#sendfinal')
                .removeClass('btn-danger')
                .removeClass('btn-success')
                .removeClass('btn-warning')                
                .addClass('btn-success')
                .text('Send Daily');
        }, 4000);
    }


//alert($scope.assembledReview.Field_Main);


  }]);
