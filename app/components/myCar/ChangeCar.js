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
        height:70,
        borderBottomWidth:1,
        borderColor:'#eaeaea',
    }
});

export default class ChoiceBrand extends Component {
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
                <NavHeader route={route} navigator={navigator} leftIcon="md-arrow-back" title={route.name}></NavHeader>
                    <View style={{flex:1,backgroundColor:'#f8f8f9'}}>
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={(rowData) => {
                                return (
                                    <View style={[styles.brandItem]}>
                                        <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                                            <View style={{
                                                    marginLeft:16,
                                                    marginRight:16,
                                                    height:70,
                                                    flex:1,
                                                    alignItems:'center',
                                                    flexDirection:'row'}}>
                                                <Image style={[styles.brand,{width:37,height:37}]} source={require('../../img/brand/bmw.jpg')}></Image>
                                                <View style={{paddingLeft:10,alignItems:'center'}}>
                                                    <Text style={{textAlignVertical:'center',lineHeight:37,fontSize:16}}>{rowData}</Text>
                                                </View>
                                            </View>
                                            <View style={{width:50,alignItems:'center',justifyContent:'center'}}>
                                                 <Checkbox
                                                     checked={true}
                                                     size={35}
                                                     style={{backgroundColor: '#ff8903', color:'#fff', margin:10,borderRadius: 20}}
                                                 />
                                            </View>
                                        </View>
                                    </View>
                                )
                            }}
                            ></ListView>
                    </View>
                    <View>
                        <View style={{justifyContent:'center',alignItems:'center'}}>
                            <Image style={{width:134,height:14,margin:20}} source={require('../../img/res/change-car-tip.png')}></Image>
                        </View>
                        <Button containerStyle={{height:46,backgroundColor:'#ff8903',alignItems:'center',justifyContent:'center'}}>
                            <Text style={{color:"#fff",fontSize:18}}>保存</Text>
                        </Button>
                    </View>

            </View>
       );
     }
}
