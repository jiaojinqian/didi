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
    },
    list: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',

    },
});

export default class ChoiceBrand extends Component {
    constructor(...args){
        super(...args);

        //this._bind('toLogin','callMyPhone','openCamera');

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1.id !== r2.id
        });

        this.state = {
            dataSource:ds.cloneWithRows([
                {
                    name:'3M',
                    img:''
                },
                {
                    name:'三星',
                    img:''
                },
                {
                    name:'米其林',
                    img:''
                },
                {
                    name:'博世',
                    img:''
                },{
                    name:'三菱',
                    img:''
                }
            ])
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

    render() {
        let {
            route,
            navigator
        } = this.props;

        let focusStyle = {};

        return (
            <View style={styles.container}>
                <NavHeader route={route} navigator={navigator} leftIcon="md-arrow-back" title={route.name}></NavHeader>
                <View style={{marginLeft:12,marginRight:12,marginTop:15}}>
                    <ListView contentContainerStyle={styles.list}
                        dataSource={this.state.dataSource}
                        renderRow={(rowData) => {
                            return (
                                <View style={{width:84,height:80,marginTop:7,marginRight:13,marginLeft:14}}>
                                    <View style={{borderWidth:1,borderColor:'#eaeaea',height:43,justifyContent:'center',alignItems:'center',borderRadius:5}}>
                                        <Image style={{height:30,width:30}} source={require('../../img/brand/bmw.jpg')}></Image>
                                    </View>
                                    <View style={{marginTop:15}}>
                                        <Text style={{textAlign:"center"}}>{rowData.name}</Text>
                                    </View>
                                </View>
                            )
                        }}
                      />
                </View>
            </View>
       );
     }
}
