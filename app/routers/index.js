/**
* @Author: 杜绍彬 <dushaobin>
* @Date:   2016-06-24T10:51:18+08:00
* @Email:  shaobin.du@zymobi.com
* @Last modified by:   dushaobin
* @Last modified time: 2016-11-10T22:47:51+08:00
*/

import React,{Component,PropTypes} from 'react';

import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Navigator,
    TouchableOpacity,
    BackAndroid
} from 'react-native';


import { connect } from 'react-redux'

import ForgetPassword from '../components/ForgetPassword'
import Lancher from '../components/Lancher'
import Register from '../components/Register'
import Main from '../components/Main'
import Login from '../components/Login'
import Error from '../components/Error'

import ProjectDetail from '../components/project/ProjectDetail'
import MemberInfo from '../components/project/memberInfo'
import TeamDetail from '../components/team/teamDetail'

import ChildResource from '../components/resource/childResource'
import OCR from '../components/OCR'
import StoresList from '../components/StoresList'
import ChoiceBrand from '../components/myCar/ChoiceBrand'
import ChoiceCity from '../components/myCar/ChoiceCity'
import ChoiceProductBrand from '../components/myCar/ChoiceProductBrand'

import OilwearRecord from '../components/myCar/OilwearRecord'
import ChangeCar from '../components/myCar/ChangeCar'

import CareRecord from '../components/myCar/CareRecord'

const styles = StyleSheet.create({
    nav:{
        flex:1,
        backgroundColor:'#ffffff'
    }
});

let currRouter = null;
let gloNavigator = null;
let isFirst = true;

//android绑定返回键
BackAndroid.addEventListener('hardwareBackPress',function(){
    if(currRouter && currRouter.id == 'lancher'){
        //主界面
        if(isFirst){
            ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT);
            isFirst = false;
        }else{
            isFirst = true;
            return false;
        }
        return true;
    }
    gloNavigator && gloNavigator.pop();
    //back
    return true;
});


class Router extends Component {
    constructor(...args){
        super(...args);
        this.state = {
            navigators:null
        };
        this._bind('renderScene','didFocus')
    }
    _bind(...methods){
        methods.forEach((method)=>{this[method] = this[method].bind(this)})
    }
    render() {
        return <Navigator
            ref='nav'
            style={styles.nav}
            initialRoute={this.props.initRoute || {}}
            configureScene={this.configureScene}
            renderScene={this.renderScene}
            onDidFocus={this.didFocus}
            onWillFocus={this.willFocus}
        />;
    }
    willFocus(route,...args){
        //console.log('will focus',args);
        //getMethod
        currRouter = route;
    }
    didFocus(route){
        //调用所有的
        // let sences = this.navCom.refs;
        // Object.keys(sences).forEach(function(key) {
        //     sences[key] && sences[key].mergedProps && sences[key].mergedProps.onDidFocus(route);
        // });

    }
    configureScene(route,routeStack){
        if(route.type && route.type in Navigator.SceneConfigs){
            return Navigator.SceneConfigs[route.type];
        }
        return Navigator.SceneConfigs.PushFromRight;
    }
    renderScene(route,navigator){
        this.navCom = navigator;
        gloNavigator = navigator;
        switch (route.id) {
            case 'login':
                return (
                    <Login route={route} navigator={navigator}></Login>
                );
            case 'lancher':
                return (
                    <Lancher route={route} navigator={navigator}></Lancher>
                );
            case 'register':
                return (
                    <Register route={route} navigator={navigator}></Register>
                );
            case 'forgetPassword':
                return (
                    <ForgetPassword route={route} navigator={navigator}></ForgetPassword>
                );
            case 'main':
                return (
                    <Main route={route} navigator={navigator}></Main>
                );
            case 'map':
                return (
                    <Login route={route} navigator={navigator}></Login>
                );
            case 'projectDetail':
                return (
                    <ProjectDetail route={route} navigator={navigator}></ProjectDetail>
                );
                // return (
                //     <ProjectDetail ref='projectDetail' route={croute} navigator={navigator}></ProjectDetail>
                // );
            case 'choiceCity':
                return (
                    <ChoiceCity route={route} navigator={navigator}></ChoiceCity>
                );
            case 'choiceProductBrand':
                return (
                    <ChoiceProductBrand route={route} navigator={navigator}></ChoiceProductBrand>
                );
            case 'memberInfo':
                return (
                    <MemberInfo route={route} navigator={navigator}></MemberInfo>
                );
                // return (
                //     <MemberInfo ref='memberInfo' route={route} navigator={navigator}></MemberInfo>
                // );
            case 'teamDetail':
                return (
                    <TeamDetail route={route} navigator={navigator}></TeamDetail>
                );
            case 'choiceBrand':
                return (
                    <ChoiceBrand route={route} navigator={navigator}></ChoiceBrand>
                );
            case 'oilwearRecord':
                return (
                    <OilwearRecord route={route} navigator={navigator}></OilwearRecord>
                );
            case 'changeCar':
                return (
                    <ChangeCar route={route} navigator={navigator}></ChangeCar>
                );
            case 'careRecord':
                return (
                    <CareRecord route={route} navigator={navigator}></CareRecord>
                );
            case 'myProfile':
                return (
                    <MyProfile route={route} navigator={navigator}></MyProfile>
                );
            case 'childResource':
                return (
                    <ChildResource route={route} navigator={navigator}></ChildResource>
                );
            case 'ocr':
                return (
                    <OCR route={route} navigator={navigator}></OCR>
                );
            case 'error':
                return (
                    <Main route={route} navigator={navigator}></Main>
                );
            case 'stores':
                return(
                    <StoresList route={route} navigator={navigator}></StoresList>
                );
            default:
                return (
                    <Main route={route} navigator={navigator}></Main>
                );
        }

    }
}

Router.propsType = {
    initRoute:PropTypes.object
}


function mapStateToProps(state,ownProps) {
    return {
        retire:state.user.user
    };
}

export default connect(mapStateToProps)(Router);
