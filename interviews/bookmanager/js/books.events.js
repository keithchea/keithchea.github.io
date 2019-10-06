jQuery(document).ready(function ($) {
	
	var _add_book = {};
	var _update_book = {};
	
	$("#book-dialog").dialog({
		autoOpen: false,
		resizable: false,
		width: 418,
		modal: true,
	    buttons: { 	"Save": function(e) {
	    				Jupiter.BookManager.doSave(e);
	    			},
	    			"Cancel": function(e, u) {  
	    				$(this).dialog('close');
	    			}
	    },
		close: function(e, u) {
			
		}
	});	
	
	$("#add").bind("click", function() {
        
		$("#book-dialog").dialog({title: "Add a book" }).dialog('open');
		$("#book-dialog .error").each(function() {
			$(this).hide();
		});
		$(".ui-dialog").addClass('add-a-book');
		$(".ui-dialog").removeClass('update-a-book');
        $("#book-dialog input").each(function(){
            $(this).val('');
        });
        
	});
	
	$("tbody > tr").live("click", function(e) {

		$("#book-dialog").dialog({title: "Edit a book" }).dialog('open');
		$("#book-dialog .error").each(function() {
			$(this).hide();
		});
		
		$(".ui-dialog").addClass('update-a-book');
		$(".ui-dialog").removeClass('add-a-book');

		var _id = parseInt($(this).attr("id"));	
		var _index = Jupiter.BookManager.BookCollection().doGetIndex(_id);
		_update_book = Jupiter.BookManager.books[_index];
		
		$("input[id='book-title']").val(_update_book.title);
		$("input[id='book-author']").val(_update_book.author);
		$("input[id='book-year']").val(_update_book.year);
		$("input[id='book-price']").val(_update_book.price);
		
	});
	
	Jupiter.BookManager.doSave = function (e) {
		
		var _t = $("input[id='book-title']").val(),
			_a = $("input[id='book-author']").val(),
			_y = $("input[id='book-year']").val(),
			_p = $("input[id='book-price']").val();
		
		var _tr = Jupiter.BookManager.Validation().string(_t),
			_ar = Jupiter.BookManager.Validation().string(_a),
			_yr = Jupiter.BookManager.Validation().year(_y),
			_pr = Jupiter.BookManager.Validation().price(_p);
		
		if (_tr > 1 || _ar > 1 || _yr > 1 || _pr > 1) {
			
			if (_tr == 2) {
				$(".book-title-error").show();
				Jupiter.BookManager.printErrorMessage(".book-title-error", Jupiter.BookManager.Messages['empty_string_error']);
			}
			else {
				$(".book-title-error").hide();
			};

			if (_ar == 2) {
				$(".book-author-error").show();
				Jupiter.BookManager.printErrorMessage(".book-author-error", Jupiter.BookManager.Messages['empty_string_error']);
			}
			else {
				$(".book-author-error").hide();
			};
			
			if (_yr == 2) {
				$(".book-year-error").show();
				Jupiter.BookManager.printErrorMessage(".book-year-error", Jupiter.BookManager.Messages['empty_string_error']);
			}
			else if (_yr == 3) {
				$(".book-year-error").show();
				Jupiter.BookManager.printErrorMessage(".book-year-error", Jupiter.BookManager.Messages['incorrect_year_format']);
			}
			else {
				$('.book-year-error').hide();
			}

			if (_pr == 2) {
				$('.book-price-error').show();
				Jupiter.BookManager.printErrorMessage(".book-price-error", Jupiter.BookManager.Messages['empty_string_error']);
			}
			else if (_pr == 3) {
				$('.book-price-error').show();
				Jupiter.BookManager.printErrorMessage(".book-price-error", Jupiter.BookManager.Messages['incorrect_price_format']);
			}
			else {
				$('.book-price-error').hide();
			};
			
			return false;
		}
		else {

			if ($('.ui-dialog').hasClass('add-a-book')) {
			    _add_book.title = _t;
			    _add_book.author = _a; 
			    _add_book.year = _y; 
			    _add_book.price = _p;
			    
				Jupiter.BookManager.BookCollection().doAdd(_add_book);
				Jupiter.BookManager.printBookCollection(Jupiter.BookManager.books);
				$("#book-dialog").dialog('close');
				
			}
			else if ($('.ui-dialog').hasClass('update-a-book')) {
	
			    _update_book.title = _t;
			    _update_book.author = _a; 
			    _update_book.year = _y; 
			    _update_book.price = _p; 
	
				Jupiter.BookManager.BookCollection().doUpdate(_update_book);
				Jupiter.BookManager.printBookCollection(Jupiter.BookManager.books);
				$("#book-dialog").dialog('close');
			}
		}
	};

});