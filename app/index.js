/**
* @Author: 杜绍彬 <dushaobin>
* @Date:   2016-06-23T19:10:26+08:00
* @Email:  shaobin.du@zymobi.com
* @Last modified by:   dushaobin
* @Last modified time: 2016-10-17T16:12:50+08:00
*/

import React,{Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Navigator,
    TouchableOpacity,
    ToastAndroid
} from 'react-native';

import SplashScreen from '@remobile/react-native-splashscreen';
import Router from './routers/index'

import { createStore,applyMiddleware,combineReducers } from 'redux'
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import reduce from './reducers/index'

const styles = StyleSheet.create({
    navTitle: {
        color:'#FFF',
        fontWeight:'100',
        fontSize:16,
        textAlign:'center',
        top:0,
    },
    navBar:{
        height:42,
        backgroundColor:'#5677fc'
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
    subTabBar:{
        backgroundColor:'#5677fc'
    },
    container: {
        flex: 1,
        marginTop: 30,
        alignItems: 'center',
    },
    button: {
        padding: 10,
    },
});


const middleware = [thunk,logger()];
//const middleware = [thunk];
const createStoreWidthMiddleware = applyMiddleware(...middleware)(createStore);


let store = createStoreWidthMiddleware(reduce);

// store.dispatch()

export default class App extends Component {
    componentDidMount(){
        SplashScreen.hide();
    }
    render(){
        return (
            <Provider store={store}>
                <Router initRoute={{id:"lancher",name:"协同开发"}}></Router>
            </Provider>
        );
    }
}
