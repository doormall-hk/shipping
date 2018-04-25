<?php
namespace Doormall\Shipping\Controller\Index;
use Df\Framework\W\Result\Json;
/**
 * 2018-04-24
 * @final Unable to use the PHP «final» keyword here because of the M2 code generation.
 * @method \Doormall\Shipping\Settings s()
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
	function execute() {return Json::i($this->s()->partners(df_request('pid'))->locations()[df_request('l')]);}
}