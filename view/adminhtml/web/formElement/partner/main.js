// 2018-04-19
define(['jquery', 'domReady!'], function($) {return (
	/**
	 * @param {Object} config
	 * @param {String} config.id
	 */
	function(config) {
		var prepare = function($item) {};
		/** @type {jQuery} HTMLFieldSetElement */
		var $element = $(document.getElementById(config.id));
		$element.hasClass('df-name-template')
			// https://github.com/mage2pro/core/blob/1.0.0/Framework/view/adminhtml/web/formElement/array/main.js#L116
			? $(window).bind('df.config.array.add', function(event, $item) {prepare($item);})
			: prepare($element)
		;
	}
);});