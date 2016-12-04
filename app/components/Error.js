/**
* @Author: 杜绍彬 <dushaobin>
* @Date:   2016-06-24T11:13:56+08:00
* @Email:  shaobin.du@zymobi.com
* @Last modified by:   dushaobin
* @Last modified time: 2016-07-18T14:26:20+08:00
*/


import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';


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

export default class Error extends Component {
  render() {
      return (
          <View style={styles.container}>
              <Text style={styles.welcome}>
                Welcome to React Native!
                {/* <TabIcon title="gear" iconName="gear"></TabIcon> */}
              </Text>
              <Text style={styles.instructions}>
                To get started, edit index.ios.js
                </Text>
                <Text style={styles.instructions}>
                  Press Cmd+R to reload,{'\n'}
                  Cmd+D or shake for dev menu
                </Text>
         </View>
       );
     }
}