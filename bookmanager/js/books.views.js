jQuery(document).ready(function($) {
	
	Jupiter.BookManager.printBookCollection = function (o) {
		var _data = "";
		var _class = "";
		for (var i = 0; i < o.length; i++) {
			_class = (i % 2 == 0) ? "even" : "odd";
			_data  += "<tr id='" + o[i].id + "' class='" + _class + "'><td>" + o[i].title + "</td>" + 
			"<td>" + o[i].author + "</td>" +
			"<td>" + o[i].year + "</td>" +
			"<td>" + o[i].price + "</td></tr>";
		}
		$("#books-table > tbody").html(_data);		
	};
	
	Jupiter.BookManager.printErrorMessage = function (i, e) {
		$(i).text(e);
	};
	
});