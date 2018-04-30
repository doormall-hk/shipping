define([
	'underscore',
	'Magento_Checkout/js/model/quote',
	'Magento_Checkout/js/model/resource-url-manager',
	'mage/storage',
	'Magento_Checkout/js/model/error-processor',
	'Magento_Checkout/js/action/select-billing-address',
	'Aheadworks_OneStepCheckout/js/model/shipping-information/service-busy-flag',
	'Aheadworks_OneStepCheckout/js/model/same-as-shipping-flag'
], function (
	_, q, resourceUrlManager, storage,
	errorProcessor, selectBillingAddressAction, serviceBusyFlag, sameAsShippingFlag
) {'use strict'; return function () {
	if (!q.billingAddress() || !q.isQuoteVirtual() && sameAsShippingFlag.sameAsShipping()) {
		selectBillingAddressAction(q.shippingAddress());
	}
	debugger;
	var m = q.shippingMethod();
	var payload = {addressInformation: {
		billing_address: q.billingAddress()
		,extension_attributes: {doormall_location: m.doormall_location}
		,shipping_carrier_code: m.carrier_code
		,shipping_method_code: m.method_code
		,shipping_address: _.extend({}, q.shippingAddress(), {
			'same_as_billing': !q.isQuoteVirtual() && sameAsShippingFlag.sameAsShipping() ? 1 : 0
		})
	}};
	serviceBusyFlag(true);
	return storage.post(
		resourceUrlManager.getUrlForSetShippingInformation(q),
		JSON.stringify(payload)
	).done(
		function () {
			serviceBusyFlag(false);
		}
	).fail(
		function (response) {
			errorProcessor.process(response);
		}
	);
}});