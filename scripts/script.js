(function($) {

	/**
	 * Adds classes to menu to support navigation arrows
	 *
	 * @param menuElement string Element containing the navigation menu.
	 * @param menuSettings object The settings for this menu (options, custom class names, etc.).
	 * @param touch bool Whether or not the current device has touch support.
	 */
	function arrowsInit( menuElement, menuSettings, touch ) {

		// Adds hover class to base menu element.
		$(menuElement).addClass(menuSettings.arrowClass);

		// Adds a submenu class to any menu item containing a submenu.
		$(menuElement + ' li').has('ul').addClass(menuSettings.hasSubmenuClass);

		// Adds spans to hold submenu arrows
		$('.' + menuSettings.hasSubmenuClass + ' > a').append('<span class="' + menuSettings.toggleSubmenuClass + '"></span>');

		if( touch ) {

			$('.' + menuSettings.toggleSubmenuClass).unbind();
			$('.' + menuSettings.toggleSubmenuClass).click(function(){
				toggleSubmenu( $(this), menuSettings );
			});
		}

	}


	/**
	 * Adds classes to menu to support toggled mobile menu format
	 *
	 * @param menuElement string Element containing the navigation menu.
	 * @param menuSettings object The settings for this menu (options, custom class names, etc.).
	 * @param touch bool Whether or not the current device has touch support.
	 */
	function mobileInit( menuElement, menuSettings, touch ) {

		//Gets the exact viewport width using Tyson Matanich's viewportSize.js script
		var viewportWidth = viewportSize.getWidth();

		// Checks if viewport size is less than the mobile breakpoint setting and the mobile menu is not displayed yet
		if( viewportWidth < menuSettings.mobileBreakpoint && !$(menuElement).hasClass(menuSettings.mobileClass) ) {
			// Adds the mobile menu toggle button
			$('body').prepend('<div id="' + menuSettings.toggleButtonID + '"><div></div></div>');

			// Adds the mobile class to the menu element
			$(menuElement).addClass(menuSettings.mobileClass);

			// Adds the hide mobile class
			$('.' + menuSettings.mobileClass).addClass(menuSettings.hideMobileClass);

			// Adds listener to the menu toggle button
			$('#' + menuSettings.toggleButtonID).click(function(){
				$('.' + menuSettings.mobileClass).toggleClass(menuSettings.hideMobileClass);
			});

			// Removes the hover class
			$(menuElement).removeClass(menuSettings.hoverClass);

			// Removes any previously set listeners from the submenu toggle button
			$('.' + menuSettings.toggleSubmenuClass).unbind();

			// Adds new listner to the submenu toggle button
			$('.' + menuSettings.toggleSubmenuClass).click(function(){
				toggleSubmenu( $(this), menuSettings );
			});

		}

		// Checks if viewport size is greater than the mobile breakpoint setting and the mobile menu is still displayed
		if( viewportWidth >= menuSettings.mobileBreakpoint && $(menuElement).hasClass(menuSettings.mobileClass) ) {

			// Removes mobile menu toggle button
			$('#' + menuSettings.toggleButtonID).remove();

			// Removes hide mobile class to ensure menu is never hidden in desktop view
			$(menuElement).removeClass(menuSettings.hideMobileClass);

			// Removes mobile class
			$(menuElement).removeClass(menuSettings.mobileClass);

			// Checks for lack of touch support
			if( ! touch ) {

				// Adds the hover class
				$(menuElement).addClass(menuSettings.hoverClass);

				// Removes listener for submenu toggle buttons
				$('.' + menuSettings.toggleSubmenuClass).unbind();

				// Removes any left over open submenu classes
				$('.' + menuSettings.openSubmenuClass).removeClass(menuSettings.openSubmenuClass);

			}

		}

	}

	/**
	 * Adds and removes open submenu class from list items containing an open submenu
	 *
	 * @param menuItem object The clicked submenu toggle button element.
	 * @param menuSettings object The settings for this menu (options, custom class names, etc.).
	 */
	function toggleSubmenu( menuItem, menuSettings ) {
		alert(menuItem);
		var submenu = menuItem.closest('.' + menuSettings.hasSubmenuClass);

		// Checks if submenu is already open
		if( submenu.hasClass(menuSettings.openSubmenuClass) ) {

			// Removes open submenu classes from any nested open submenus
			submenu.find('.' + menuSettings.openSubmenuClass).removeClass(menuSettings.openSubmenuClass);

			// Removes open submenu class from current submenu
			submenu.removeClass(menuSettings.openSubmenuClass);

		} else {

			// Removes open submen class from other submenus
			$('.' + menuSettings.openSubmenuClass).removeClass(menuSettings.openSubmenuClass);

			// Adds open submenu classes
			submenu.parents('.' + menuSettings.hasSubmenuClass).addClass(menuSettings.openSubmenuClass);
			submenu.addClass(menuSettings.openSubmenuClass);
		}

	}


	/**
	 * Adds responsive menu support to jQuery
	 *
	 * @param menuElement string Element containing the navigation menu.
	 * @param menuSettings object The settings for this menu (options, custom class names, etc.).
	 */
	$.fn.thmfdnMenu = function( menuElement, menuSettings ) {
		var settings = $.extend({}, $.fn.thmfdnMenu.defaults, menuSettings);
		var touch = false;
		// console.log(menu);

		$(document).ready(function() {

			if ( 'ontouchstart' in document.documentElement ) {
				touch = true;
				$(menuElement).removeClass(settings.hoverClass);
			}

			arrowsInit( menuElement, settings, touch );
			mobileInit( menuElement, settings, touch );

		});

		$(window).resize(function() {
			mobileInit( menuElement, settings, touch );
		});

	}



	// Default menu settings
	$.fn.thmfdnMenu.defaults = {
		mobileBreakpoint: 600,
		toggleButtonID: 'menu-toggle-button',
		hoverClass: 'menu-hover',
		arrowClass: 'menu-arrows',
		mobileClass: 'menu-mobile',
		hideMobileClass: 'hide-mobile',
		hasSubmenuClass: 'has-submenu',
		openSubmenuClass: 'open-submenu',
		toggleSubmenuClass: 'toggle-submenu'

	};

})(jQuery);



var menuSettings = {
	hoverClass: 'menu-hover'
}

jQuery().thmfdnMenu('.test-menu', menuSettings);