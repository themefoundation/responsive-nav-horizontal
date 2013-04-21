(function($) {

	$(document).ready(function() {

		// setMenuToggle();
		var touch = false;
		if ( 'ontouchstart' in document.documentElement ) {
			touch = true;
		}

		setMenuArrows( touch );

		if( touch ) {
			$('.thmfdn-menu').removeClass('hover');
		}

	});

	$(window).resize(function() {
		// setMenuToggle();
	});

	function setMenuToggle() {
		var viewportWidth = viewportSize.getWidth();
		if( viewportWidth < 600 && !$('.thmfdn-menu').hasClass('thmfdn-mobile-menu') ) {
			$('.thmfdn-menu').addClass('thmfdn-mobile-menu');
		}
		if( viewportWidth >= 600 && $('.thmfdn-menu').hasClass('thmfdn-mobile-menu') ) {
			$('.thmfdn-menu').removeClass('thmfdn-mobile-menu');
		}
	}

	function setMenuArrows( touch ) {
		$('.thmfdn-menu').addClass('thmfdn-menu-arrows');
		$('.thmfdn-menu li').has('ul').addClass('has-submenu');
		$('.has-submenu > a').append('<span class="toggle-submenu"></span>');
		if( touch ) {
			$('.toggle-submenu').click(function(){
				toggleSubmenu( $(this) );
			});
		}

	}

	/* Adds and removes the "open-submenu" class from list items containing an open submenu */
	function toggleSubmenu( element ) {
		var submenu = element.closest('.has-submenu');
		if( submenu.hasClass('open-submenu') ) {
			submenu.find('.open-submenu').removeClass('open-submenu');
			submenu.removeClass('open-submenu');
		} else {
			$('.open-submenu').removeClass('open-submenu');
			submenu.parents('.has-submenu').addClass('open-submenu');
			submenu.addClass('open-submenu');

		}
	}



})(jQuery);