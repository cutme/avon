/*jshint expr:true */

jQuery(function($) {
	var L = {
		modal: function() {
			$.magnificPopup.open({
                items: {
                    src: '.c-popup--myths',
                    type: 'inline'
                },
				mainClass: 'mfp-fade mfp-modal'
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