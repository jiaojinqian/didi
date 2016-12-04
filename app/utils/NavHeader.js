/**
* @Author: 杜绍彬 <dushaobin>
* @Date:   2016-07-05T10:13:35+08:00
* @Email:  shaobin.du@zymobi.com
* @Last modified by:   dushaobin
* @Last modified time: 2016-07-07T20:04:24+08:00
* @License: MIT
*/


import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image
} from 'react-native';

import Button from 'react-native-button';

import Icon from 'react-native-vector-icons/Ionicons';

import Icons from '../components/assets/Icons';

const styles = StyleSheet.create({
    header:{
        height:43,
        backgroundColor:'#fff',
        flexDirection:'row'
    },
    htCon:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        paddingLeft:5,
        paddingRight:5
    },
    headerText:{
        color:'#000',
        fontSize:16
    },
    iconCon:{
        width:40,
        justifyContent:'center',
        alignItems:'center',
        flexWrap:'nowrap',
    }
});

export default class NavHeader extends Component {
    constructor(...args){
        super(...args);

        this.state = {
            project:{
                isScrollBottom:false,
                isBottomTrigger:false,
                isScrollTop:false
            }
        };

        this._bind('left','right');

    }
    _bind(...methods){
        methods.forEach((method)=>{this[method] = this[method].bind(this)})
    }
    left(){
        let {navigator,leftAction} = this.props;
        if(leftAction){
            leftAction();
            return;
        }
        if(navigator){
            navigator.pop();
        }
    }

    right(){
        let {rightAction} = this.props;
        if(rightAction){
            rightAction();
            return;
        }
    }

    render() {
        let {title,leftIcon,rightIcon} = this.props;
        return (
            <View style={styles.header}>
                <View style={styles.iconCon}>
                    {leftIcon ? <Button onPress={this.left}> <Image style={{width:30,height:27}} source={Icons.actionBar.back} /></Button> : null}
                </View>

                <View style={styles.htCon}>
                    <Text numberOfLines={1} style={[styles.headerText]}>{title}</Text>
                </View>

                <View style={styles.iconCon}>
                    {rightIcon ? <Button onPress={this.right}><Icon name={rightIcon} color='#bbbbbe' size={30}></Icon></Button> : null}
                </View>

            </View>
        )
     }
}

NavHeader.propTypes = {
    leftIcon:React.PropTypes.string,
    rightIcon:React.PropTypes.string,
    headerText:React.PropTypes.string
}
