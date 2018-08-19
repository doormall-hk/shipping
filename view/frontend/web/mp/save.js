// 2018-04-22 «What are requirejs-config.js `mixins`?» https://mage2.pro/t/5297
define([
	'df-lodash'
	,'jquery'
	,'mage/storage'
	,'Magento_Checkout/js/action/select-billing-address'
	,'Magento_Checkout/js/model/error-processor'
	,'Magento_Checkout/js/model/full-screen-loader'
	,'Magento_Checkout/js/model/quote'
	,'Mageplaza_Osc/js/model/osc-data'
	,'Mageplaza_Osc/js/model/resource-url-manager'
	,'uiRegistry'
], function(
	_, $, storage, selectBillingAddress, errorProcessor, busy, q, oscData, url, uiRegistry
) {'use strict'; return function(sb) {return _.assign(sb, {
   /**
	* 2018-08-19
	* @override
	* @see Mageplaza_Osc/js/model/shipping-save-processor/checkout::saveShippingInformation()
	* @returns {*}
	*/
	saveShippingInformation: function() {
		var additionInformation = oscData.getData();
		if (window.checkoutConfig.oscConfig.giftMessageOptions.isOrderLevelGiftOptionsEnabled) {
			additionInformation.giftMessage = sb.saveGiftMessage();
		}
		if (!q.billingAddress()) {
			selectBillingAddress(q.shippingAddress());
		}
		var r;
		if (q.isVirtual() && $.isEmptyObject(additionInformation)) {
			r = $.Deferred().resolve();
		}
		else {
			var customAttributes = {};
			if (_.isObject(q.billingAddress().customAttributes)) {
				_.each(q.billingAddress().customAttributes, function (a, k) {
					if (_.isObject(a)) {
						customAttributes[a.attribute_code] = a.value
					}
					else if (_.isString(a)) {
						customAttributes[k] = a
					}
				});
			}
			busy.startLoader();
			var sm = q.shippingMethod();
			var payload = {
				additionInformation: additionInformation
				,addressInformation: q.isVirtual() ? {} : {
					billing_address: q.billingAddress()
					,shipping_address: q.shippingAddress()
					,shipping_carrier_code: sm.carrier_code
					,shipping_method_code: sm.method_code
				}
				,customerAttributes: customAttributes
			};
			if ('doormall' == sm.carrier_code) {
				var m = uiRegistry.get('checkout.steps.shipping-step.shippingAddress.'
					+ [sm.carrier_code, sm.method_code].join('_'))
				;
				if (m) {
					var l = m.address();
					if (l.length) {
						_.set(payload, ['addressInformation', 'extension_attributes', 'doormall_location'], l);
					}
				}
			}
			r = storage
				.post(url.getUrlForSetCheckoutInformation(q), JSON.stringify(payload))
				.fail(function(r) {errorProcessor.process(r);})
				.always(function() {busy.stopLoader();}
			);
		}
		return r;
	}
});};});