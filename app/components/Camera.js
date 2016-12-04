/**
* @Author: 杜绍彬 <dushaobin>
* @Date:   2016-06-22T13:58:12+08:00
* @Email:  shaobin.du@zymobi.com
* @Last modified by:   dushaobin
* @Last modified time: 2016-10-26T11:57:21+08:00
*/



import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Image
} from 'react-native';

import Button from 'react-native-button'


import Camera from 'react-native-camera';

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
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
    overlayer:{
        position:'absolute',
        top:0,
        left:0,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    }
});

export default class CameraPod extends Component {
    constructor(...args){
        super(...args);

        this._bind('toLogin','callMyPhone','takePicture');

        this.state = {
            phoneNum:'',
            takedPhoto:null
        };

    }

    _bind(...methods){
        methods.forEach((method)=>{this[method] = this[method].bind(this)})
    }

    takePicture() {
         let that = this;
        this.camera.capture()
        .then((data) => {
            that.setState({
                takedPhoto:require(data.path)
            })
            console.log(data);

        })
        .catch(err => console.error(err));
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

    render() {
        let focusStyle = {};
        if(this.state.emailFocus){
            focusStyle.borderColor = '#5677fc';
        }else{
            focusStyle.borderColor = '#ccc';
        }
      return (
          <View>

              {this.initHeader()}

              {/* 登录 */}
              <View style={{height:200}}>
                <View style={styles.container}>
                    <Camera
                    ref={(cam) => {
                        this.camera = cam;
                    }}
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fill}>
                    <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[take a photo]</Text>
                    </Camera>
                </View>

                <View style={[styles.overlayer]}>
                    <Image style={[styles.overlayer]}  source={{uri:'http://112.74.129.74/c2.png'}} />
                </View>

                { /*this.state.takedPhoto?<Image source={this.state.takedPhoto}/>:null */}

                <View style = {[styles.overlayer,{flex:1,justifyContent:'flex-end'}]}>
                    <View style={{height:20}}>

                        <Button
                        containerStyle={{}} style={{marginLeft:4,marginRight:4,height:48,textAlignVertical:"center",fontSize:16,fontWeight:'100',color:'#FFF',backgroundColor:"#3b50ce"}} activeOpacity={0.4} onPress={() => {
                            this.takePicture();
                        }}>拍照片</Button>

                    </View>
                </View>
              </View>
       </View>
       );
     }
}
