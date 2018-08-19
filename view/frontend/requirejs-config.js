// 2017-04-28
// «Replace a default JS component»:
// http://devdocs.magento.com/guides/v2.0/javascript-dev-guide/javascript/custom_js.html#js_replace
// 2018-04-18
// «How to override a HTML file using a custom module?»:
// https://stackoverflow.com/a/37464758
// https://magento.stackexchange.com/a/117236
var config = {
	// 2018-04-22 «What are requirejs-config.js `mixins`?» https://mage2.pro/t/5297
    config: {mixins: {
		'Aheadworks_OneStepCheckout/js/view/shipping-method': {'Doormall_Shipping/aw/mixin': true}
		,'Magento_Checkout/js/model/shipping-save-processor/payload-extender':
				{'Doormall_Shipping/mp/payloadExtender': true}
		,'Mageplaza_Osc/js/view/shipping': {'Doormall_Shipping/mp/mixin': true}
		,'Mageplaza_Osc/js/model/shipping-save-processor/checkout': {'Doormall_Shipping/mp/save': true}
	}}
	,map: {'*': {
		'Aheadworks_OneStepCheckout/template/shipping-method.html': 'Doormall_Shipping/template/aw/methods.html'
		,'Aheadworks_OneStepCheckout/js/action/set-shipping-information': 'Doormall_Shipping/aw/save'
		,'Mageplaza_Osc/template/container/shipping.html': 'Doormall_Shipping/template/mp/methods.html'
	}}
};