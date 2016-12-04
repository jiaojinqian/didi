/**
* @Author: 杜绍彬 <dushaobin>
* @Date:   2016-06-22T13:58:12+08:00
* @Email:  shaobin.du@zymobi.com
* @Last modified by:   dushaobin
* @Last modified time: 2016-11-05T17:49:06+08:00
*/



import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView
} from 'react-native';

import Button from 'react-native-button';

import TimerLabel from '../utils/TimerLabel';

import Keychain from 'react-native-keychain';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
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
    btn:{
        marginLeft:4,
        marginRight:4,
        height:30,
        textAlignVertical:"center",
        fontSize:16,
        fontWeight:'100',
        color:'#FFF',
        backgroundColor:"#3b50ce"
    }
});

export default class ForgetPassword extends Component {
    constructor(...args){
        super(...args);

        this._bind('toLogin','callMyPhone','openCamera');

        this.state = {
            phoneNum:'',
        };

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

    openCamera(){
        let {navigator} = this.props;
        navigator.push({
            id:'ocr',
            name:'相机'
        });
    }

    openMain(){
        let {navigator} = this.props;
        navigator.push({
            id:'main',
            name:'首页'
        });
    }

    openTestPage(){
        let {navigator} = this.props;
        navigator.push({
            id:'stores',
            name:'测试页面'
        });
    }

    openChoiceBrand(){
        let {navigator} = this.props;
        navigator.push({
            id:'choiceBrand',
            name:'请选择品牌'
        });
    }

    openChoiceCity(){
        let {navigator} = this.props;
        navigator.push({
            id:'choiceCity',
            name:'选择所在城市'
        });
    }

    openChoiceProductBrand(){
        let {navigator} = this.props;
        navigator.push({
            id:'choiceProductBrand',
            name:'请选择产品品牌'
        });
    }

    openOilwearRecord(){
        let {navigator} = this.props;
        navigator.push({
            id:'oilwearRecord',
            name:'油耗记录'
        });
    }

    openChangeCar(){
        let {navigator} = this.props;
        navigator.push({
            id:'changeCar',
            name:'更换车型'
        });
    }

    openChoiceBrand(){
        let {navigator} = this.props;
        navigator.push({
            id:'careRecord',
            name:'保养记录'
        });
    }

    callMyPhone(){
        let {
            phoneNum
        } = this.state;
        if(!phoneNum){
            alert('手机号为空！');
            return;
        }
        //SendIntent.sendPhoneCall(phoneNum);
    }

    saveToKeychain(){
        let username = 'dushaobin';
        let password = 'password';

        Keychain.setGenericPassword(username,password).then(function(){
            console.log('save password success');
            alert('save password success');
        });

    }

    readToKeychain(){
        let username = 'dushaobin';
        let password = 'password';

        Keychain.getGenericPassword().then(function(cer){
            console.log('save password success',cer);
            alert(cer.username+'  :  '+cer.password);
        }).catch(function(err){
            console.log(err);
        });

    }

    openMap(){

        let {navigator} = this.props;
        navigator.push({
            id:'map',
            name:'地图'
        });

    }

    render() {
        let focusStyle = {};
        if(this.state.emailFocus){
            focusStyle.borderColor = '#5677fc';
        }else{
            focusStyle.borderColor = '#ccc';
        }
      return (
          <View style={styles.container}>

              {this.initHeader()}

              {/* 登录 */}
              <ScrollView>
                  <View style={styles.content}>
                      <TextInput style={[styles.baseInput,focusStyle]} placeholder="邮箱" onFocus={()=>{
                          this.setState({
                              emailFocus:1
                          });

                      }} onBlur={()=>{
                          this.setState({
                              emailFocus:0
                          });
                      }} underlineColorAndroid="#3b50ce" />

                      <Button containerStyle={{}} style={styles.btn} activeOpacity={0.4} onPress={() => {
                          this.toLogin();
                      }}>发送验证邮件</Button>

                      <TextInput style={styles.baseInput} keyboardType="phone-pad" placeholder="输入电话号码" underlineColorAndroid="#3b50ce" onChangeText={(text)=>{
                                this.setState({
                                    phoneNum:text
                                })
                            }} />

                        <Button containerStyle={{margin:5}} style={styles.btn} activeOpacity={0.4} onPress={() => {
                          this.callMyPhone();
                      }}>打电话</Button>

                      <Button containerStyle={{margin:5}} style={styles.btn} activeOpacity={0.4} onPress={() => {
                          this.openCamera();
                      }}>相机</Button>

                      <Button containerStyle={{margin:5}} style={styles.btn} activeOpacity={0.4} onPress={() => {
                          this.saveToKeychain();
                      }}>保存密码到keychain</Button>

                      <Button containerStyle={{margin:5}} style={styles.btn} activeOpacity={0.4} onPress={() => {
                          this.readToKeychain();
                      }}>从keychain获取密码</Button>

                      <Button containerStyle={{margin:5}} style={styles.btn} activeOpacity={0.4} onPress={() => {
                          this.openMap();
                      }}>打开地图</Button>

                      <Button containerStyle={{margin:5}} style={styles.btn} activeOpacity={0.4} onPress={() => {
                          this.openCamera();
                      }}>打开摄像头</Button>

                      <Button containerStyle={{margin:5}} style={styles.btn} activeOpacity={0.4} onPress={() => {
                          this.openMain();
                      }}>打开主界面</Button>

                      <Button containerStyle={{margin:5}} style={styles.btn} activeOpacity={0.4} onPress={() => {
                          this.openTestPage();
                      }}>打开测试页面</Button>

                      <Button containerStyle={{margin:5}} style={styles.btn} activeOpacity={0.4} onPress={() => {
                          this.openChoiceBrand();
                      }}>打开选择品牌页面</Button>

                      <Button containerStyle={{margin:5}} style={styles.btn} activeOpacity={0.4} onPress={() => {
                          this.openChoiceCity();
                      }}>打开城市列表选择</Button>

                      <Button containerStyle={{margin:5}} style={styles.btn} activeOpacity={0.4} onPress={() => {
                          this.openChoiceProductBrand();
                      }}>产品品牌选择列表</Button>

                      <Button containerStyle={{margin:5}} style={styles.btn} activeOpacity={0.4} onPress={() => {
                          this.openOilwearRecord();
                      }}>油耗记录</Button>

                      <Button containerStyle={{margin:5}} style={styles.btn} activeOpacity={0.4} onPress={() => {
                          this.openChangeCar();
                      }}>选择我的爱车</Button>

                      <Button containerStyle={{margin:5}} style={styles.btn} activeOpacity={0.4} onPress={() => {
                          this.openChoiceBrand();
                      }}>保养记录</Button>

                      <Button containerStyle={{margin:5}} style={styles.btn} activeOpacity={0.4} onPress={() => {
                          this.openChoiceBrand();
                      }}>打开选择品牌页面</Button>
                      <Button containerStyle={{margin:5}} style={styles.btn} activeOpacity={0.4} onPress={() => {
                          this.openChoiceBrand();
                      }}>打开选择品牌页面</Button>
                      <Button containerStyle={{margin:5}} style={styles.btn} activeOpacity={0.4} onPress={() => {
                          this.openChoiceBrand();
                      }}>打开选择品牌页面</Button>
                      <Button containerStyle={{margin:5}} style={styles.btn} activeOpacity={0.4} onPress={() => {
                          this.openChoiceBrand();
                      }}>打开选择品牌页面</Button>
                  </View>
              </ScrollView>
       </View>
       );
     }
}
