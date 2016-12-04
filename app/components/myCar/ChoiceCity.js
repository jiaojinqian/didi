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
  Image
} from 'react-native';

import Button from 'react-native-button';

import NavHeader from '../../utils/NavHeader';

var AlphabetListView = require('react-native-alphabetlistview');

import Icons from '../assets/Icons'

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
        borderColor:'#eaeaea',
        borderRadius:5,
        borderWidth:1,
        padding:10,
        paddingBottom:5,
        paddingTop:5
    },
    brandName:{
        textAlign:'center',
        color:'#939396',
    },
    brandRow:{
        marginTop:15,
        flexDirection:'row',
        justifyContent:'space-around',
        paddingBottom:7,
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
    return (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{this.props.title}</Text>
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
            <View style={{height:44}}>
                <View style={[styles.brandItem,{borderBottomWidth:isLast?0:1}]}>
                    <View style={{flexDirection:'row'}}>
                        <View>
                            <Text style={{textAlignVertical:'center',lineHeight:26}}>{item}</Text>
                        </View>
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
                    <Text style={styles.sectionHeaderText}>定位城市</Text>
                </View>
                <View style={{marginLeft:16,marginRight:16,marginBottom:7}}>
                    <View style={[styles.brandRow,{justifyContent:'flex-start'}]}>
                        <View style={styles.brandWrap}>
                            <View style={styles.brand}>
                                <Button >
                                    <Image style={{width:14,height:15,marginRight:5}} source={Icons.common.local}></Image>
                                    <Text style={styles.brandName}>呼和浩特市</Text>
                                </Button>
                            </View>
                        </View>

                    </View>
                </View>


                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionHeaderText}>热门城市</Text>
                </View>
                <View style={{marginLeft:16,marginRight:16,marginBottom:15}}>
                    <View style={styles.brandRow}>
                        <View style={styles.brandWrap}>
                            <View style={styles.brand}>
                                <Button >
                                    <Text style={styles.brandName}>北京市</Text>
                                </Button>
                            </View>
                        </View>
                        <View style={styles.brandWrap}>
                            <View style={styles.brand}>
                                <Button >
                                    <Text style={styles.brandName}>上海市</Text>
                                </Button>
                            </View>
                        </View>
                        <View style={styles.brandWrap}>
                            <View style={styles.brand}>
                                <Button >
                                    <Text style={styles.brandName}>深圳市</Text>
                                </Button>
                            </View>
                        </View>
                        <View style={styles.brandWrap}>
                            <View style={styles.brand}>
                                <Button >
                                    <Text style={styles.brandName}>南京市</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                    <View style={styles.brandRow}>
                        <View style={styles.brandWrap}>
                            <View style={styles.brand}>
                                <Button >
                                    <Text style={styles.brandName}>北京市</Text>
                                </Button>
                            </View>
                        </View>
                        <View style={styles.brandWrap}>
                            <View style={styles.brand}>
                                <Button >
                                    <Text style={styles.brandName}>上海市</Text>
                                </Button>
                            </View>
                        </View>
                        <View style={styles.brandWrap}>
                            <View style={styles.brand}>
                                <Button >
                                    <Text style={styles.brandName}>深圳市</Text>
                                </Button>
                            </View>
                        </View>
                        <View style={styles.brandWrap}>
                            <View style={styles.brand}>
                                <Button >
                                    <Text style={styles.brandName}>南京市</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                </View>
            </View>);
    }
}


export default class ChoiceCity extends Component {
    constructor(...args){
        super(...args);

        //this._bind('toLogin','callMyPhone','openCamera');

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1.id !== r2.id,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });

        this.state = {
            data: {
                A: ['北京','上海','深圳'],
                B: ['北京','上海','深圳'],
                C: ['南京','上海','北京','哈尔滨'],
                D: ['惠州','广州','呼和浩特'],
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

                <View style={{paddingLeft:16,paddingRight:16,backgroundColor:'#f8f8f9'}}>
                    <View style={{borderWidth:1,overflow:"hidden",backgroundColor:'#fff',borderColor:'#ededee',borderRadius:20,marginTop:10,marginBottom:10}}>
                        <TextInput
                            multiline={false}
                            placeholder="输入地址名称"
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
