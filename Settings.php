<?php
namespace Doormall\Shipping;
use Df\Config\A;
use Doormall\Shipping\Partner\Entity as Partner;
// 2018-04-21
/** @method static Settings s() */
final class Settings extends \Df\Config\Settings {
	/**
	 * 2018-04-21 «doorMALL» → «Shipping» → «Pickup»→ «Partners»
	 * @param int|null $id [optional]
	 * @return A|Partner|null
	 */
	function partners($id = null) {
		$r = $this->_a(Partner::class); /** @var A $r */
		return is_null($id) ? $r : $r->get(intval($id));
	}

	/**
	 * 2018-04-21
	 * @override
	 * @see \Df\Config\Settings::prefix()
	 * @used-by \Df\Config\Settings::v()
	 * @return string
	 */
	protected function prefix() {return 'doormall_shipping/pickup';}
}