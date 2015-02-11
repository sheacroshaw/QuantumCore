'use strict';

angular.module('quantumRApp')
  .service('Appdata', function Appdata() {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var data = {
    	"home" : {},
    	"preShift" : {},
    	"shift" : {
            "employees":[],
            "details": {
                "rig": {},
                "shift": "",
                "client": {},
                "job": {},
                "location": {},
                "date": "",
                "site": ""
            },
            "safety": {
                "incident": false,
                "incident_description": ""
            }
        },
    	"hole" : {
            "information": [],
            "bit" : []
        },
    	"activities" : [],
    	"consumables" : [],
        "maintLilst" : [],
    	"assets" : {
            "assets": [
                {"id":1, "Rental":null, "Equipment_Name": "Welder","Unit_Number":null, "hours":null },
                {"id":2, "Rental":null, "Equipment_Name": "Light Plant","Unit_Number":null, "hours":null },
                {"id":3, "Rental":null, "Equipment_Name": "Crew Pickup","Unit_Number":null, "hours":null },
                {"id":4, "Rental":null, "Equipment_Name": "Aux Water Pump","Unit_Number":null, "hours":null },
                {"id":5, "Rental":null, "Equipment_Name": "Booster","Unit_Number":null, "hours":null },
                {"id":6, "Rental":null, "Equipment_Name": "Flatbed Truck","Unit_Number":null, "hours":null },
                {"id":7, "Rental":null, "Equipment_Name": "AUX Mud Pump","Unit_Number":null, "hours":null },
                {"id":8, "Rental":null, "Equipment_Name": "Water Truck","Unit_Number":null, "hours":null },
                {"id":9, "Rental":null, "Equipment_Name": "Drill Rig","Unit_Number":null, "hours":null },
                {"id":10, "Rental":null, "Equipment_Name": "Backhoe","Unit_Number":null, "hours":null },
                {"id":11, "Rental":null, "Equipment_Name": "Forklift","Unit_Number":null, "hours":null },
                {"id":12, "Rental":null, "Equipment_Name": "Camera","Unit_Number":null, "hours":null }

            ],
            "dailyAssets": [
                {"id":1, "Rental":null, "Equipment_Name": "Welder","Unit_Number":null, "hours":null },
                {"id":2, "Rental":null, "Equipment_Name": "Light Plant","Unit_Number":null, "hours":null },
                {"id":3, "Rental":null, "Equipment_Name": "Crew Pickup","Unit_Number":null, "hours":null },
                {"id":4, "Rental":null, "Equipment_Name": "Aux Water Pump","Unit_Number":null, "hours":null },
                {"id":5, "Rental":null, "Equipment_Name": "Booster","Unit_Number":null, "hours":null },
                {"id":6, "Rental":null, "Equipment_Name": "Flatbed Truck","Unit_Number":null, "hours":null },
                {"id":7, "Rental":null, "Equipment_Name": "AUX Mud Pump","Unit_Number":null, "hours":null },
                {"id":8, "Rental":null, "Equipment_Name": "Water Truck","Unit_Number":null, "hours":null },
                {"id":9, "Rental":null, "Equipment_Name": "Drill Rig","Unit_Number":null, "hours":null },
                {"id":10, "Rental":null, "Equipment_Name": "Backhoe","Unit_Number":null, "hours":null },
                {"id":11, "Rental":null, "Equipment_Name": "Forklift","Unit_Number":null, "hours":null },
                {"id":12, "Rental":null, "Equipment_Name": "Camera","Unit_Number":null, "hours":null }

            ],
            "customAssets": [
                {}
            ],
            "fuel": {
                "redDiesel": {
                    "description": "Diesel (Red)",
                    "qty": null,
                    "price": null,
                    "vendor": null
                },
                "clearDiesel": {
                    "description": "Diesel (Clear)",
                    "qty": null,
                    "price": null,
                    "vendor": null
                },
                "unleaded": {
                    "description": "Unleaded",
                    "qty": null,
                    "price": null,
                    "vendor": null
                }
            },
            "water": []
        },
    	"notes" : {
            "internal_notes":null,
            "client_notes":null
        },
    	"review" : {},
    	"settings" : {},
        "isEdit" : false,
        "login" : {
            "login_email" : null,
            "login_id" : null
        }

    };


    var stdData = {
        "home" : {},
        "preShift" : {},
        "shift" : {
            "employees":[],
            "details": {
                "rig": {},
                "shift": "",
                "client": {},
                "job": {},
                "location": {},
                "date": "",
                "site": ""
            },
            "safety": {
                "incident": false,
                "incident_description": ""
            }
        },
        "hole" : {
            "information": [],
            "bit" : []
        },
        "activities" : [],
        "consumables" : [],
        "assets" : {
            "assets": [
                {"id":1, "Rental":null, "Equipment_Name": "Welder","Unit_Number":null, "hours":null },
                {"id":2, "Rental":null, "Equipment_Name": "Light Plant","Unit_Number":null, "hours":null },
                {"id":3, "Rental":null, "Equipment_Name": "Crew Pickup","Unit_Number":null, "hours":null },
                {"id":4, "Rental":null, "Equipment_Name": "Aux Water Pump","Unit_Number":null, "hours":null },
                {"id":5, "Rental":null, "Equipment_Name": "Booster","Unit_Number":null, "hours":null },
                {"id":6, "Rental":null, "Equipment_Name": "Flatbed Truck","Unit_Number":null, "hours":null },
                {"id":7, "Rental":null, "Equipment_Name": "AUX Mud Pump","Unit_Number":null, "hours":null },
                {"id":8, "Rental":null, "Equipment_Name": "Water Truck","Unit_Number":null, "hours":null },
                {"id":9, "Rental":null, "Equipment_Name": "Drill Rig","Unit_Number":null, "hours":null },
                {"id":10, "Rental":null, "Equipment_Name": "Backhoe","Unit_Number":null, "hours":null },
                {"id":11, "Rental":null, "Equipment_Name": "Forklift","Unit_Number":null, "hours":null },
                {"id":12, "Rental":null, "Equipment_Name": "Camera","Unit_Number":null, "hours":null }

            ],
            "dailyAssets": [
                {"id":1, "Rental":null, "Equipment_Name": "Welder","Unit_Number":null, "hours":null },
                {"id":2, "Rental":null, "Equipment_Name": "Light Plant","Unit_Number":null, "hours":null },
                {"id":3, "Rental":null, "Equipment_Name": "Crew Pickup","Unit_Number":null, "hours":null },
                {"id":4, "Rental":null, "Equipment_Name": "Aux Water Pump","Unit_Number":null, "hours":null },
                {"id":5, "Rental":null, "Equipment_Name": "Booster","Unit_Number":null, "hours":null },
                {"id":6, "Rental":null, "Equipment_Name": "Flatbed Truck","Unit_Number":null, "hours":null },
                {"id":7, "Rental":null, "Equipment_Name": "AUX Mud Pump","Unit_Number":null, "hours":null },
                {"id":8, "Rental":null, "Equipment_Name": "Water Truck","Unit_Number":null, "hours":null },
                {"id":9, "Rental":null, "Equipment_Name": "Drill Rig","Unit_Number":null, "hours":null },
                {"id":10, "Rental":null, "Equipment_Name": "Backhoe","Unit_Number":null, "hours":null },
                {"id":11, "Rental":null, "Equipment_Name": "Forklift","Unit_Number":null, "hours":null },
                {"id":12, "Rental":null, "Equipment_Name": "Camera","Unit_Number":null, "hours":null }

            ],
            "customAssets": [
                {"Equipment_Name":null, "Unit_Number": null, "hours":null}
            ],
            "fuel": {
                "redDiesel": {
                    "description": "Diesel (Red)",
                    "qty": null,
                    "price": null,
                    "vendor": null
                },
                "clearDiesel": {
                    "description": "Diesel (Clear)",
                    "qty": null,
                    "price": null,
                    "vendor": null
                },
                "unleaded": {
                    "description": "Unleaded",
                    "qty": null,
                    "price": null,
                    "vendor": null
                }
            },
            "water": []
        },
        "notes" : {
            "internal_notes":null,
            "client_notes":null
        },
        "review" : {},
        "settings" : {},
        "isEdit" : false,
        "login" : {
            "login_email" : null,
            "login_id" : null
        }

    };

    return {
        getMaint : function() { 
            return data.maintLilst;
        },
    	getData : function(){
    		return data;
    	},
    	getPreShift : function(){
    		return data.preShift;
    	},
    	getShift : function(){
    		return data.shift;
    	},
    	getHole : function(){
    		return data.hole;
    	},
    	getActivities : function(){
    		return data.activities;
    	},
    	getConsumables : function(){
    		return data.consumables;
    	},
    	getAssets : function(){
    		return data.assets;
    	},
        getCustomAssets2 : function(){
            return data.customAssets;
        },
    	getNotes : function(){
    		return data.notes;
    	},
    	getReview : function(){
    		return data.review;
    	},
    	getSettings : function(){
    		return data.settings;
    	},
        setData : function(newData){
            data = newData;
        },
        isEdit : function(){
            return data.isEdit;
        },
        setIsEdit : function(id){
            data.isEdit = id;
        },
        setNotEdit : function(){
            data.isEdit = false;
        },
        resetData : function(){
            data = JSON.parse(JSON.stringify(stdData));
        }
    };

  });
