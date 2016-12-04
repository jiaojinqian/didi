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

import ScrollableTabView from 'react-native-scrollable-tab-view';

import HeaderTabBar from '../../utils/HeaderTabBar'

import CareList from './CareList'


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

        let {route,navigator} = this.props;

        return (
            <ScrollableTabView
                  style={{backgroundColor:'#fff'}}
                  initialPage={0}
                  tabBarPosition='top'
                  renderTabBar={() => <HeaderTabBar header={<NavHeader route={route} navigator={navigator} leftIcon="md-arrow-back" title={route.name}></NavHeader>} />}
                  >
                  <ScrollView
                      tabLabel={{
                          iconName:'home',
                          name:'全部'}}
                      onScroll={this.projectScroll}
                      style={[styles.tabView]}>
                      <View>
                          <CareList route={route} navigator={navigator} ></CareList>
                      </View>
                  </ScrollView>
                  <ScrollView
                      tabLabel={{
                          iconName:'',
                          name:'滴滴保养'}}
                      onScroll={this.teamScroll}
                      style={styles.tabView}>
                      <View>
                          <CareList route={route} navigator={navigator} ></CareList>
                      </View>
                  </ScrollView>
                  <ScrollView
                      tabLabel={{
                          iconName:'user',
                          name:'自助保养'}} style={styles.tabView}>
                      <View >
                          <CareList route={route} navigator={navigator} ></CareList>
                      </View>
                  </ScrollView>
              </ScrollableTabView>
        );

     }
}
