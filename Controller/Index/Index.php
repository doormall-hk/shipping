<?php
namespace Doormall\Shipping\Controller\Index;
use Df\Framework\W\Result\Json;
use Doormall\Shipping\Partner\Entity as Partner;
use Doormall\Shipping\Settings as S;
/**
 * 2018-04-24
 * @final Unable to use the PHP «final» keyword here because of the M2 code generation.
 * @method S s() 
 */
class Index extends \Df\Shipping\Action {
	/**
	 * 2018-04-24
	 * @final Unable to use the PHP «final» keyword here because of the M2 code generation.
	 * @override
	 * @see \Magento\Framework\App\Action\Action::execute()
	 * @used-by \Magento\Framework\App\Action\Action::dispatch():
	 * 		$result = $this->execute();
	 * https://github.com/magento/magento2/blob/2.2.1/lib/internal/Magento/Framework/App/Action/Action.php#L84-L125
	 * @return Json
	 */
	function execute() {
		/** @var string $pid */ /** @var string $l1 */ /** @var string $l2 */
		list($pid, $l1, $l2) = array_values(df_request(['pid', 'l1', 'l2']));
		$p = $this->s()->partners($pid); /** @var Partner $p */
		return Json::i($p->locations()[$l1][$l2]);
	}
}