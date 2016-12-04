/**
* @Author: dushaobin <dushaobin>
* @Date:   2016-11-13
* @Email:  dushaobin@we.com
* @Project: wern
* @Last modified by:   dushaobin
* @Last modified time: 2016-11-13
*
*/

import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  ListView,
  Image,
  DatePickerAndroid
} from 'react-native';

import Button from 'react-native-button';

import NavHeader from '../../utils/NavHeader';

var AlphabetListView = require('react-native-alphabetlistview');

import Icon from 'react-native-vector-icons/EvilIcons';

import Icons from '../assets/Icons'

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    baseInput:{
        height:40,
        margin:5,
        borderWidth:1,
        borderRadius:3,
        borderColor:'#ccc',
        padding:5,
        fontSize:16
    },
    list: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    row:{
        flexDirection:'row',
        borderBottomWidth:1,
        alignItems:'center',
        borderColor:'#eaeaea',
        height:55,
        justifyContent:'space-between',
        backgroundColor:'#fff'
    },
    rowLabel:{
        color:'#1d1d26',
        fontSize:16
    }
});

export default class ChoiceBrand extends Component {
    constructor(...args){
        super(...args);

        //this._bind('toLogin','callMyPhone','openCamera');

    }

    openDatePicker(){
        try {
            DatePickerAndroid.open({
                // Use `new Date()` for current date.
                // May 25 2020. Month 0 is January.
            }).then((result)=>{
                //alert(JSON.stringify(result));
                if (result.action !== DatePickerAndroid.dismissedAction) {
                    // Selected year, month (0-11), day
                    alert(result.year+':'+result.month+':'+result.day);
                }

            }).catch((e)=>{
                alert(e);
            });


        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }

    }

    _bind(...methods){
        methods.forEach((method)=>{this[method] = this[method].bind(this)})
    }

    toLogin(){
        //Actions.pop();
        let {navigator} = this.props;
        navigator.pop();
    }

    render() {
        let {
            route,
            navigator
        } = this.props;

        let focusStyle = {};

        return (
            <View style={styles.container}>
                <NavHeader route={route} navigator={navigator} leftIcon="md-arrow-back" title={route.name}></NavHeader>
                <ScrollView style={{backgroundColor:'#f8f8f9'}}>
                    <View style={{backgroundColor:'#fff'}}>
                        <View style={{marginLeft:16,marginRight:16}}>
                            <View style={styles.row}>
                                <View>
                                    <Text style={styles.rowLabel}>加油日期</Text>
                                </View>
                                <View style={{flexDirection:'row',justifyContent:'flex-end',marginRight:-13}}>
                                    <Button onPress={()=>{
                                        this.openDatePicker()
                                    }}>
                                        <Text style={{color:'#a8a8aa',textAlignVertical:'center',fontSize:16}}>请选择</Text>
                                        <Icon name="chevron-right" size={40} color="#a8a8aa" />
                                    </Button>
                                </View>
                            </View>


                            <View style={styles.row}>
                                <View>
                                    <Text style={styles.rowLabel}>当前里程</Text>
                                </View>
                                <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                                    <TextInput
                                        style={{textAlignVertical:'center',textAlign:'right',paddingRight:10,fontSize:16,width:100,height:40}}
                                        placeholder="请输入"
                                        placeholderTextColor="#a8a8aa"
                                        underlineColorAndroid="transparent"
                                        />
                                    <Text style={{textAlignVertical:'center',color:'#ff8903'}}>KM</Text>
                                </View>
                            </View>

                            <View style={[styles.row,{height:86,borderBottomWidth:0}]}>
                                <View >
                                    <Text style={styles.rowLabel}>金额(元)</Text>
                                    <TextInput
                                        style={{textAlignVertical:'center',textAlign:'left',fontSize:16,width:100,height:40}}
                                        placeholder="请输入"
                                        placeholderTextColor="#a8a8aa"
                                        underlineColorAndroid="transparent"
                                        />
                                </View>
                                <View >
                                    <Text style={styles.rowLabel}>=单价（元/升）</Text>
                                    <TextInput
                                        style={{textAlignVertical:'center',textAlign:'left',fontSize:16,width:100,height:40}}
                                        placeholder="请输入"
                                        placeholderTextColor="#a8a8aa"
                                        underlineColorAndroid="transparent"
                                        />
                                </View>
                                <View>
                                    <View style={{marginRight:-20}}>
                                        <Text style={styles.rowLabel}>*油量（L）</Text>
                                        <TextInput
                                            style={{textAlignVertical:'center',textAlign:'left',fontSize:16,width:100,height:40}}
                                            placeholder="请输入"
                                            placeholderTextColor="#a8a8aa"
                                            underlineColorAndroid="transparent"
                                            />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{backgroundColor:'#fff',marginTop:10}}>
                        <View style={{marginLeft:16,marginRight:16}}>
                            <View style={styles.row}>
                                <View>
                                    <Text style={styles.rowLabel}>标号</Text>
                                </View>
                                <View style={{flexDirection:'row',justifyContent:'flex-end',marginRight:-13}}>
                                    <Button onPress={()=>{
                                        this.openDatePicker()
                                    }}>
                                        <Text style={{color:'#a8a8aa',textAlignVertical:'center',fontSize:16}}>请选择</Text>
                                        <Icon name="chevron-right" size={40} color="#a8a8aa" />
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{height:250,alignItems:'center',justifyContent:'center'}}>
                        <Image style={{height:55,width:185}} source={Icons.common.recodeTip} />
                    </View>
                </ScrollView>
                <View>
                    <Button containerStyle={{height:56,backgroundColor:'#ff8903',alignItems:'center',justifyContent:'center'}}>
                        <Text style={{color:"#fff",fontSize:18}}>保存</Text>
                    </Button>
                </View>
            </View>
       );
     }
}
