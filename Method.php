<?php
namespace Doormall\Shipping;
use Magento\Quote\Model\Quote\Address\RateRequest as Req;
use Magento\Quote\Model\Quote\Address\RateResult\Method as ResM;
use Magento\Shipping\Model\Carrier\AbstractCarrier as AC; // 2018-04-17 It is used by PHPDoc.
use Magento\Shipping\Model\Carrier\AbstractCarrierInterface as IAC; // 2018-04-17 It is used by PHPDoc.
use Magento\Shipping\Model\Carrier\CarrierInterface as IC; // 2018-04-17 It is used by PHPDoc.
use Magento\Shipping\Model\Rate\Result as Res;
// 2018-04-17
class Method extends \Df\Shipping\Method {
	/**
	 * 2018-04-17
	 * @override
	 * @see IAC::collectRates()
	 * https://github.com/magento/magento2/blob/2.2.3/app/code/Magento/Shipping/Model/Carrier/AbstractCarrierInterface.php#L24-L31
	 * @param Req $req
	 * @return Res
	 */
	function collectRates(Req $req) {
		$r = df_new_om(Res::class); /** @var Res $r */
		$m = df_new_omd(ResM::class, [
			'carrier' => $this->getCarrierCode()
			,'carrier_title' => 'Pick-up'
			,'cost' => 10
			,'method' => 0
			,'method_title' => 'Default'
			,'price' => 10
		]); /** @var ResM $m */
		$r->append($m);
		return $r;
	}

	/**
	 * 2018-04-17
	 * @override
	 * @see IC::getAllowedMethods()
	 * 1) @used-by \Magento\Shipping\Model\Config\Source\Allmethods::toOptionArray():
	 *	foreach ($carriers as $carrierCode => $carrierModel) {
	 *		if (!$carrierModel->isActive() && (bool)$isActiveOnlyFlag === true) {
	 *			continue;
	 *		}
	 *		$carrierMethods = $carrierModel->getAllowedMethods();
	 *		if (!$carrierMethods) {
	 *			continue;
	 *		}
	 *		$carrierTitle = $this->_scopeConfig->getValue(
	 *			'carriers/' . $carrierCode . '/title',
	 *			\Magento\Store\Model\ScopeInterface::SCOPE_STORE
	 *		);
	 *		$methods[$carrierCode] = ['label' => $carrierTitle, 'value' => []];
	 *		foreach ($carrierMethods as $methodCode => $methodTitle) {
	 *			$methods[$carrierCode]['value'][] = [
	 *				'value' => $carrierCode . '_' . $methodCode,
	 *				'label' => '[' . $carrierCode . '] ' . $methodTitle,
	 *			];
	 *		}
	 *	}
	 * https://github.com/magento/magento2/blob/2.2.3/app/code/Magento/Shipping/Model/Config/Source/Allmethods.php#L34-L67
	 * 2) @used-by \Magento\InstantPurchase\Model\ShippingMethodChoose\CarrierFinder::getCarriersForCustomerAddress()
	 *	$request = new DataObject([
	 *		'dest_country_id' => $address->getCountryId()
	 *	]);
	 *	$carriers = [];
	 *	foreach ($this->carriersConfig->getActiveCarriers($this->storeManager->getStore()->getId()) as $carrier) {
	 *		$checked = $carrier->checkAvailableShipCountries($request);
	 *		if (false !== $checked && null === $checked->getErrorMessage() && !empty($checked->getAllowedMethods())) {
	 *			$carriers[] = $checked;
	 *		}
	 *	}
	 * https://github.com/magento/magento2/blob/2.2.3/app/code/Magento/InstantPurchase/Model/ShippingMethodChoose/CarrierFinder.php#L41-L62
	 * @return array(string => string)
	 */
	function getAllowedMethods() {return [0 => 'Default'];}

	/**
	 * 2018-04-17
	 * @used-by \Df\Shipping\Method::codeS()
	 */
	const CODE = 'doormall';
}