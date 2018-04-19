<?php
namespace Doormall\Shipping\Partner;
use Doormall\Shipping\Partner\Entity as O;
/**
 * 2018-04-19
 * @final Unable to use the PHP «final» keyword here because of the M2 code generation. 
 * This class is not a singleton:
 * @see \Magento\Framework\Data\Form\AbstractForm::addField():
 * 		$element = $this->_factoryElement->create($type, ['data' => $config]);
 * https://github.com/magento/magento2/blob/2.2.0-RC1.8/lib/internal/Magento/Framework/Data/Form/AbstractForm.php#L137-L159
 */
class FE extends \Df\Framework\Form\Element\Fieldset {
	/**
	 * 2018-04-19
	 * @override
	 * @see \Df\Framework\Form\Element\Fieldset::onFormInitialized()
	 * @used-by \Df\Framework\Plugin\Data\Form\Element\AbstractElement::afterSetForm()
	 */
	final function onFormInitialized() {
		parent::onFormInitialized();
		// 2016-07-30 This CSS class will be applied to the <fieldset> DOM node.
		$this->addClass('doormall-shipping-partner');
		$this->money(O::fee, 'Fee');
	}
}