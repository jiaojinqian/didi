/**
* @Author: 焦丙乾 <jiaobingqian>
* @Date:   2016-11-05T10:38:30+08:00
* @Email:  shaobin.du@zymobi.com
* @Last modified by:   dushaobin
* @Last modified time: 2016-11-05T17:08:16+08:00
*/



import React, { Component,PropTypes } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';


/**
* ## TabIcon 
* 
* Displays the icon for the tab w/ color dependent upon selection
*/

import RNRF, {
  Route,
  Scene,
  TabBar} from 'react-native-router-flux';

/**
 * ### Redux
 *
 * ```Provider``` will tie the React-Native to the Redux store
 */
 
import {
  Provider,
  connect } from 'react-redux';
  
  
 import Icon from 'react-native-vector-icons/MaterialIcons';


class TabIco extends Component {
    render(){
        var color = this.props.selected ? '#ffffff' : '#afbfff';
        return (
            <View style={{flex:1, flexDirection:'column', backgroundColor:'#5677fc', alignItems:'center', alignSelf:'center', justifyContent:'center'}}>
                <Icon style={[{color:color},this.props.iconStyle]} name={this.props.iconName} size={this.props.size || 23} />
                <Text style={{color: color,fontSize:12}}>{this.props.title}</Text>
            </View>
      );
    }
}

const propTypes = {
    selected: PropTypes.bool,
    title: PropTypes.string,
    iconName:PropTypes.string,
    size:PropTypes.number,
    iconStyle:PropTypes.object
};


const TabIcon = (props) => {
    console.log(props);
    return (
        <TabIco iconName={props.iconName} iconStyle={props.iconStyle} size={props.size} title={props.title} selected={props.selected}></TabIco>
    )
}

TabIcon.propTypes = propTypes;

export default TabIcon;


