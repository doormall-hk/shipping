// 2018-04-18
define([
	'df-lodash', 'jquery', 'uiComponent'
], function(_, $, parent) {'use strict';
/** 2017-09-06 @uses Class::extend() https://github.com/magento/magento2/blob/2.2.0-rc2.3/app/code/Magento/Ui/view/base/web/js/lib/core/class.js#L106-L140 */
return parent.extend({
	defaults: {regionA: null, template: 'Doormall_Shipping/main'},
	/**
	 * 2018-04-19
	 * @param {Object} obj
	 * @param {Event} ev
	 */
	changedRegionA: function(obj, ev) {
		/**
		 * 2018-04-19
		 * The `originalEvent` property is present when the event is triggered by the customer.
		 */
		if (ev.originalEvent) {
			console.log($(ev.currentTarget).val());
		}
	},
	/**
	 * 2016-09-28
	 * @param {String} id
	 * @returns {String}
	 */
	fid: function(id) {return 'doormall_shipping' + '_' + id;},
	/**
	 * 2018-04-19
	 * @returns {Object}
	 */
	regionsA: function() {return _.map([
		'', 'Kowloon', 'Hong Kong Island', 'N.T', 'Macau'
	], function(v) {return {'value': v, 'label': v};});},
	/**
	 * 2018-04-19
	 * @returns {String}
	 */
	title: function() {return 'Hello, DoorMall!';}
});});