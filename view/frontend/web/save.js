define([
	'df-lodash',
	'Magento_Checkout/js/model/quote',
	'Magento_Checkout/js/model/resource-url-manager',
	'mage/storage',
	'Magento_Checkout/js/model/error-processor',
	'Magento_Checkout/js/action/select-billing-address',
	'Aheadworks_OneStepCheckout/js/model/shipping-information/service-busy-flag',
	'Aheadworks_OneStepCheckout/js/model/same-as-shipping-flag'
	,'uiRegistry'
], function (
	_, q, resourceUrlManager, storage,
	errorProcessor, selectBillingAddressAction, serviceBusyFlag, sameAsShippingFlag, uiRegistry
) {'use strict'; return function () {
	if (!q.billingAddress() || !q.isQuoteVirtual() && sameAsShippingFlag.sameAsShipping()) {
		selectBillingAddressAction(q.shippingAddress());
	}
	var r = q.shippingMethod();
	var payload = {addressInformation: {
		billing_address: q.billingAddress()
		,shipping_carrier_code: r.carrier_code
		,shipping_method_code: r.method_code
		,shipping_address: _.extend({}, q.shippingAddress(), {
			'same_as_billing': !q.isQuoteVirtual() && sameAsShippingFlag.sameAsShipping() ? 1 : 0
		})
	}};
	var mixin = uiRegistry.get('checkout.shippingMethod');
	var m = mixin.m(r);
	if (m) {
		var l = m.address();
		if (l.length) {
			_.set(payload, ['addressInformation', 'extension_attributes', 'doormall_location'], l);
		}
	}
	serviceBusyFlag(true);
	return storage.post(resourceUrlManager.getUrlForSetShippingInformation(q), JSON.stringify(payload))
		.done(function () {serviceBusyFlag(false);})
		.fail(function (response) {errorProcessor.process(response);})
	;
}});