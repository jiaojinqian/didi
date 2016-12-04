/**
* @Author: 杜绍彬 <dushaobin>
* @Date:   2016-06-21T18:08:58+08:00
* @Email:  shaobin.du@zymobi.com
* @Last modified by:   dushaobin
* @Last modified time: 2016-11-05T10:36:12+08:00
*/



import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    AsyncStorage
} from 'react-native';

import Button from 'react-native-button'

import { connect } from 'react-redux'

//import { Actions } from 'react-native-router-flux';

import Icon from 'react-native-vector-icons/EvilIcons';

import TimerLabel from '../utils/TimerLabel'

//import SendIntent from 'react-native-send-intent';


import {
    BEFORE_LOGIN,LOGIN_SUCCESS,LOGIN_FAILED,
    loginSuccess,login,autoLogin,pushPhoneCode
} from '../actions/user'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    avatar:{
        height:180,
        backgroundColor:'red'
    },
    avatarContent:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#FFF'
    },
    content:{
        flex:1,
        backgroundColor:'#FFF'
    },
    loginBtn:{
        height:20
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
    footer:{
        height:40
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    input:{
        fontSize:14,
        height:48,
        padding:5,
        backgroundColor:'#fafafa',
        marginBottom:5,
    }
});

class Lancher extends Component {
    
    constructor(...args){
        super(...args);
        
        this._bind('toForgetPassword','toRegister','callMyPhone','toMain');
        
        this.state = {
            username:'',
            password:'',
            vcode:'',
            isShowTime:false
        };
        
        //this.refreshVcode();
        
        //this.refreshVcode();
        //this.initUserInfo();
        
        this.isTrigged = false;
        
    }
    
    initUserInfo(){
        
        let {navigator,loginSuccess} = this.props;
        
        let that = this;
        
        AsyncStorage.getItem('userInfo').then((info)=>{
            let user = JSON.parse(info);
            if(user){
                that.setState({
                    username:user.account
                });
                
                that.saveUserInfo({
                    info:{
                        message:user
                    }
                });
                
            }
        });
        
    }
    
    callMyPhone(phoneNum){
        //SendIntent.sendPhoneCall(phoneNum);
    }

    toForgetPassword(){
        
        let {navigator} = this.props;
        navigator.push({
            id:'forgetPassword',
            name:'忘记密码'
        });
        
    }
    
    toRegister(){
        
        let {navigator} = this.props;
        navigator.push({
            id:'register',
            name:'注册',
            type:'FloatFromBottom'
        });
        
    }
    
    _bind(...methods){
        methods.forEach((method)=>{this[method] = this[method].bind(this)})
    }
    
