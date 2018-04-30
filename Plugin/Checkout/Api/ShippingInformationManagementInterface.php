<?php
namespace Doormall\Shipping\Plugin\Checkout\Api;
use Magento\Checkout\Api\Data\ShippingInformationInterface as ISI;
use Magento\Checkout\Api\ShippingInformationManagementInterface as Sb;
use Magento\Checkout\Model\ShippingInformation as SI;
use Magento\Quote\Api\Data\CartInterface as IQ;
use Magento\Quote\Model\Quote as Q;
// 2018-04-30
final class ShippingInformationManagementInterface {
	/**
	 * 2018-04-30
	 * @see \Magento\Checkout\Api\ShippingInformationManagementInterface::saveAddressInformation():
	 * https://github.com/magento/magento2/blob/2.2.3/app/code/Magento/Checkout/Api/ShippingInformationManagementInterface.php#L14-L22
	 * @see \Magento\Checkout\Model\ShippingInformationManagement::saveAddressInformation():
	 * https://github.com/magento/magento2/blob/2.2.3/app/code/Magento/Checkout/Model/ShippingInformationManagement.php#L140-L190
	 * https://astrio.ru/blog/magento2-checkout-modifying
	 * @param Sb $sb
	 * @param int $qid
	 * @param ISI|SI $si
	 */
	function beforeSaveAddressInformation(Sb $sb, $qid, ISI $si) {
		$q = df_quote_r()->getActive($qid); /** @var IQ|Q $q */
		// 2018-04-30 "How is a quote's `ext_shipping_info` property implemented and used?"
		// https://mage2.pro/t/5507
		$q->setExtShippingInfo($si->getExtensionAttributes()->getDoormallLocation());
	}
}