/**
* @Author: 杜绍彬 <dushaobin>
* @Date:   2016-06-24T11:13:56+08:00
* @Email:  shaobin.du@zymobi.com
* @Last modified by:   dushaobin
* @Last modified time: 2016-07-18T13:41:24+08:00
*/


import React, { Component } from 'react';

import { connect } from 'react-redux'

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    Dimensions,
    Linking,
    InteractionManager,
    BackAndroid
} from 'react-native';

import NavHeader from '../../utils/NavHeader'

import Icon from 'react-native-vector-icons/Ionicons';


import Button from 'react-native-button'

import Loading from '../../utils/loading';

import {
    BEFORE_MEMBER_DETAIL,MEMBER_DETAIL_SUCCESS,MEMBER_DETAIL_FAILED,MEMBER_CLEARED,DID_FOCUS,
    getMemberDetail,clearMemberDetail
} from '../../actions/projectInfo';


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

export class MemberInfo extends Component {
    constructor(...args){
        super(...args);
        
        this.initDetail = false;
        this._bind('callPhone');
    }
    
    
    _bind(...methods){
        methods.forEach((method)=>{this[method] = this[method].bind(this)})
    }
    
    componentWillUnmount(){
        
        let {route,navigator,clearMemberDetail} = this.props;
        
        clearMemberDetail();
        
    }
    
    componentWillMount(){
        BackAndroid.addEventListener('hardwareBackPress', function() {
             navigator.pop();
             return true;
        });
    }
    
    componentDidMount(){
        let {route,navigator,getMemberDetail} = this.props;
        let {member} = route;
        
        InteractionManager.runAfterInteractions(()=>{
            getMemberDetail({
                memberId:member.id
            });
        });
        
    }
    
    componentWillReceiveProps(nextProp){
        
        
    }
    
    getLoadingTip(){
        let {memberDetail} = this.props;
        
        if(memberDetail.status == MEMBER_DETAIL_FAILED){
            return '获取失败！';
        }
        if(memberDetail.status == MEMBER_DETAIL_SUCCESS){
            return '  '
        }
    }
    
    callPhone(){
        let {memberDetail} = this.props;
        
        Linking.canOpenURL('tel://'+memberDetail.info.userPhone).then(supported => {
            if (supported) {
                Linking.openURL('tel://'+memberDetail.info.userPhone);
            } else {
                console.log('Don\'t know how to open URI: ' + this.props.url);
            }
        });
    }
    
    
    render() {
        let {route,navigator,memberDetail} = this.props;
        let {member} = route;
        
        // let memberCount = allDs.member.getRowCount();
        let memberRes = this.getLoadingTip();
        
        return (
            <View style={styles.container}>
                <NavHeader navigator={navigator} title={route.name} leftIcon='ios-arrow-back'></NavHeader>
                
                <ScrollView style={{flex:1,height:deviceHeight - 64}} automaticallyAdjustContentInsets={false}
          scrollEventThrottle={200}>
                  <View style={{backgroundColor:'#fff'}}>
                      <View style={styles.rowContainer}>
                          <View style={styles.right}>
                              
                              <View style={{justifyContent:'center',alignItems:'center',padding:10}}>
                                    <Image source={{uri: member.userIcon}} style={{width: 90, height: 90}} />
                              </View>
                              
                              <View style={{paddingTop:10,paddingBottom:20,justifyContent:'center',alignItems:'center'}}>
                                  <Text style={styles.projectName}>
                                      {member.userName}
                                  </Text>
                                  {!memberRes?<Loading></Loading>:null}
                              </View>
                              
                              <View style={[styles.projectOC,styles.processItem]}>
                                  <Text style={[styles.projectOther,styles.processKey]}>
                                      帐号:
                                  </Text>
                                  <Text style={[styles.projectOther,styles.processVal]}>
                                      {member.userAccount}
                                  </Text>
                              </View>
                              
                              <View style={[styles.projectOC,styles.processItem]}>
                                  <Text style={[styles.projectOther,styles.processKey]}>
                                      角色:
                                  </Text>
                                  <Text style={[styles.projectOther,styles.processVal]}>
                                      {member.role[0].cnName}
                                  </Text>
                              </View>
                              
                              <View style={[styles.projectOC,styles.processItem]}>
                                  <Text style={[styles.projectOther,styles.processKey]}>
                                      手机:
                                  </Text>
                                  <View style={{flex:1,}}>
                                      <Button style={{textAlign:'right'}} onPress={this.callPhone}>
                                          <Text style={{fontWeight:'400',textAlign:'right',fontSize:14,color:'#3b50ce'}}>
                                             {memberDetail.info.userPhone}
                                          </Text>
                                      </Button>
                                  </View>
                              </View>
                              
                              <View style={[styles.projectOC,styles.processItem]}>
                                  <Text style={[styles.projectOther,styles.processKey]}>
                                      QQ:
                                  </Text>
                                  <Text style={[styles.projectOther,styles.processVal]}>
                                      {memberDetail.info.userQQ}
                                  </Text>
                              </View>
                              
                              <View style={[styles.projectOC,styles.processItem]}>
                                  <Text style={[styles.projectOther,styles.processKey]}>
                                      类型:
                                  </Text>
                                  <Text style={[styles.projectOther,styles.processVal]}>
                                      {memberDetail.info.type}
                                  </Text>
                              </View>
                             
                              <View style={[styles.projectOC,styles.processItem]}>
                                  <Text style={[styles.projectOther,styles.processKey]}>
                                      创建时间:
                                  </Text>
                                  <Text style={[styles.projectOther,styles.processVal]}>
                                      {memberDetail.info.createdAtStr}
                                  </Text>
                              </View>
                              
                              
                              <View style={styles.projectOC}>
                                  <Text style={styles.projectOther}>地址:   {memberDetail.info.userAddress}</Text>
                              </View>
                              
                              <View style={{alignItems:'center',justifyContent:'center'}}>
                                  {!memberRes?null:<Text style={styles.projectOther}>{memberRes}</Text>}
                              </View>
                              
                          </View>
                      </View>
                  </View>
                    
                    
                </ScrollView>
                
            </View>
        );
    }
}


function mapStateToProps(state,ownProps){
    return {
        memberDetail:state.projectInfo.memberDetail,
        page:state.projectInfo.page
    }
}

export default connect(mapStateToProps,{
    getMemberDetail,clearMemberDetail,
})(MemberInfo)
