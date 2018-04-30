// 2017-04-28
// «Replace a default JS component»:
// http://devdocs.magento.com/guides/v2.0/javascript-dev-guide/javascript/custom_js.html#js_replace
// 2018-04-18
// «How to override a HTML file using a custom module?»:
// https://stackoverflow.com/a/37464758
// https://magento.stackexchange.com/a/117236
var config = {
    config: {
    	// 2018-04-22 «What are requirejs-config.js `mixins`?» https://mage2.pro/t/5297
        mixins: {'Aheadworks_OneStepCheckout/js/view/shipping-method': {'Doormall_Shipping/mixin': true}}
    },
	map: {'*': {
		'Aheadworks_OneStepCheckout/template/shipping-method.html': 'Doormall_Shipping/template/methods.html'
		,'Aheadworks_OneStepCheckout/js/action/set-shipping-information': 'Doormall_Shipping/save'
	}}
};