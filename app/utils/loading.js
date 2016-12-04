/**
* @Author: 杜绍彬 <dushaobin>
* @Date:   2016-07-05T10:13:35+08:00
* @Email:  shaobin.du@zymobi.com
* @Last modified by:   dushaobin
* @Last modified time: 2016-07-06T15:43:08+08:00
* @License: MIT
*/


import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Button from 'react-native-button';

import Icon from 'react-native-vector-icons/EvilIcons';

import * as Animatable from 'react-native-animatable';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    }
});

export default class Loading extends Component {
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
        let {loadingText} = this.props;
        return (
            <View style={{margin:20,alignItems:'center',justifyContent:'center'}}>
                <Animatable.View animation="rotate" easing="linear" duration={500} iterationCount='infinite'>
                    <Icon name="spinner-3" size={30} color="rgba(0,0,0,0.5)" />
                </Animatable.View>
                {loadingText?<Text style={{color:'rgba(0,0,0,0.5)'}}>{loadingText}</Text>:null}
            </View>
        )
     }
}


