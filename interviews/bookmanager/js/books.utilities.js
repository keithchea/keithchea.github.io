jQuery(document).ready(function($) {
	
	Jupiter.BookManager.Validation = function () {
		
		var _price = function (d) {
		    var _d = d;
		    var _p = /^\d+\.\d{2}$/gi;
		    if (_d == "") {
		    	return 2;
		    }
		    else if (! _p.test(_d)) {
		    	return 3;
		    }
		    return 1;
		};
		
		var _year = function (d) {
			var _d = d;
			var _p = /^\d{4}/i; // what if books were written before a millenium?
			if (_d == "") {
				return 2;
			}
			else if (! _p.test(_d)) {
				return 3;
			}
			return 1;
		};
		
		var _string = function (d) {
			if (d == "") {			
				return 2;
			}
			return 1;
		};
		
		return ({
			price : function (d) {
				return _price(d);
			},
			year : function (d) {
				return _year(d);
			},
			string : function (d) {
				return _string(d);
			}
		});
	};
	
});