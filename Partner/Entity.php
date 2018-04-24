<?php
namespace Doormall\Shipping\Partner;
// 2018-04-19
final class Entity extends \Df\Config\ArrayItem {
	/**
	 * 2018-04-21
	 * @used-by \Doormall\Shipping\Method::collectRates()
	 * @return int
	 */
	function fee() {return $this->f();}

	/**
	 * 2018-04-19
	 * @override
	 * @see \Df\Config\ArrayItem::id()
	 * @used-by \Df\Config\A::get()
	 * @used-by \Doormall\Shipping\Method::collectRates()
	 * @return int
	 */
	function id() {return $this->v();}

	/**
	 * 2018-04-23
	 * @used-by \Doormall\Shipping\ConfigProvider::config()
	 * @return array(string => int|string)
	 */
	function img() {return !$this[self::icon_enable] ? [] : [
		'height' => $this[self::icon_height], 'src' => $this[self::icon_url], 'width' => $this[self::icon_width]
	];}

	/**
	 * 2018-04-23
	 * @used-by \Doormall\Shipping\ConfigProvider::config()
	 * @used-by \Doormall\Shipping\Controller\Index\Index::execute()
	 * @param string|null $k [optional]
	 * @return array(string => array(string => string[]))
	 */
	function locations($k = null) {return dfa_deep(df_cache_get_simple(null, function($url) {
		/** @var array(string => array(string => string[])) $r */
		if (!$url) {
			$r = [];
		}
		else {
			/** @var string[][] $a */
			$a = df_tail(array_map('str_getcsv', df_explode_n(file_get_contents($url))));
			$lang = function($l) use($a) {$o = 'en' === $l ? 0 : 4; return [$l => array_map(
				function(array $a) {return array_map(function(array $i) {return df_map_r(
					$i, function(array $j) {return [$j[0], $j[1]];}
				);}, dfa_group($a, 1));}
				,dfa_group(array_map(function(array $i) use($o) {return array_slice($i, $o, 4);}, $a), 1)
			)];}; /** @var array(string => array(string => string[])) $lang */
			$r = $lang('en') + $lang('zh');
		}
		return $r;
	}, [], $this[self::data_url]), df_cc_path(df_lang_zh_en(), $k));}

	/**
	 * 2018-04-19
	 * @override
	 * @see \Df\Config\ArrayItem::sortWeight()
	 * @used-by \Df\Config\Backend\ArrayT::processI()
	 * @return int
	 */
	function sortWeight() {return 0;}

	/**
	 * 2018-04-21
	 * @used-by \Doormall\Shipping\Method::collectRates()
	 * @return int
	 */
	function title() {return $this->v(null, df_lang_zh(self::titleZH, self::titleEN));}

	/**
	 * 2018-04-20
	 * @used-by locations()
	 * @used-by \Doormall\Shipping\Partner\FE::onFormInitialized()
	 */
	const data_url = 'data_url';

	/**
	 * 2018-04-19
	 * @see fee()
	 * @used-by \Doormall\Shipping\Partner\FE::onFormInitialized()
	 */
	const fee = 'fee';

	/**
	 * 2018-04-20
	 * @used-by \Doormall\Shipping\Partner\FE::onFormInitialized()
	 */
	const icon_enable = 'icon_enable';

	/**
	 * 2018-04-20
	 * @used-by img()
	 * @used-by \Doormall\Shipping\Partner\FE::onFormInitialized()
	 */
	const icon_height = 'icon_height';

	/**
	 * 2018-04-20
	 * @used-by img()
	 * @used-by \Doormall\Shipping\Partner\FE::onFormInitialized()
	 */
	const icon_url = 'icon_url';

	/**
	 * 2018-04-20
	 * @used-by img()
	 * @used-by \Doormall\Shipping\Partner\FE::onFormInitialized()
	 */
	const icon_width = 'icon_width';

	/** 2018-04-20 @used-by \Doormall\Shipping\Partner\FE::onFormInitialized() */
	const id = 'id';

	/**
	 * 2018-04-21
	 * @used-by title()
	 * @used-by \Doormall\Shipping\Partner\FE::onFormInitialized()
	 */
	const titleEN = 'titleEN';

	/**
	 * 2018-04-21
	 * @used-by title()
	 * @used-by \Doormall\Shipping\Partner\FE::onFormInitialized()
	 */
	const titleZH = 'titleZH';
}