/**
* @Author: 杜绍彬 <dushaobin>
* @Date:   2016-07-01T09:14:43+08:00
* @Email:  shaobin.du@zymobi.com
* @Last modified by:   dushaobin
* @Last modified time: 2016-07-16T10:42:00+08:00
* @License: MIT
*/

import React, { Component } from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';


import {
    View,
    ListView,
} from 'react-native';


export function getIconByCategory(cate){
    if(!cate){
        return;
    }
    let iconNames = ['gamepad','child','university','newspaper-o','photo','bar-chart',
        'life-ring','heartbeat','paper-plane','music','bicycle','bank','rss','gears',
        'tv','comments','coffee','credit-card','book','map'
    ]
    
    return iconNames[parseInt(cate) - 1]
}

export function getCategoryColor(cate){
    if(!cate){
        return;
    }
    let colors = ['#d84315','#4e432e','#37474f','#ef6c00','#f9a825','#9e9d24',
    '#056f00','#558b2f','#9e9d24','#00695c','#00838f','#0277bd','#4527a0',
    '#6a1b9a','#ad1457','#c41411','#4db6ac','#4dd0e1','#42bd41','#a1887f','#ff8a65']
    return colors[parseInt(cate) - 1];
}

export default class CategoryIcon extends Component{
    
    render(){
        let {catId,size,color} = this.props;
        let iconName = getIconByCategory(catId);
        return (
            <View>
                {iconName?<Icon size={size||20} name={iconName} color={color || '#fff'}></Icon>:''}
            </View>
        );
    }
    
}
