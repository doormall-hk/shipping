// 2018-04-22 «What are requirejs-config.js `mixins`?» https://mage2.pro/t/5297
define([
	'df-lodash'
	,'jquery'
	,'Magento_Checkout/js/model/quote'
	,'uiRegistry'
], function(_, $, q, uiRegistry) {'use strict'; return function(sb) {return function (payload) {
	var r = sb(payload);
	var sm = q.shippingMethod();
	if ('doormall' == sm.carrier_code) {
		var m = uiRegistry.get('checkout.steps.shipping-step.shippingAddress.'
			+ [sm.carrier_code, sm.method_code].join('_'))
		;
		if (m) {
			var l = m.address();
			if (l.length) {
				_.set(r, ['addressInformation', 'extension_attributes', 'doormall_location'], l);
			}
		}
	}
	return r;
};};});