// 2018-04-18
define([
	'df-lodash', 'Df_Checkout/api', 'jquery', 'ko'
	,'Magento_Checkout/js/model/quote', 'uiComponent'
], function(_, api, $, ko, quote, parent) {'use strict';
/** 2017-09-06 @uses Class::extend() https://github.com/magento/magento2/blob/2.2.0-rc2.3/app/code/Magento/Ui/view/base/web/js/lib/core/class.js#L106-L140 */
return parent.extend({
	defaults: {address: null, m: null, template: 'Doormall_Shipping/main'},
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
			var l = $(e.currentTarget).val();
			this.regionsB(!l.length ? [] : this.config['locations'][l]);
			if (!l.length) {
				this.addresses([]);
			}
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
			var l = $(e.currentTarget).val();
			!l.length ? this.addresses([]) : $.when(api(this, 'doormall-shipping', {
				pid: this.m.method_code, l1: this.regionA(), l2: l
			}, 'get'))
				.done($.proxy(function(v) {this.addresses(v);}, this))
				.fail(function() {debugger;})
			;
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
		this.config = window.checkoutConfig.shipping[this.m.carrier_code][this.m.method_code];
		this.addresses = ko.observable({});
		this.addressesO = ko.computed(function() {return this.opts(this.addresses());}, this);
		this.regionA = ko.observable({});
		this.regionB = ko.observable({});
		this.regionsAO = this.opts(['Kowloon', 'Hong Kong Island', 'N.T', 'Macau']);
		this.regionsB = ko.observable({});
		this.regionsBO = ko.computed(function() {return this.opts(this.regionsB());}, this);
		this.dfIsChosen = ko.computed(function() {
			var m = quote.shippingMethod();
			return m && m.carrier_code === this.m.carrier_code && m.method_code === this.m.method_code;
		}, this);
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
		var o = function(v, l) {return {'value': v, 'label': l};};
		var isArray = _.isArray(map);
		return [o('', '')].concat(_.map(map, function(v, k) {return isArray ? o(v, v) : o(k, v);}));
	},
	/**
	 * 2018-04-19
	 * @returns {String}
	 */
	title: function() {return 'Hello, DoorMall!';}
});});