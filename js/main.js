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
		init: function() {
			L.modal();
		}
	};
	$(document).ready(function() {
		L.init();
	});
});