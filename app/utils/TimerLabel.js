/**
* @Author: 杜绍彬 <dushaobin>
* @Date:   2016-07-05T10:13:35+08:00
* @Email:  shaobin.du@zymobi.com
* @Last modified by:   dushaobin
* @Last modified time: 2016-09-23T10:59:56+08:00
* @License: MIT
*/


import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Button from 'react-native-button';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    }
});

export default class TimerLabel extends Component {
    constructor(...args){
        super(...args);
        let {startSecond} = this.props;
        this.state = {
            second:startSecond,
            timer:null
        };
        
        this._bind('updateTimer');
        
    }
    _bind(...methods){
        methods.forEach((method)=>{this[method] = this[method].bind(this)})
    }
    updateTimer(){
        
        let second = parseInt(this.state.second);
        let {onTimeEnd} = this.props;
        
        if(second < 1){
            clearTimeout(this.state.timer);
            this.setState({
                ...this.state,
                timer:null
            });
            onTimeEnd && onTimeEnd();
            return;
        }

        this.setState({
            ...this.state,
            second:second - 1
        });
    }

    componentDidMount(){
        let that = this;
        let itval = setInterval(()=>{
            that.updateTimer();
        },1000);
        this.setState({
            ...this.state,
            timer:itval
        });
    }
    
    render() {
        let {loadingText} = this.props;
        let showText = this.state.second + loadingText;
        return (
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Text style={{textAlign:'center',fontSize:16}}>{showText}</Text>
            </View>
        )
     }
}


