/**
* @Author: 杜绍彬 <dushaobin>
* @Date:   2016-06-24T11:13:56+08:00
* @Email:  shaobin.du@zymobi.com
* @Last modified by:   dushaobin
* @Last modified time: 2016-07-18T11:25:22+08:00
*/


import React, { Component } from 'react';

import { connect } from 'react-redux'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ListView,
  Image,
  Linking
} from 'react-native';

import NavHeader from '../../utils/NavHeader'

import Icon from 'react-native-vector-icons/Ionicons';

import Button from 'react-native-button'

import Loading from '../../utils/loading';

import {
    BEFORE_USER_INFO,USER_INFO_SUCCESS,USER_INFO_FAILED,
    getUserInfo
} from '../../actions/user';


let {
    height:deviceHeight,
    width:deviceWidth
} = Dimensions.get('window');


const styles = StyleSheet.create({
    container: {
        backgroundColor:'#fff'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    rowContainer:{
        padding:10,
        flexDirection: 'row',
        flex:1,
        backgroundColor:'#fff'
        //alignItems:stretch
    },
    left:{
        alignSelf:'stretch',
        alignItems:'center',
        justifyContent:'center',
        paddingRight:10,
    },
    leftProgress:{
        width:120,
        height:120,
        borderRadius:60,
        backgroundColor:'red',
        alignItems:'center',
        justifyContent:'center'
    },
    right:{
        flex:1,
        flexDirection: 'column',
    },
    projectName:{
        color:'rgba(0,0,0,0.8)',
        fontSize:16
    },
    projectOther:{
        color:'rgba(0,0,0,0.6)',
        fontSize:12
    },
    projectOC:{
        padding:5,
    },
    pCategoryBg:{
        position:'absolute',
        backgroundColor:'#4e6cef',
        width:80,
        height:80,
        right:-60,
        top:-60,
        transform:[{rotate:'-45deg'}]
    },
    subContainer:{
        
    },
    subHeader:{
        fontSize:14,
        color:'rgba(0,0,0,0.8)',
        alignSelf:'center'
    },
    processItem:{
        flexDirection:'row'
    },
    processKey:{
        flex:1
    },
    processVal:{
        flex:1,
        textAlign:'right'
    }
});

export class UserInfo extends Component {
    constructor(...args){
        super(...args);
        
        this._bind('callPhone');
    }
    
    
    _bind(...methods){
        methods.forEach((method)=>{this[method] = this[method].bind(this)})
    }
    
    componentWillUnmount(){
    
        
    }
    
    componentWillMount(){
        
    }
    
    componentDidMount(){
        let {route,navigator,getUserInfo,user} = this.props;
        let {userInfo} = route;
        
        console.log(user);
        
        getUserInfo({
            memberId:user.info.message.userid
        });
        
    }
    
    componentWillReceiveProps(nextProp){
        
    }

    
    
    getLoadingTip(){
        let {userInfo} = this.props;
        
        if(userInfo.status == USER_INFO_FAILED){
            return '获取失败！';
        }
        if(userInfo.status == USER_INFO_SUCCESS){
            return '  '
        }
    }
    
    callPhone(){
        let {userInfo} = this.props;
        
        Linking.canOpenURL('tel://'+userInfo.info.cellphone).then(supported => {
            if (supported) {
                Linking.openURL('tel://'+userInfo.info.cellphone);
            } else {
                console.log('Don\'t know how to open URI: ' + this.props.url);
            }
        });
    }
    
    
    render() {
        let {route,navigator,userInfo} = this.props;
        
        // let memberCount = allDs.member.getRowCount();
        let memberRes = this.getLoadingTip();
        
        return (
            <View style={styles.container}>
            
                  <View style={{backgroundColor:'#fff'}}>
                      <View style={styles.rowContainer}>
                          <View style={styles.right}>
                              
                              <View style={{justifyContent:'center',alignItems:'center',padding:10}}>
                                    <Image source={{uri: userInfo.info.icon}} style={{width: 90, height: 90}} />
                              </View>
                              
                              <View style={{paddingTop:10,paddingBottom:20,justifyContent:'center',alignItems:'center'}}>
                                  <Text style={styles.projectName}>
                                      {userInfo.info.userName}
                                  </Text>
                                  {!memberRes?<Loading></Loading>:null}
                              </View>
                              
                              <View style={[styles.projectOC,styles.processItem]}>
                                  <Text style={[styles.projectOther,styles.processKey]}>
                                      帐号:
                                  </Text>
                                  <Text style={[styles.projectOther,styles.processVal]}>
                                      {userInfo.info.account}
                                  </Text>
                              </View>
                              
                              <View style={[styles.projectOC,styles.processItem]}>
                                  <Text style={[styles.projectOther,styles.processKey]}>
                                      用户级别:
                                  </Text>
                                  <Text style={[styles.projectOther,styles.processVal]}>
                                      {userInfo.info.userlevel}
                                  </Text>
                              </View>
                              
                              <View style={[styles.projectOC,styles.processItem]}>
                                  <Text style={[styles.projectOther,styles.processKey]}>
                                      email:
                                  </Text>
                                  <Text style={[styles.projectOther,styles.processVal]}>
                                      {userInfo.info.email}
                                  </Text>
                              </View>
                              
                              <View style={[styles.projectOC,styles.processItem]}>
                                  <Text style={[styles.projectOther,styles.processKey]}>
                                      绑定的email:
                                  </Text>
                                  <Text style={[styles.projectOther,styles.processVal]}>
                                      {userInfo.info.bindEmail}
                                  </Text>
                              </View>
                              
                              <View style={[styles.projectOC,styles.processItem]}>
                                  <Text style={[styles.projectOther,styles.processKey]}>
                                      接收邮件:
                                  </Text>
                                  <Text style={[styles.projectOther,styles.processVal]}>
                                      {userInfo.info.receiveMail}
                                  </Text>
                              </View>
                              
                              <View style={[styles.projectOC,styles.processItem]}>
                                  <Text style={[styles.projectOther,styles.processKey]}>
                                      来源平台:
                                  </Text>
                                  <Text style={[styles.projectOther,styles.processVal]}>
                                      {userInfo.info.joinPlat}
                                  </Text>
                              </View>
                              
                              <View style={[styles.projectOC,styles.processItem]}>
                                  <Text style={[styles.projectOther,styles.processKey]}>
                                      手机:
                                  </Text>
                                  <View style={{flex:1,}}>
                                      <Button style={{textAlign:'right'}} onPress={this.callPhone}>
                                          <Text style={{fontWeight:'400',textAlign:'right',fontSize:14,color:'#3b50ce'}}>
                                             {userInfo.info.cellphone}
                                          </Text>
                                      </Button>
                                  </View>
                              </View>
                             
                              <View style={[styles.projectOC,styles.processItem]}>
                                  <Text style={[styles.projectOther,styles.processKey]}>
                                      创建时间:
                                  </Text>
                                  <Text style={[styles.projectOther,styles.processVal]}>
                                      {userInfo.info.createdAtStr}
                                  </Text>
                              </View>
                              
                              
                              <View style={styles.projectOC}>
                                  <Text style={styles.projectOther}>地址:   {userInfo.info.address}</Text>
                              </View>
                              
                              <View style={{alignItems:'center',justifyContent:'center'}}>
                                  {!memberRes?null:<Text style={styles.projectOther}>{memberRes}</Text>}
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
        userInfo:state.user.userInfo
    }
}

export default connect(mapStateToProps,{
    getUserInfo
})(UserInfo)
