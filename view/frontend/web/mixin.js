// 2018-04-22 «What are requirejs-config.js `mixins`?» https://mage2.pro/t/5297
define([
	'df-lodash', 'uiLayout', 'uiRegistry'
], function(_, layout, uiRegistry) {'use strict'; return function(sb) {return sb.extend({
   /**
	* 2018-04-23
	* @used-by Doormall_Shipping/methods/item
	* @param {Object} m
	* @returns {?Object}
	*/
	dfImg: function(m) {
		var r = _.get(window.checkoutConfig, ['shipping', m.carrier_code, m.method_code, 'img']);
		return !r || !r.src ? null : r;
	},
   /**
	* 2018-04-23
	* @used-by Doormall_Shipping/methods/item
	* @param {Object} m
	* @returns {String}
	*/
	dfLabelClass: function(m) {return this.dfImg(m) ? 'doormall-logo' : 'doormall-no-logo'},
	/**
	 * 2018-04-23
	 * @override
	 * @see Aheadworks_OneStepCheckout/js/view/shipping-method
	 * @returns this
	 */
	initialize: function() {
		this._super();
		this.rates.subscribe(function(a) {
			_.each(a, function(m) {
				if ('doormall' === m.carrier_code) {
					layout([{
						component: 'Doormall_Shipping/main'
						,config: {m: m}
						,displayArea: 'doormall'
						,name: this._name(m)
					}], this);
				}
			}.bind(this));
		}.bind(this));
		return this;
	},
	/**
	 * 2018-04-25
	 * @override
	 * @see Aheadworks_OneStepCheckout/js/view/shipping-method
	 * @used-by Doormall_Shipping/methods/item.html
	 */
	selectShippingMethod: function(rate) {
		this._super();
		uiRegistry.get([this.name, this._name(rate)].join('.'), function(m) {
			debugger;
		});
	},
    /**
	 * 2018-04-28
	 * @used-by initialize()
	 * @used-by selectShippingMethod()
	 * @param {Object} m
	 * @returns {String}
	 */
	_name: function(m) {return [m.carrier_code, m.method_code].join('_');}
});};});