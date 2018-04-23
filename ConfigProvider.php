<?php
namespace Doormall\Shipping;
use Doormall\Shipping\Partner\Entity as Partner;
// 2018-04-23
/** @method Settings s() */
final class ConfigProvider extends \Df\Shipping\ConfigProvider {
	/**
	 * 2018-04-23
	 * @override
	 * @see \Df\Shipping\ConfigProvider::config()
	 * @used-by \Df\Shipping\ConfigProvider::getConfig()
	 * @return array(string => mixed)
	 */
	protected function config() {return df_map_r(function(Partner $p) {return [$p->id(), [
		'img' => ['height' => $p['icon_height'], 'src' => $p['icon_url'], 'width' => $p['icon_width']]
	]];}, $this->s()->partners());}
}