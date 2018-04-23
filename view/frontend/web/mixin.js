// 2018-04-22 «What are requirejs-config.js `mixins`?» https://mage2.pro/t/5297
define([
	'df-lodash', 'uiLayout'
], function(_, layout) {'use strict'; return function(sb) {return sb.extend({
	initialize: function() {
		this._super();
		var _this = this;
		this.rates.subscribe(function(a) {
			_.each(a, function(m) {
				if ('doormall' === m.carrier_code) {
					layout([{
						component: 'Doormall_Shipping/main',
						config: {m: m},
						displayArea: 'doormall',
						name: [m.carrier_code, m.method_code].join('_'),
						parent: _this.name
					}]);
				}
			});
		});
		return this;
	},
});};});