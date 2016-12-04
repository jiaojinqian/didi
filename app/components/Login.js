/**
* @Author: 杜绍彬 <dushaobin>
* @Date:   2016-06-21T15:27:23+08:00
* @Email:  shaobin.du@zymobi.com
* @Last modified by:   dushaobin
* @Last modified time: 2016-11-05T17:38:33+08:00
*/



import React, { Component } from 'react';

import { connect } from 'react-redux'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  DeviceEventEmitter
} from 'react-native';

import BaiduMap from 'RNBaiduMap'

import {
    login
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
});

function markeredClick(e){
    alert('当前点击的markerId：'+e.id);
}

class Login extends Component {

    componentWillUnmount(){
        this.listenrer.remove();
    }

    componentWillMount(){
        console.log('防止多次绑定');

        this.listenrer = DeviceEventEmitter.addListener('markerClick',function(e:Event){
            alert('当前点击的markerId：'+e.id);
        });
    }

  render() {
      return (
          <View style={styles.container}>
              <Text style={styles.welcome}>
                滴滴专修MAP
                {/* <TabIcon title="gear" iconName="gear"></TabIcon> */}
              </Text>

              <BaiduMap
                  center={[40.0162110000,116.3990360000]}
                  marker={[
                      [40.0162110000,116.3990360000,1],
                      [40.0172110000,116.3990360000,2],
                      [40.0182110000,116.3990360000,3],
                      [40.0152110000,116.3990360000,4]
                    ]}
                  level={15}
                  zoomBtnVisibility={false}
                  style={{flex:1,backgroundColor:'red'}}
                  mode={1}
                  markerClickEnabled={true}

                />
         </View>
       );
     }
}


function mapStateToProps(state,ownProps){
    return {
        user:state.user
    }
}

export default connect(mapStateToProps,{
    login
})(Login)
