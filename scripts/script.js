(function($) {

	var touch = false;

	$(document).ready(function() {

		if ( 'ontouchstart' in document.documentElement ) {
			touch = true;
			$('.thmfdn-menu').removeClass('hover');
		}

		setMenuArrows( touch );
		setMenuToggle( touch );

	});

	$(window).resize(function() {
		setMenuToggle( touch );
	});



	function setMenuToggle( touch ) {
		var viewportWidth = viewportSize.getWidth();

		if( viewportWidth < 600 && !$('.thmfdn-menu').hasClass('thmfdn-mobile-menu') ) {
			$('body').prepend('<div id="menu-toggle-button"><div></div></div>');
			$('.thmfdn-menu').addClass('thmfdn-mobile-menu');
			$('.thmfdn-mobile-menu').addClass('hide-mobile-menu');
			$('#menu-toggle-button').click(function(){
				$('.thmfdn-mobile-menu').toggleClass('hide-mobile-menu');
			});
			$('.thmfdn-menu').removeClass('hover');
			$('.toggle-submenu').unbind();
			$('.toggle-submenu').click(function(){
				toggleSubmenu( $(this) );
			});
		}

		if( viewportWidth >= 600 && $('.thmfdn-menu').hasClass('thmfdn-mobile-menu') ) {
			$('#menu-toggle-button').remove();
			$('.thmfdn-mobile-menu').removeClass('hide-mobile-menu');
			$('.thmfdn-menu').removeClass('thmfdn-mobile-menu');

			if( ! touch ) {
				$('.thmfdn-menu').addClass('hover');
				$('.toggle-submenu').unbind();
				$('.open-submenu').removeClass('open-submenu');
			}

		}

	}



	function setMenuArrows( touch ) {
		$('.thmfdn-menu').addClass('thmfdn-menu-arrows');
		$('.thmfdn-menu li').has('ul').addClass('has-submenu');
		$('.has-submenu > a').append('<span class="toggle-submenu"></span>');

		if( touch ) {
			$('.toggle-submenu').unbind();
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

	// function toggleMobileMenu() {
	// 	$('.thmfdn-mobile-menu').toggle();
	// 	if( $('#menu-toggle-button').hasClass('open-mobile-menu') ) {
	// 		$('#menu-toggle-button').removeClass('open-mobile-menu');
	// 	} else {
	// 		$('#menu-toggle-button').addClass('open-mobile-menu')
	// 	}
	// }

})(jQuery);