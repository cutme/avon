/*jshint expr:true */
jQuery(function($) {
	function setCookie(name, value, expires) {
		var cookieStr = escape(name) + "=";
		if (typeof value != "undefined") {
			cookieStr += escape(value);
		}
		if (!expires) {
			expires = new Date();
			expires.setTime(expires.getTime() + 24 * 60 * 60 * 1000);
		}
		cookieStr += "; expires=" + expires.toGMTString() + ";";
		document.cookie = cookieStr;
	}

	function getCookie(name) {
		var str = '; ' + document.cookie + ';';
		var index = str.indexOf('; ' + escape(name) + '=');
		if (index != -1) {
			index += name.length + 3;
			var value = str.slice(index, str.indexOf(';', index));
			return unescape(value);
		}
	}

	var L = {
		modal: function() {
			document.addEventListener('mouseout', function(e) {
				var top = e.pageY;
				// Jesli kursor poza gorna krawedzia okna
				if (top < 10) {
					//Sprawdzamy czy istnieje ciastko o zamknieciu popa.
					var popClosed = getCookie("popClosed");
					// W przypadku, gdy ciastko nie istnieje.
					if (popClosed != 1) {
						// Odpal popup      
						$.magnificPopup.open({
							items: {
								src: '.c-popup--myths',
								type: 'inline'
							},
							callbacks: {
								close: function() {
									setCookie("popClosed", 1);
								}
								// e.t.c.
							},
							mainClass: 'mfp-fade mfp-modal'
						});
					}
				}
			});
		},
		validate: function() {
			var el = $('form'),
				error = 0,
				errorClass = 'has-error animated shake',
				check,
				reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

			function checkField(o) {				
				if ($(o).val() == '') {
					$(o).parent().addClass(errorClass);
					return false;
				}
				return true;
			}
			var validateStart = function(o) {
				error = 0;
				el.find('.has-error').removeClass(errorClass);
				$('[type=text], [type=tel], [type=password], [type=date], textarea', o).each(function() {
					if ( $(this).prop('required') === true ) {
						check = checkField(this);
						if (check === false) {
							error = 1;
						}
					}
				});
				$('[type=email], [type=text], [type=password]', o).on('keydown', function() {
					$(this).parent().removeClass(errorClass);
				});
				$('[type=email]', o).each(function() {
					if ($(this).prop('required')) {
						var email = $(this).val();
						if (email === '') {
							$(this).parent().addClass(errorClass);
							error = 1;
						} else if (reg.test(email) === false) {
							$(this).parent().addClass(errorClass);
							error = 1;
						} else {
							$(this).parent().removeClass(errorClass);
						}
					}
				});
				$('[type=checkbox]', o).each(function() {
					if ($(this).prop('required')) {
						if (!$(this).prop('checked')) {
							$(this).parent().addClass(errorClass);
							error = 1;
						} else {
							$(this).parent().removeClass(errorClass);
						}
					}
				});
				return error;
			};
			el.each(function() {
				var submit = $('.submit', this),
					is_error, _t = $(this);
				submit.on('click', function(e) {
					e.preventDefault();
					is_error = validateStart(_t);
					if (is_error === 1) {
						$('html, body').animate({
							scrollTop: $('.c-become-consultant').offset().top
						}, 500);
						
					} else {
						_t.submit();
						return true;
					}
				});
			});
		},
		init: function() {
			L.modal();
			L.validate();
		}
	};
	$(document).ready(function() {
		L.init();
	});
});