<?php
namespace Doormall\Shipping\Partner;
// 2018-04-19
final class Entity extends \Df\Config\ArrayItem {
	/**
	 * 2018-04-19
	 * @override
	 * @see \Df\Config\ArrayItem::id()
	 * @used-by \Df\Config\A::get()
	 * @return int
	 */
	function id() {return 0;}

	/**
	 * 2018-04-19
	 * @override
	 * @see \Df\Config\ArrayItem::sortWeight()
	 * @used-by \Df\Config\Backend\ArrayT::processI()
	 * @return int
	 */
	function sortWeight() {return 0;}
}