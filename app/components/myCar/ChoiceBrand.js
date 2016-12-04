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
  Image
} from 'react-native';

import Button from 'react-native-button';

import NavHeader from '../../utils/NavHeader';

var AlphabetListView = require('react-native-alphabetlistview');


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f9',
    },
    content:{
        flex:1,
        backgroundColor:'#FAFAFA'
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
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
    baseInput:{
        height:40,
        margin:5,
        borderWidth:1,
        borderRadius:3,
        borderColor:'#ccc',
        padding:5,
        fontSize:16
    },
    sectionHeader:{
        paddingLeft:16,
        backgroundColor: '#eaeaea',
        height:24
    },
    sectionHeaderText:{
        textAlign:'left',
        textAlignVertical:'center',
        lineHeight:24,
        color:'#1d1d26',
        fontWeight:'400',
        fontSize:12
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
        marginLeft:16,
        marginRight:16,
        height:43,
        borderBottomWidth:1,
        borderColor:'#eaeaea',
        justifyContent:'center',
        alignItems:'flex-start'
    }
});

class SectionHeader extends Component {
  render() {
    // inline styles used for brevity, use a stylesheet when possible
    if(this.props.title === "*" ){
        return null;
    }
    return (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{this.props.title === "*" ? '热门品牌':this.props.title}</Text>
        </View>
    );
  }
}

class SectionItem extends Component {
  render() {
    return (
      <Text style={{color:'#b5b5b6'}}>{this.props.title}</Text>
    );
  }
}

class Cell extends Component {
    reanderNormal(){

    }
    render() {
        let {
            sectionId,
            item,
            isLast
        } = this.props;
        if(sectionId === '*'){
            return <View></View>
        }
        return (
            <View style={[styles.brandItem,{borderBottomWidth:isLast?0:1}]}>
                <View style={{flexDirection:'row'}}>
                    <Image style={[styles.brand],{width:26,height:26}} source={require('../../img/brand/bmw.jpg')}></Image>
                    <View style={{paddingLeft:10,alignItems:'center'}}>
                        <Text style={{textAlignVertical:'center',lineHeight:26}}>{item}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

class Header extends Component {
    render() {
        return (
            <View style={{height:220}}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionHeaderText}>热门品牌</Text>
                </View>
                <View style={{marginLeft:16,marginRight:16,marginBottom:15}}>
                    <View style={styles.brandRow}>
                        <View style={styles.brandWrap}>
                            <Image style={[styles.brand]} source={require('../../img/brand/bmw.jpg')}></Image>
                            <Text style={styles.brandName}>奔驰</Text>
                        </View>
                        <View style={styles.brandWrap}>
                            <Image style={[styles.brand]} source={require('../../img/brand/bmw.jpg')}></Image>
                            <Text style={styles.brandName}>奔驰</Text>
                        </View>
                        <View style={styles.brandWrap}>
                            <Image style={[styles.brand]} source={require('../../img/brand/bmw.jpg')}></Image>
                            <Text style={styles.brandName}>奔驰</Text>
                        </View>
                        <View style={styles.brandWrap}>
                            <Image style={[styles.brand]} source={require('../../img/brand/bmw.jpg')}></Image>
                            <Text style={styles.brandName}>奔驰</Text>
                        </View>
                        <View style={styles.brandWrap}>
                            <Image style={[styles.brand]} source={require('../../img/brand/bmw.jpg')}></Image>
                            <Text style={styles.brandName}>奔驰</Text>
                        </View>
                    </View>
                    <View style={styles.brandRow}>
                        <View style={styles.brandWrap}>
                            <Image style={[styles.brand]} source={require('../../img/brand/bmw.jpg')}></Image>
                            <Text style={styles.brandName}>奔驰</Text>
                        </View>
                        <View style={styles.brandWrap}>
                            <Image style={[styles.brand]} source={require('../../img/brand/bmw.jpg')}></Image>
                            <Text style={styles.brandName}>宝马</Text>
                        </View>
                        <View style={styles.brandWrap}>
                            <Image style={[styles.brand]} source={require('../../img/brand/bmw.jpg')}></Image>
                            <Text style={styles.brandName}>宝马</Text>
                        </View>
                        <View style={styles.brandWrap}>
                            <Image style={[styles.brand]} source={require('../../img/brand/bmw.jpg')}></Image>
                            <Text style={styles.brandName}>丰田</Text>
                        </View>
                        <View style={styles.brandWrap}>
                            <Image style={[styles.brand]} source={require('../../img/brand/bmw.jpg')}></Image>
                            <Text style={styles.brandName}>丰田</Text>
                        </View>
                    </View>
                </View>
            </View>);
    }
}


export default class ChoiceBrand extends Component {
    constructor(...args){
        super(...args);

        //this._bind('toLogin','callMyPhone','openCamera');

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1.id !== r2.id,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });

        this.state = {
            data: {
                A: ['奔驰','宝马','沃尔沃'],
                B: ['奔驰','宝马','沃尔沃'],
                C: ['some','entries','are here'],
                D: ['some','entries','are here'],
                E: ['some','entries','are here'],
                F: ['some','entries','are here'],
                G: ['some','entries','are here'],
                H: ['some','entries','are here'],
                I: ['some','entries','are here'],
                J: ['some','entries','are here'],
                K: ['some','entries','are here'],
                L: ['some','entries','are here'],
                M: ['some','entries','are here'],
                N: ['some','entries','are here'],
                O: ['some','entries','are here'],
                P: ['some','entries','are here'],
                Q: ['some','entries','are here'],
                R: ['some','entries','are here'],
                S: ['some','entries','are here'],
                T: ['some','entries','are here'],
                U: ['some','entries','are here'],
                V: ['some','entries','are here'],
                W: ['some','entries','are here'],
                X: ['some','entries','are here'],
                Y: ['some','entries','are here'],
                Z: ['some','entries','are here'],
            }
        };

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
                {/*<View style={{flex:1}}>
                    <ListView
                        dataSource={this.state.dataSource}
                        enableEmptySections={true}
                        renderScrollComponent = {(props)=>{
                            return (<ScrollView></ScrollView>);
                        }}
                        renderSectionHeader = {(sectionData, sectionID)=>{
                            return (<Text style={{fontWeight: "700"}}>{sectionID}</Text>);
                        }}
                        renderRow={(rowData) => {
                            return (
                                <View style={{height:200}}>
                                    <Text>{rowData.name}</Text>
                                </View>
                            );
                        }}
                    />
                </View >*/}
                <View style={{paddingLeft:16,paddingRight:16,backgroundColor:'#f8f8f9'}}>
                    <View style={{borderWidth:1,overflow:"hidden",backgroundColor:'#fff',borderColor:'#ededee',borderRadius:20,marginTop:10,marginBottom:10}}>
                        <TextInput
                            multiline={false}
                            placeholder="输入品牌名称"
                            placeholderTextColor="#bbbbbe"
                            underlineColorAndroid="transparent"
                            style={{height: 40,textAlign:'center'}}
                        ></TextInput>
                    </View>
                </View>
                <AlphabetListView
                    data={this.state.data}
                    cell={Cell}
                    headerHeight={220}
                    header={Header}
                    cellHeight={44}
                    sectionHeader={SectionHeader}
                    sectionListItem={SectionItem}
                    sectionHeaderHeight={25}
                  />
            </View>
       );
     }
}
