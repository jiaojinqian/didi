/**
* @Author: dushaobin <dushaobin>
* @Date:   2016-11-13
* @Email:  dushaobin@we.com
* @Project: wern
* @Last modified by:   dushaobin
* @Last modified time: 2016-11-13
* @description 选择品牌模块
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
  TouchableOpacity,
  Switch
} from 'react-native';

import Button from 'react-native-button';

import NavHeader from '../../utils/NavHeader';

import Icon from 'react-native-vector-icons/EvilIcons';

import Icons from '../assets/Icons'

var AlphabetListView = require('react-native-alphabetlistview');

import Checkbox from 'react-native-custom-checkbox';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f9',
    },
    header:{
        height:42,
        backgroundColor:'#5677fc',
        alignItems:'center',
        justifyContent:'center'
    },
    headerText:{
        color:'#ffffff',
        fontSize:16
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
    },
    brandWrap:{
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },
    brand:{
        width:38,
        height:38,
        borderColor:'#eaeaea',
        borderRadius:20,
        borderWidth:1
    },
    brandName:{
        textAlign:'center',
        color:'#939396',
        margin:9
    },
    brandRow:{
        marginTop:15,
        flexDirection:'row',
        justifyContent:'space-around',
        paddingBottom:7,
        borderBottomWidth:1,
        borderColor:'#eaeaea'
    },
    brandItem:{
        flex:1,
        paddingTop:18,
        borderLeftWidth:1,
        borderBottomWidth:1,
        borderColor:'#ededee',
        marginLeft:20
    }
});

export default class CareList extends Component {
    constructor(...args){
        super(...args);

        //this._bind('toLogin','callMyPhone','openCamera');

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1.id !== r2.id
        });

        this.state = {
            dataSource: ds.cloneWithRows(['奔驰', '宝马', '沃尔沃', '大众'])
        }

    }

    convertCarArrayToMap(carList) {
        var carMap = {}; // Create the blank map
        carList.forEach(function(car) {
            if (!carMap[car.sh]) {
                // Create an entry in the map for the category if it hasn't yet been created
                carMap[car.sh] = [];
            }
            carMap[car.sh].push(car);
        });

        return carMap;

    }

    _bind(...methods){
        methods.forEach((method)=>{this[method] = this[method].bind(this)})
    }

    toLogin(){
        //Actions.pop();
        let {navigator} = this.props;
        navigator.pop();
    }

    initHeader(){
        let {route} = this.props;
        if(route.name){
            return (
                <View style={styles.header}>
                    <Text style={styles.headerText}>{route.name}</Text>
                </View>
            )
        }
        return null;
    }

    render() {
        let {
            route,
            navigator
        } = this.props;

        let focusStyle = {};

        return (
            <View style={styles.container}>
                <View style={{flex:1,backgroundColor:'#f8f8f9'}}>
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={(rowData) => {
                                return (
                                    <View>
                                        <View style={[styles.brandItem]}>

                                            <View style={{
                                                flex:1,
                                                marginRight:16,
                                                marginLeft:16,
                                                flexDirection:'row',
                                                justifyContent:'space-between',

                                            }}>
                                                <View style={{
                                                        flex:1,
                                                        flexDirection:'column'}}>

                                                    <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                                        <View style={{flexDirection:'row',}}>
                                                            <Text style={{
                                                                textAlignVertical:'center',
                                                                lineHeight:37,
                                                                fontSize:16,
                                                                paddingRight:20}}>保养时间</Text>
                                                            <Text style={{
                                                                textAlignVertical:'center',
                                                                lineHeight:37,
                                                                color:'#ff8903',
                                                                fontSize:16,
                                                                paddingRight:10}}>2017.11.12</Text>
                                                        </View>
                                                        <View>
                                                            <Text style={{
                                                                backgroundColor:'red',
                                                                color:'#fff',fontSize:10,
                                                                padding:1,
                                                                textAlignVertical:'center',
                                                                textAlign:'center'}}>下次保养</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                                        <View style={{flexDirection:'row',}}>
                                                            <Text style={{
                                                                textAlignVertical:'center',
                                                                lineHeight:37,
                                                                fontSize:16,
                                                                paddingRight:20}}>保养里程</Text>
                                                            <Text style={{
                                                                textAlignVertical:'center',
                                                                lineHeight:37,
                                                                color:'#ff8903',
                                                                fontSize:16,
                                                                paddingRight:10}}>1820</Text>
                                                                <Text style={{
                                                                    textAlignVertical:'center',
                                                                    lineHeight:37,
                                                                    color:'#1d1d26',
                                                                    fontSize:12,
                                                                    paddingRight:10}}>KM</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{flex:1,flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start'}}>
                                                            <View style={{flexDirection:'row'}}>
                                                                <Text style={{
                                                                    textAlignVertical:'center',
                                                                    lineHeight:37,
                                                                    fontSize:16,
                                                                    paddingRight:20}}>保养项目</Text>
                                                            </View>
                                                            <View style={{flex:1,flexDirection:'column'}}>
                                                                <View style={{flex:1,flexDirection:'row',justifyContent:'flex-start'}}>
                                                                    <Text style={{
                                                                        textAlignVertical:'center',
                                                                        lineHeight:37,
                                                                        fontSize:16,
                                                                        paddingRight:20}}>保养项目</Text>
                                                                    <Text style={{
                                                                        textAlignVertical:'center',
                                                                        lineHeight:37,
                                                                        fontSize:16,
                                                                        paddingRight:20}}>保养项目</Text>
                                                                </View>
                                                                <View style={{flex:1,flexDirection:'row',justifyContent:'flex-start'}}>
                                                                    <Text style={{
                                                                        textAlignVertical:'center',
                                                                        lineHeight:37,
                                                                        fontSize:16,
                                                                        paddingRight:20}}>保养项目</Text>
                                                                    <Text style={{
                                                                        textAlignVertical:'center',
                                                                        lineHeight:37,
                                                                        fontSize:16,
                                                                        paddingRight:20}}>保养项目</Text>
                                                                </View>
                                                                <View style={{flex:1,flexDirection:'row',justifyContent:'flex-start'}}>
                                                                    <Text style={{
                                                                        textAlignVertical:'center',
                                                                        lineHeight:37,
                                                                        fontSize:16,
                                                                        paddingRight:20}}>保养项目</Text>
                                                                    <Text style={{
                                                                        textAlignVertical:'center',
                                                                        lineHeight:37,
                                                                        fontSize:16,
                                                                        paddingRight:20}}>保养项目</Text>
                                                                </View>
                                                                <View style={{flex:1,flexDirection:'row',justifyContent:'flex-start'}}>
                                                                    <Text style={{
                                                                        textAlignVertical:'center',
                                                                        lineHeight:37,
                                                                        fontSize:16,
                                                                        paddingRight:20}}>保养项目</Text>
                                                                    <Text style={{
                                                                        textAlignVertical:'center',
                                                                        lineHeight:37,
                                                                        fontSize:16,
                                                                        paddingRight:20}}>保养项目</Text>
                                                                </View>
                                                                <View style={{marginBottom:30}}>
                                                                    <TouchableOpacity style={{
                                                                        borderWidth:2,
                                                                        borderRadius:5,
                                                                        borderColor:'#ff8903',
                                                                        padding:10,
                                                                        paddingRight:15,
                                                                        paddingLeft:15,
                                                                        width:70}}>
                                                                        <Text style={{
                                                                            color:'#ff8903',
                                                                            fontSize:14,
                                                                            textAlign:'center',
                                                                            textAlignVertical:'center',
                                                                        }}>编辑</Text>
                                                                    </TouchableOpacity>
                                                                </View>
                                                            </View>

                                                        </View>
                                                </View>
                                            </View>
                                        </View>

                                        <View style={{
                                            position:'absolute',
                                            width:20,
                                            height:20,
                                            backgroundColor:'#ff5959',
                                            top:25,
                                            left:10,
                                            borderRadius:10
                                        }}></View>

                                    </View>
                                )
                            }}
                            ></ListView>
                    </View>
            </View>
       );
     }
}
