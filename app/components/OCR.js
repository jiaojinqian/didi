/**
* @Author: 杜绍彬 <dushaobin>
* @Date:   2016-06-21T15:27:23+08:00
* @Email:  shaobin.du@zymobi.com
* @Last modified by:   dushaobin
* @Last modified time: 2016-10-17T18:55:28+08:00
*/



import React, { Component } from 'react';

import { connect } from 'react-redux'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  DeviceEventEmitter,
  Dimensions
} from 'react-native';

import Camera from 'react-native-camera';
import RNTesseractOcr from 'react-native-tesseract-ocr';
import ImageResizer from 'react-native-image-resizer';


import {
    UPLOAD_PHOTO_FAILED,UPLOAD_PHOTO_SUCCESS,
    login,uploadPhoto
} from '../actions/user'


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
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
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
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

function markeredClick(e){
    alert('当前点击的markerId：'+e.id);
}

class OCR extends Component {

    constructor(...args){

        super(...args);

        this.state = {
            cameraType:Camera.constants.Type.back
        }

        //this._takePicture.bind(this);
        this._switchCamera.bind(this);


        console.log(RNTesseractOcr);

    }

    componentWillUnmount(){
        //this.listenrer.remove();
    }

    componentWillMount(){

    }

    shouldComponentUpdate(nextProps,nextState){
        console.log('component update',nextProps)
        console.log(nextProps.user.state);
        console.log(nextProps.state === UPLOAD_PHOTO_SUCCESS);
        if(nextProps.user.state === UPLOAD_PHOTO_FAILED || nextProps.user.state === UPLOAD_PHOTO_SUCCESS){
            console.log('takePicture');
            alert(JSON.stringify(nextProps.user.info));
            //this.takePicture();
            return false;
        }
        return true;
    }

    _onBarCodeRead(e){
        console.log(e);
    }

    _switchCamera() {
        var state = this.state;
        state.cameraType = state.cameraType === Camera.constants.Type.back
            ? Camera.constants.Type.front : Camera.constants.Type.back;
        this.setState(state);
    }

    takePicture() {
        let { uploadPhoto } = this.props;

        this.camera.capture()
            .then((data) => {
                let path = data.path.substr(0,data.path.lastIndexOf('/')+1);
                console.log('create image');
                console.log(ImageResizer.createResizedImage);

                ImageResizer.createResizedImage(data.path,1000,1000,'JPEG',80).then((imgUri) => {
                    //alert("yasuo :"+imgUri);
                    uploadPhoto({
                        imgSrc:imgUri
                    })

                }).catch((e)=>{
                    console.log(e);
                });



                // RNTesseractOcr.startOcr(data.path,"LANG_ENGLISH")
                //     .then((res)=>{
                //         alert(res);
                //         console.log('ocr res',res);
                //     })
                //     .catch((err)=>{
                //         console.log("ocr error:",err)
                //     })
                console.log(data)}
            )
            .catch(err => console.error(err));
  }

  render() {
      return (
          <View style={styles.container}>
              <Text style={styles.welcome}>
                滴滴专修MAP
                {/* <TabIcon title="gear" iconName="gear"></TabIcon> */}
              </Text>
              <Camera
                  ref={(cam) => {
                    this.camera = cam;
                  }}
                  playSoundOnCapture={false}
                  style={styles.preview}
                  aspect={Camera.constants.Aspect.fill}>
                  <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
                </Camera>

         </View>
       );
     }
}


function mapStateToProps(state,ownProps){
    return {
        user:state.user.user
    }
}

export default connect(mapStateToProps,{
    uploadPhoto,login
})(OCR)
