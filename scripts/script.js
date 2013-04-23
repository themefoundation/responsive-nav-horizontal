(function($) {

	var touch = false;

	$.fn.testfunction = function( menuElement ) {

	$(document).ready(function() {

		if ( 'ontouchstart' in document.documentElement ) {
			touch = true;
			$(element).removeClass('hover');
		}

		setMenuArrows( menuElement, touch );
		setMenuToggle( menuElement, touch );

	});

	$(window).resize(function() {
		setMenuToggle( menuElement, touch );
	});

	}







	function setMenuToggle( menuElement, touch ) {
		var viewportWidth = viewportSize.getWidth();

		if( viewportWidth < 600 && !$(menuElement).hasClass('thmfdn-mobile-menu') ) {
			$('body').prepend('<div id="menu-toggle-button"><div></div></div>');
			$(menuElement).addClass('thmfdn-mobile-menu');
			$('.thmfdn-mobile-menu').addClass('hide-mobile-menu');
			$('#menu-toggle-button').click(function(){
				$('.thmfdn-mobile-menu').toggleClass('hide-mobile-menu');
			});
			$(menuElement).removeClass('hover');
			$('.toggle-submenu').unbind();
			$('.toggle-submenu').click(function(){
				toggleSubmenu( $(this) );
			});
		}

		if( viewportWidth >= 600 && $(menuElement).hasClass('thmfdn-mobile-menu') ) {
			$('#menu-toggle-button').remove();
			$('.thmfdn-mobile-menu').removeClass('hide-mobile-menu');
			$(menuElement).removeClass('thmfdn-mobile-menu');

			if( ! touch ) {
				$(menuElement).addClass('hover');
				$('.toggle-submenu').unbind();
				$('.open-submenu').removeClass('open-submenu');
			}

		}

	}



	function setMenuArrows( menuElement, touch ) {
		$(menuElement).addClass('thmfdn-menu-arrows');
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
	function toggleSubmenu( menuElement ) {
		var submenu = menuElement.closest('.has-submenu');

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

jQuery().testfunction('.test-menu');

