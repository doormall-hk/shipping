A pickup shipping module for [doormall.hk](https://doormall.hk).

## How to install
```
composer require doormall.hk/shipping:*
bin/magento setup:upgrade
rm -rf pub/static/* && bin/magento setup:static-content:deploy -f en_US zh_Hant_HK
rm -rf var/di var/generation generated/code && bin/magento setup:di:compile
```
If you have problems with these commands, please check the [detailed instruction](https://mage2.pro/t/263).