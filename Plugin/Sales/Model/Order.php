<?php
namespace Doormall\Shipping\Plugin\Sales\Model;
use Doormall\Shipping\Partner\Entity as Partner;
use Doormall\Shipping\Settings as S;
use Magento\Sales\Model\Order as Sb;
// 2018-05-03
final class Order {
	/**
	 * 2018-05-03
	 * @see \Magento\Sales\Model\Order::getShippingDescription()
	 * https://github.com/magento/magento2/blob/2.2.4/app/code/Magento/Sales/Model/Order.php#L2951-L2959
	 * @param Sb $sb
	 * @param string $r
	 * @return string
	 */
	function afterGetShippingDescription(Sb $sb, $r) {
		list($c, $pid) = explode('_', $sb->getShippingMethod()); /** @var string $c */ /** @var string $pid */
		if ('doormall' === $c) {
			$s = dfss($this); /** @var S $s */
			$p = $s->partners($pid); /** @var Partner $p */
			/**
			 * 2018-05-11
			 * «When we pay for the order, the pick store code and address is not picked up at the backend»
			 * https://github.com/doormall-hk/shipping/issues/5
			 * $l is `null` if the order is not yet placed:
			 * @used-by \Magento\Quote\Model\QuoteManagement::submitQuote() 
			 */
			if ($l = dfa(df_oi_get(null, $sb), 'doormall_location')) {  /** @var string $l */
				$ls = $p->locationM($l); /** @var string $ls */
				$r = sprintf('%s - %s (%s)', $r, $l, $ls);
			};
		}
		return $r;
	}
}