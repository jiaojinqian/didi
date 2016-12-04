/**
* @Author: 杜绍彬 <dushaobin>
* @Date:   2016-06-21T18:08:58+08:00
* @Email:  shaobin.du@zymobi.com
* @Last modified by:   dushaobin
* @Last modified time: 2016-09-24T18:09:26+08:00
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
    BEFORE_USER_ADD,USER_ADD_SUCCESS,USER_ADD_FAILED,
    loginSuccess,login,autoLogin,pushPhoneCode,addNewUser
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
        height:48,
        backgroundColor:'#d66a42',
    },
    headerText:{
        color:'#fff',
        fontSize:16,
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
        height:42,
        paddingLeft:5,
        backgroundColor:'#FAFAFA',
        marginBottom:3
    }
});

class Register extends Component {
    
    constructor(...args){
        super(...args);
        
        this._bind('toLancher','callMyPhone','toMain');
        
        this.state = {
            username:'',
            password:'',
            passwordRepeat:'',
            vcode:'',
            isShowTime:false
        };
    }
    
    initUserInfo(){
        
        let {navigator} = this.props;
        
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

    toLancher(){
        
        let {navigator} = this.props;
        navigator.pop();
        
        //Actions.forgetPassword();
    }
    
    _bind(...methods){
        methods.forEach((method)=>{this[method] = this[method].bind(this)})
    }
    
    toMain(){
        let {navigator,addNewUser,user} = this.props;
        
        if(!this.state.username){
            alert('用户名不能为空！');
            return;
        }
        
        if(!this.state.password){
            alert('密码不能为空!');
            return;
        }
        
        if(this.state.password !== this.state.passwordRepeat){
            alert('两次输入的密码必须一致!');
            return;
        }
        
        if(!this.state.vcode){
            alert('手机验证码不能为空!');
            return;
        }
        
        addNewUser({
            phone:this.state.username,
            password:this.state.password,
            code:this.state.vcode
        });
        
        //Actions.main();
    }
    
    initHeader(){
        let {route} = this.props;
        if(route.name){
            return (
                <View style={styles.header}>
                    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                        <Text style={styles.headerText}>{route.name}</Text>
                    </View>
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
            this.updateState();
        }
        
    }
    
    saveUserInfo(user){
        let {
            navigator,
            autoLogin
        } = this.props;
        
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
    
    updateState(){
        let {user,vcode,navigator} = this.props;
        
        switch (user.state) {
            case USER_ADD_SUCCESS:
                alert("注册成功");
                //this.saveUserInfo(user);
                this.toLancher();
                break;
            case USER_ADD_FAILED:
                if(this.isTrigged){
                    return;
                }
                
                if(user.info.message){
                    alert(user.info.message || '注册失败');
                }
                
                break;
            default:
                
        }
    }
    
    render() {
        let {user,vcode} = this.props;
        //this.updateState();
        
        return (
            <View style={styles.container}>
                {this.initHeader()}
                {/* 登录 */}
                <View style={styles.content}>
                    <View style={{flexDirection:'row',marginRight:5,marginTop:10}}>
                        <View style={{flex:1,marginLeft:5}}>
                            <TextInput style={styles.input} onChangeText={(text)=>{
                                this.setState({
                                    username:text
                                })
                            }} placeholder="手机号" keyboardType="phone-pad" value={this.state.username} />
                        </View>
                        {this.state.isShowTime?
                        <View style={{marginBottom:4,width:120,paddingLeft:5,backgroundColor:'#ccc'}}>
                            <TimerLabel startSecond="60" loadingText="秒后重发" onTimeEnd={()=>{
                                    this.hideCountTimer();
                                }}></TimerLabel>
                        </View> :
                        <Button containerStyle={{marginBottom:4,width:120,backgroundColor:'#d66a42'}} onPress={()=>{this.getPhoneVcode()}}>
                            <Text style={{textAlign:'center',textAlignVertical:"center",fontSize:14,fontWeight:'400',color:'#fff',height:40}}>获取验证码</Text>
                        </Button>}
                    </View>
                    
                    <View style={{flexDirection:'row',marginRight:5}}>
                        <View style={{flex:1,marginLeft:5}}>
                            <TextInput style={[styles.input,{}]} onChangeText={(text)=>{
                                    this.setState({
                                        vcode:text
                                    })
                                }} placeholder="短信验证码" />
                        </View>
                    </View>
                    
                    <View style={{marginLeft:5,marginRight:5}}>
                        <TextInput style={styles.input} onChangeText={(text)=>{
                                this.setState({
                                    password:text
                                })
                            }} placeholder="密码" secureTextEntry />
                    </View>
                    
                    <View style={{marginLeft:5,marginRight:5}}>
                        <TextInput style={styles.input} onChangeText={(text)=>{
                                this.setState({
                                    passwordRepeat:text
                                })
                            }} placeholder="重复密码" secureTextEntry />
                    </View>
                    
                    <View style={{}}>
                        <Button containerStyle={{padding:5,backgroundColor:'#fff'}} style={{borderRadius:5,overflow:'hidden',backgroundColor:"#d66a42",height:48,fontSize:16,textAlignVertical:'center',color:'#FFF'}} 
                         disabled={user.state === BEFORE_LOGIN?true:false} activeOpacity={0.4} onPress={() => {
                            this.toMain();
                        }}>{user.state === BEFORE_LOGIN?'注册中...':'注册'}</Button>
                        
                    </View>
                    
                    {/* 找回密码 */}
                    <View style={styles.footer}>
                        <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                             <View style={{backgroundColor:'#fff',flex:1,justifyContent:'flex-end'}}>
                                 <Button
                                  style={{height:40,lineHeight:40,textAlign:'right',marginRight:5,fontSize:14,fontWeight:'100',color:'#3b50ce', backgroundColor:"transparent"}}
                                  activeOpacity={0.4} onPress={()=>{
                                      this.toLancher();
                                  }}>返回登录</Button>
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
        vcode:state.user.vcode,
        phone:state.user.phone
    }
}

export default connect(mapStateToProps,{
    login,loginSuccess,addNewUser,autoLogin,pushPhoneCode
})(Register)

