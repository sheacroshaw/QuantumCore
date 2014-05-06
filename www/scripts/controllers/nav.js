'use strict';

angular.module('quantumRApp')
	.controller('Nav',
		['$scope', '$location','Prepdatatosend','Appdata','WebServiceData', 
		function($scope, $location,Prepdatatosend,Appdata,WebServiceData){

		var pathOrder = [
			'home',
			'Hole_Log',
			'employees',
			'hole',
			'activities',
			'consumables',
			'assets',
			'notes',
			'review',
			'settings'];


		$scope.$on('$locationChangeSuccess',function(){
			updateSelectedButton();
		});		

		$scope.saveProgress = function(){
			var updatedAssets = Appdata.getData().assets;


			var currentJSON = angular.toJson({ 
	        		data : Appdata.getData(),
	            constants : WebServiceData.getDetail(),
	            assets : updatedAssets.assets,
	            customAssets : updatedAssets.customAssets
	        })

	        console.log(currentJSON);
	       
	        webdb.clearLocals(setProgress );

		}

		function setProgress () {

			var updatedAssets = Appdata.getData().assets;
			webdb.setLocals({ 
	        	data : Appdata.getData(),
	            constants : WebServiceData.getDetail(),
	            assets : updatedAssets.assets,
	            customAssets : updatedAssets.customAssets
	        })
		}

		function updateSelectedButton() {
			
			//set the selected path
			var topButtons = $('.top-buttons').find('button');

			angular.forEach(topButtons,function(value,key){
				$(value).removeClass('active');
			});

			var path = $location.path().substr(1) || '';
			$('#'+path+'-btn').addClass('active');


			//set up the next and back
			var pathIndex = pathOrder.indexOf(path);
			var pathLength = pathOrder.length;

			if (pathIndex === 0){
				$scope.backHref = pathOrder[0];
				$scope.nextHref = pathOrder[1]
			}
			else if ((pathIndex + 1) === pathLength ) {

				$scope.backHref = pathOrder[pathLength - 2];
				$scope.nextHref = pathOrder[pathLength - 1]
			}
			else {
				$scope.backHref = pathOrder[pathIndex - 1];
				$scope.nextHref = pathOrder[pathIndex + 1]
			}

		}//end updateSelectedButton



	}]);