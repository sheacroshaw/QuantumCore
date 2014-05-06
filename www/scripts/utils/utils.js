(function(window){
	var myUitls = {

		getFirstKey : function (obj){
			if (!typeof obj === 'object')
				return false;

			for (var key in obj){
				obj.hasOwnProperty(key)
					return key;
			}

			return false;
		}//end getFirstKey

	};

	window.myUitls = myUitls;

})(window)



