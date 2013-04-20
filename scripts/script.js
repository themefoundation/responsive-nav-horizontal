(function($) {

	$(document).ready(function() {
		setMenuArrows();
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

	function setMenuArrows(){
		$('.thmfdn-menu').addClass('thmfdn-menu-arrows');
		$('.thmfdn-menu li').has('ul').addClass('has-submenu');
		$('.has-submenu > a').append('<span class="toggle-submenu"></span>');
	}

})(jQuery);