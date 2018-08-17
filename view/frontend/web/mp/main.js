// 2018-04-18
define([
	'df-lodash', 'Df_Checkout/api', 'jquery', 'ko'
	,'Magento_Checkout/js/model/quote', 'uiComponent', 'uiRegistry'
], function(_, api, $, ko, quote, parent, uiRegistry) {'use strict';
/** 2017-09-06 @uses Class::extend() https://github.com/magento/magento2/blob/2.2.0-rc2.3/app/code/Magento/Ui/view/base/web/js/lib/core/class.js#L106-L140 */
return parent.extend({
	defaults: {m: null, template: 'Doormall_Shipping/mp/main'},
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
			this.regionB('');
			this.address('');
			var l = $(e.currentTarget).val();
			if (!l.length) {
				this.regionsB([]); this.addresses([]);
			}
			else {
				var v = this.cache[l];
				var update = $.proxy(function(v) {
					this.cache[l] = v;
					this.regionsB(_.keys(v));
					this.addresses(this.reduce(v));
				}, this);
				v ? update(v) : $.when(api(this, 'doormall-shipping', {
					pid: this.m.method_code, l: l
				}, 'get')).done(update);
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
			this.address('');
			var l = $(e.currentTarget).val();
			var v = this.cache[this.regionA()];
			this.addresses(!l.length ? this.reduce(v) : v[l]);
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
		this.cache = {};
		this.config = window.checkoutConfig.shipping[this.m.carrier_code][this.m.method_code];
		this.address = ko.observable('');
		this.addresses = ko.observable({});
		this.addressesO = ko.computed(function() {return this.opts(this.addresses());}, this);
		this.regionA = ko.observable('');
		this.regionB = ko.observable('');
		// 2018-05-08
		// "The Chinese interface fails on frontend:
		// «Undefined index: Kowloon in vendor/doormall.hk/shipping/Controller/Index/Index.php on line 20»"
		// https://github.com/doormall-hk/shipping/issues/1
		this.regionsAO = this.opts('zh' === $('html').attr('lang') ?
			['九龍', '香港島', '新界', '澳門'] : ['Kowloon', 'Hong Kong Island', 'N.T', 'Macau']
		);
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
	 * 2018-04-25
	 * @used-by changedRegionA()
	 * @used-by changedRegionB()
	 * @param {Object} v
	 * @returns {Object}
	 */
	reduce: function(v) {return _.reduce(v, function(r, i) {return _.assign(r, i);});},
});});