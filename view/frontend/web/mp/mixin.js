// 2018-04-22 «What are requirejs-config.js `mixins`?» https://mage2.pro/t/5297
define([
	'df-lodash', 'jquery', 'Magento_Checkout/js/model/quote', 'uiLayout', 'uiRegistry'
], function(_, $, q, layout, uiRegistry) {'use strict'; return function(sb) {return sb.extend({
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
						component: 'Doormall_Shipping/mp/main'
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
	 * 2018-04-29
	 * @used-by validate()
	 * @used-by Doormall_Shipping/save
	 * @param {Object} r
	 * @returns {?Object}
	 */
	m: function(r) {return ('doormall' !== r.carrier_code ? null : uiRegistry.get(
		[this.name, this._name(r)].join('.')
	));},
    /**
	 * 2018-04-29
	 * @override
	 * @see Aheadworks_OneStepCheckout/js/view/shipping-method
	 * @used-by Aheadworks_OneStepCheckout/js/view/place-order/aggregate-validator::_validateShippingMethod()
	 */
	validate: function() {
		this._super();
		var m = this.m(q.shippingMethod());
		if (m) {
			var $f = $('.shipping-method-card.' + this._name(m.m)).closest('form');
			if (!$f.validation() || !$f.validation('isValid')) {
				this.errorValidationMessage('Please specify a shipping method.');
				this.source.set('params.invalid', true);
			}
		}
	},
    /**
	 * 2018-04-28
	 * @used-by m()
	 * @used-by initialize()
	 * @used-by validate()
	 * @param {Object} m
	 * @returns {String}
	 */
	_name: function(m) {return [m.carrier_code, m.method_code].join('_');}
});};});