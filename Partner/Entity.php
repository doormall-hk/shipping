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
	function id() {return $this->title();}

	/**
	 * 2018-04-20
	 * @used-by id()
	 * @return string
	 */
	function title() {return $this->v();}

	/**
	 * 2018-04-19
	 * @override
	 * @see \Df\Config\ArrayItem::sortWeight()
	 * @used-by \Df\Config\Backend\ArrayT::processI()
	 * @return int
	 */
	function sortWeight() {return 0;}

	/** 2018-04-20 @used-by \Doormall\Shipping\Partner\FE::onFormInitialized() */
	const data_url = 'data_url';

	/** 2018-04-19 @used-by \Doormall\Shipping\Partner\FE::onFormInitialized() */
	const fee = 'fee';

	/** 2018-04-20 @used-by \Doormall\Shipping\Partner\FE::onFormInitialized() */
	const icon_enable = 'icon_enable';

	/** 2018-04-20 @used-by \Doormall\Shipping\Partner\FE::onFormInitialized() */
	const icon_height = 'icon_height';

	/** 2018-04-20 @used-by \Doormall\Shipping\Partner\FE::onFormInitialized() */
	const icon_url = 'icon_url';

	/** 2018-04-20 @used-by \Doormall\Shipping\Partner\FE::onFormInitialized() */
	const icon_width = 'icon_width';

	/** 2018-04-20 @used-by \Doormall\Shipping\Partner\FE::onFormInitialized() */
	const title = 'title';
}