    toMain(){
        let {navigator,login,user} = this.props;
        
        if(!this.state.username){
            alert('用户名不能为空！');
            return;
        }
        
        if(!this.state.vcode){
            alert('短信验证码不能为空!');
            return;
        }
        
        login({
            phone:this.state.username,
            code:this.state.vcode
        });
        
        //Actions.main();
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
    
    componentWillUnmount(){
        
    }
    
    componentWillReceiveProps(nextProp){
        let {
            user
        } = this.props;
        
        if(nextProp.user.state !== user.state){
            this.updateState(nextProp.user);
        }
        
    }
    
    saveUserInfo(user){
        let {
            navigator,
            autoLogin
        } = this.props;
        
        navigator.push({
            id:'main',
            name:'首页'
        });
        
        // AsyncStorage.setItem('userInfo',JSON.stringify(user.info.message)).then(()=>{
        //     navigator.push({
        //         id:'main',
        //         name:'首页',
        //         type:"FloatFromBottom"
        //     });
        //     autoLogin(user.info)
        // }).catch((e) =>{
        // });
        
        
    }
    
    showCountTimer(){
        this.setState({
            ...this.state,
            isShowTime:true
        })
    }
    
    hideCountTimer(){
        this.setState({
            ...this.state,
            isShowTime:false
        })
    }
    
    getPhoneVcode(){
        let {username} = this.state;
        let {pushPhoneCode} = this.props;
        if(!/^\d{11}$/ig.test(username)){
            alert('手机号不正确')
            return;
        }
        pushPhoneCode({
            phone:username
        });
        this.showCountTimer();
    }
    

    updateState(user){
        
        switch (user.state) {
            case LOGIN_SUCCESS:
                alert("登录成功");
                this.saveUserInfo(user);
                break;
            case LOGIN_FAILED:
                if(this.isTrigged){
                    return;
                }
                if(user.info.message){
                    alert(user.info.message || '错误');
                }
                
                break;
            default:
                
        }
    }
    
    render() {
        let {user,vcode} = this.props;
        // this.updateState();
        
        return (
            <View style={styles.container}>
                {/*this.initHeader()*/}
                {/* 头像 */}
                <View style={styles.avatar}>
                    <View style={[styles.avatarContent]}>
                        <View style={{width:120,height:120,overflow:'hidden'}}>
                            <Image source={{uri: 'http://www.didizhuanxiu.cn/logo.png'}} style={{width: 120,height:120}} />
                        </View>
                    </View>
                </View>
                {/* 登录 */}
                <View style={styles.content}>
                    <View style={{flexDirection:'row',marginRight:5}}>
                        <View style={{flex:1,marginLeft:5}}>
                            <TextInput style={styles.input} onChangeText={(text)=>{
                                this.setState({
                                    username:text
                                })
                            }} placeholder="电话" keyboardType="phone-pad" value={this.state.username} />
                        </View>
                        {this.state.isShowTime?
                        <View style={{marginBottom:4,width:120,paddingLeft:5,backgroundColor:'#ccc'}}>
                            <TimerLabel startSecond="60" loadingText="秒后重发" onTimeEnd={()=>{
                                    this.hideCountTimer();
                                }}></TimerLabel>
                        </View> :
                        <Button containerStyle={{width:120,marginBottom:5,backgroundColor:'#d66a42'}} onPress={()=>{this.getPhoneVcode()}}>
                            <Text style={{textAlign:'center',textAlignVertical:"center",fontSize:14,fontWeight:'400',color:'#fff',height:48}}>获取验证码</Text>
                        </Button>}
                    </View>
                    
                    {/*<TextInput style={styles.input} onChangeText={(text)=>{
                            this.setState({
                                password:text
                            })
                        }} placeholder="密码" secureTextEntry />
                        
                    <TextInput style={styles.input} onChangeText={(text)=>{
                            this.setState({
                                password:text
                            })
                        }} placeholder="重复密码" secureTextEntry />*/}

                    <View style={{flexDirection:'row',marginRight:5}}>
                        <View style={{flex:1,marginLeft:5}}>
                            <TextInput style={[styles.input,{}]} onChangeText={(text)=>{
                                    this.setState({
                                        vcode:text
                                    })
                                }} placeholder="短信验证码" />
                        </View>
                    </View>
                    <View style={{}}>
                        <Button containerStyle={{backgroundColor:'#fff'}} style={{marginLeft:4,marginRight:4,height:48,textAlignVertical:"center",fontSize:16,fontWeight:'100',color:'#FFF',backgroundColor:"#d66a42"}} 
                         disabled={user.state === BEFORE_LOGIN ? true:false} activeOpacity={0.4} onPress={() => {
                            this.toMain();
                        }}>{user.state === BEFORE_LOGIN?'登录中...':'登录'}</Button>
                    </View>
                    
                    {/* 找回密码 */}
                    <View style={styles.footer}>
                        <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                            <View style={{backgroundColor:'#fff',flex:1}}>
                                <Button containerStyle={{justifyContent:'flex-end'}}
                                 style={{height:40,lineHeight:40,textAlignVertical:'center',marginLeft:5,textAlign:'left',fontSize:14,fontWeight:'100',color:'#3b50ce', backgroundColor:"transparent"}}
                                 activeOpacity={0.4} onPress={()=>{
                                     this.toRegister();
                                 }}>注册新用户</Button>
                             </View>
                             <View style={{backgroundColor:'#fff',flex:1,justifyContent:'flex-end'}}>
                                 <Button
                                  style={{height:40,lineHeight:40,textAlignVertical:'center',textAlign:'right',marginRight:5,fontSize:14,fontWeight:'100',color:'#3b50ce', backgroundColor:"transparent"}}
                                  activeOpacity={0.4} onPress={()=>{
                                      this.toForgetPassword();
                                  }}>忘记密码?</Button>
                             </View>
                        </View>
                    </View>
                </View>
         </View>
       );
     }
}


function mapStateToProps(state,ownProps){
    return {
        user:state.user.user,
        phone:state.user.phone
    }
}

export default connect(mapStateToProps,{
    login,loginSuccess,autoLogin,pushPhoneCode
})(Lancher)

