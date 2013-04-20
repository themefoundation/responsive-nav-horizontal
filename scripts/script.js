(function($) {

	$(document).ready(function() {
		// $('.thmfdn-menu').addClass('sf-arrows');
		// $('li').has('ul').addClass('sf-with-ul');
		setMenuToggle();
	});

	$(window).resize(function() {
		setMenuToggle();
	});

	function setMenuToggle(){
		var viewportWidth = viewportSize.getWidth();
		if( viewportWidth < 600 && !$('.thmfdn-menu').hasClass('thmfdn-mobile-menu') ) {
			$('.thmfdn-menu').addClass('thmfdn-mobile-menu');
		}
		if( viewportWidth >= 600 && $('.thmfdn-menu').hasClass('thmfdn-mobile-menu') ) {
			$('.thmfdn-menu').removeClass('thmfdn-mobile-menu');
		}
	}

})(jQuery);