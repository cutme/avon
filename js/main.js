/*jshint expr:true */

jQuery(function($) {
	function exist(o) {
		d = ($(o).length>0) ? true : false;
		return d;
	}
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
			exist('.c-popup') && L.modal();
			
		}
	};
	$(document).ready(function() {
		L.init();		
	});
});