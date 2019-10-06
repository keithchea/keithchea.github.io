jQuery(document).ready(function($) {

	Jupiter.BookManager.getBookCollection = (function () {

		var _url = "./js/books.collection.json";

		var _handleSuccess = function (o) {
			Jupiter.BookManager.books = o;
			Jupiter.BookManager.printBookCollection(o);
		};

		var _handleError = function (o) {
			Jupiter.BookManager.printErrorMessage("#error1", Jupiter.BookManager.Messages['ajax_error']);
		};

		$.ajax({
			url: _url,
			type: 'GET',
			dataType: 'json',
			success: _handleSuccess,
			error: _handleError
		});
	})();

	Jupiter.BookManager.BookCollection = function () {

		var _books = Jupiter.BookManager.books;
		
		var _generateBookId = function () {
			var _l = _books.length,
				_i = _l > 0 ? _books[_l - 1].id + 1 : 0;
			return _i;
		};
		
		var _getIndex = function (i) {
			var _id = i;
			var _imax = _books.length - 1;
			var _imin = 0,
				_imid,
				_rmid;

			while (_imax >= _imin) {
				_imid = (_imax + _imin) / 2;
				_rmid = Math.round(_imid);
				if (_id > _books[_rmid].id) {
					_imin = _rmid + 1;
				}
				else if (_id < _books[_rmid].id) {
					_imax = _rmid - 1;
				}
				else {
					return _rmid;
				}
			}
			return -1;
		};

		var _add = function (b) {
			var _b = $.extend({}, true, b);
			var _id = _generateBookId();
			_b.id = _id;
			_books.push(_b);	
		};
		
		var _update = function (b) {
			var _b = $.extend({}, true, b);
			var _i = _getIndex(_b.id);
			if (_i > -1) {
				_books[_i].id = _b.id;
				_books[_i].title = _b.title;
				_books[_i].author = _b.author;
				_books[_i].year = _b.year;
				_books[_i].price = _b.price;
			}
			else {
				Jupiter.BookManager.printErrorMessage("#error", Jupiter.BookManager.Messages['update_book_error']);	
			}	
		};
		
		var _delete = function (b) {
			//TODO
			//var _b = $.extend({}, true, b);
			//console.log('DELETE');
		};
		
		return ({
			
			doAdd : function (b) {
				_add(b);
			},
			
			doUpdate : function (b) {
				_update(b);
			},
			
			doDelete : function (b) {
				_delete(b);
			},
			
			doGetIndex : function (i) {
				return _getIndex(i);
			}
			
		});
		
	};
	
});