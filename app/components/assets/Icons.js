/**
* @Author: dushaobin <rrd>
* @Date:   2016-11-19
* @Email:  dushaobin@we.com
* @Project: wern
* @Last modified by:   rrd
* @Last modified time: 2016-11-19
*/

import React, { Component } from 'react';

const basePath = '../../img/';

const tabBars = {
    home:require('../../img/icons/home.png'),
    homeHover:require('../../img//icons/home-hover.png'),
    shop:require('../../img/icons/shop.png'),
    shopHover:require('../../img/icons/shop-hover.png'),
    user:require('../../img/icons/user.png'),
    userHover:require('../../img/icons/user-hover.png'),
};

const actionBar ={
    back:require('../../img/icons/arrow-left.png'),
}

const common = {
    local:require('../../img/icons/local.png'),
    recodeTip:require('../../img/res/recode-tip.png'),
}

class Icon extends Component{

    render(){


    }

}

export default {
    tabBars,
    actionBar,
    common
}
