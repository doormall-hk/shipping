<?php
namespace Doormall\Shipping\Observer;
use Magento\Framework\Event\Observer as Ob;
use Magento\Framework\Event\ObserverInterface as IOb;
use Magento\Quote\Model\Quote as Q;
// 2018-05-01
final class QuoteSubmitBefore implements IOb {
	/**
	 * 2018-05-01
	 * @override
	 * @see IOb::execute()
	 * @used-by \Magento\Framework\Event\Invoker\InvokerDefault::_callObserverMethod()
	 * @param Ob $ob
	 */
	function execute(Ob $ob) {
		$q = $ob['quote']; /** @var Q $q */
		if ($l = $q->getExtShippingInfo()) {
			df_oi_add($ob['order'], ['doormall_location' => $l]);
		}
	}
}