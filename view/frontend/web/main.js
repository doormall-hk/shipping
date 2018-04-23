// 2018-04-18
define([
	'df-lodash', 'jquery', 'ko', 'uiComponent', 'uiRegistry'
], function(_, $, ko, parent, uiRegistry) {'use strict';
/** 2017-09-06 @uses Class::extend() https://github.com/magento/magento2/blob/2.2.0-rc2.3/app/code/Magento/Ui/view/base/web/js/lib/core/class.js#L106-L140 */
return parent.extend({
	defaults: {address: null, m: null, regionA: null, regionB: null, template: 'Doormall_Shipping/main'},
	/**
	 * 2018-04-19
	 * @param {Object} _this
	 * @param {Event} e
	 */
	changedAddress: function(_this, e) {
		// 2018-04-19
		// The `originalEvent` property is present when the event is triggered by the customer.
		// https://stackoverflow.com/a/20397649
		if (e.originalEvent) {
			console.log($(e.currentTarget).val());
		}
	},
	/**
	 * 2018-04-19
	 * @param {Object} _this
	 * @param {Event} e
	 */
	changedRegionA: function(_this, e) {
		// 2018-04-19
		// The `originalEvent` property is present when the event is triggered by the customer.
		// https://stackoverflow.com/a/20397649
		if (e.originalEvent) {
			debugger;
			console.log($(e.currentTarget).val());
		}
	},
	/**
	 * 2018-04-19
	 * @param {Object} _this
	 * @param {Event} e
	 */
	changedRegionB: function(_this, e) {
		// 2018-04-19
		// The `originalEvent` property is present when the event is triggered by the customer.
		// https://stackoverflow.com/a/20397649
		if (e.originalEvent) {
			console.log($(e.currentTarget).val());
		}
	},
	/**
	 * 2016-09-28
	 * @param {String} id
	 * @returns {String}
	 */
	fid: function(id) {return [this.m.carrier_code, this.m.method_code, id].join('_');},
	/**
	 * 2018-04-19
	 * @override
	 * @see uiComponent::initialize()
	 * https://github.com/magento/magento2/blob/2.2.3/app/code/Magento/Ui/view/base/web/js/lib/core/element/element.js#L97-L111
	 * @returns {exports}
	*/
	initialize: function() {
		this._super();
		//var parent = uiRegistry.get(this.parentName);
		debugger;
		this.config = window.checkoutConfig.shipping[this.m.carrier_code][this.m.method_code];
		this.regionsAO = this.opts(['Kowloon', 'Hong Kong Island', 'N.T', 'Macau']);
		this.regionsB = ko.observable({});
		this.regionsBO = ko.computed(function() {this.opts(this.regionsB);}, this);
		this.addresses = ko.observable({});
		this.addressesO = ko.computed(function() {this.opts(this.addresses);}, this);
		return this;
	},	
	/**
	 * 2018-04-19
	 * @override
	 * @used-by initialize()
	 * @param {Array|Object} map
	 * @returns {Object}
	 */
	opts: function(map) {
		var option = function(v, l) {return {'value': v, 'label': l};};
		return [option('', '')].concat(_.map(map, function(v, k) {return option(k, v);}));
	},
	/**
	 * 2018-04-19
	 * @returns {String}
	 */
	title: function() {return 'Hello, DoorMall!';}
});});