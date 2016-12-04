/**
* @Author: dushaobin
* @Date:   2016-06-22T16:40:54+08:00
* @Last modified by:   dushaobin
* @Last modified time: 2016-11-05T17:52:26+08:00
*/



import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';

import TabBar from '../utils/TabBar'

import Home from './project/home'
import Team from './team/team'
import Resource from './resource/resource'
import UserInfo from './user/user'

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
    tabView: {
      padding: 5,
      backgroundColor: 'rgba(0,0,0,0.01)',
    },
    card: {
      borderWidth: 1,
      backgroundColor: '#fff',
      borderColor: 'rgba(0,0,0,0.1)',
      margin: 5,
      height: 150,
      padding: 15,
      shadowColor: '#ccc',
      shadowOffset: { width: 2, height: 2, },
      shadowOpacity: 0.5,
      shadowRadius: 3,
    },
});


export default class Main extends Component {
    constructor(...args){
        super(...args);

        this.state = {
            project:{
                isScrollBottom:false,
                isBottomTrigger:false,
                isScrollTop:false
            },
            team:{
                isScrollBottom:false,
                isBottomTrigger:false,
                isScrollTop:false
            },
            resource:{
                isScrollBottom:false,
                isBottomTrigger:false,
                isScrollTop:false
            }
        };

        this._bind('projectScroll','teamScroll','resourceScroll','lockLoading',
        'unlockLoading','lockTeamLoading','unlockTeamLoading','lockResourceLoading','unlockResourceLoading');

    }

    _bind(...methods){
        methods.forEach((method)=>{this[method] = this[method].bind(this)})
    }

    projectScroll(evt){
        let {nativeEvent} = evt;
        if(parseInt(nativeEvent.contentSize.height) <= parseInt(nativeEvent.contentOffset.y + nativeEvent.layoutMeasurement.height)){
            this.setState({
                ...this.state,
                project:{
                    ...this.state.project,
                    isScrollBottom:true
                }
            })
        }else{
            this.setState({
                ...this.state,
                project:{
                    ...this.state.project,
                    isScrollBottom:false
                }
            })
        }
    }

    teamScroll(evt){
        let {nativeEvent} = evt;
        if(parseInt(nativeEvent.contentSize.height) <= parseInt(nativeEvent.contentOffset.y +   nativeEvent.layoutMeasurement.height)){
            this.setState({
                ...this.state,
                team:{
                    ...this.state.team,
                    isScrollBottom:true
                }
            })
        }else{
            this.setState({
                ...this.state,
                team:{
                    ...this.state.team,
                    isScrollBottom:false
                }
            })
        }
    }

    resourceScroll(evt){
        let {nativeEvent} = evt;
        if(parseInt(nativeEvent.contentSize.height) <= parseInt(nativeEvent.contentOffset.y + nativeEvent.layoutMeasurement.height)){

            this.setState({
                ...this.state,
                resource:{
                    ...this.state.resource,
                    isScrollBottom:true
                }
            })
        }else{

            this.setState({
                ...this.state,
                resource:{
                    ...this.state.resource,
                    isScrollBottom:false
                }
            })
        }
    }

    lockLoading(fn,ctx,...args){
        let {project} = this.state;
        this.setState({
            ...this.state,
            project:{
                ...project,
                isBottomTrigger:true,
                isScrollBottom:false
            }
        });
        fn && fn.apply(ctx,args);
    }

    unlockLoading(){
        let {project} = this.state;
        if(project.isBottomTrigger){
            this.setState({
                ...this.state,
                project:{
                    ...project,
                    isBottomTrigger:false
                }
            })
        }
    }

    lockTeamLoading(fn,ctx,...args){
        let {team} = this.state;
        this.setState({
            ...this.state,
            team:{
                ...team,
                isBottomTrigger:true,
                isScrollBottom:false
            }
        });
        fn && fn.apply(ctx,args);
    }

    unlockTeamLoading(){
        let {team} = this.state;
        if(team.isBottomTrigger){
            this.setState({
                ...this.state,
                team:{
                    ...team,
                    isBottomTrigger:false
                }
            })
        }
    }

    lockResourceLoading(fn,ctx,...args){
        let {resource} = this.state;
        this.setState({
            ...this.state,
            resource:{
                ...resource,
                isBottomTrigger:true,
                isScrollBottom:false
            }
        });
        fn && fn.apply(ctx,args);
    }

    unlockResourceLoading(){
        let {resource} = this.state;
        if(resource.isBottomTrigger){
            this.setState({
                ...this.state,
                resource:{
                    ...resource,
                    isBottomTrigger:false
                }
            })
        }
    }

    render() {
        let {route,navigator} = this.props;
        return (
              <ScrollableTabView
                style={{backgroundColor:'#fff'}}
                initialPage={0}
                tabBarPosition='bottom'
                renderTabBar={() => <TabBar  />}
                >
                <ScrollView
                    tabLabel={{
                        iconName:'home',
                        source:require('../img/icons/home.png'),
                        sourceHover:require('../img/icons/home-hover.png'),
                        name:'首页'}}
                    onScroll={this.projectScroll}
                    style={[styles.tabView]}>
                    <View>
                        <Text>test</Text>
                    </View>
                    {/*<Home
                        lockLoading={this.lockLoading}
                        unlockLoading={this.unlockLoading}
                        scrollStatus={this.state.project}
                        route={route} navigator={navigator}>
                    </Home>*/}
                </ScrollView>
                <ScrollView
                    tabLabel={{
                        iconName:'shop',
                        source:require('../img/icons/shop.png'),
                        sourceHover:require('../img/icons/shop-hover.png'),
                        name:'门店'}}
                    onScroll={this.teamScroll}
                    style={styles.tabView}>
                    <Team lockLoading={this.lockTeamLoading} unlockLoading={this.unlockTeamLoading} scrollStatus={this.state.team} route={route} navigator={navigator}></Team>
                </ScrollView>
                {/*<ScrollView tabLabel={{iconName:'ios-clipboard',name:'任务'}} style={styles.tabView}>
                  <View style={styles.card}>
                    <Text>Messenger</Text>
                  </View>
                </ScrollView>*/}
                {/*<ScrollView  tabLabel={{iconName:'ios-attach',name:'资源'}} onScroll={this.resourceScroll} style={styles.tabView}>
                    <Resource lockLoading={this.lockResourceLoading} unlockLoading={this.unlockResourceLoading} scrollStatus={this.state.resource}  route={route} navigator={navigator}></Resource>
                </ScrollView>
                */}
                <ScrollView
                    tabLabel={{
                        iconName:'user',
                        source:require('../img/icons/user.png'),
                        sourceHover:require('../img/icons/user-hover.png'),
                        name:'我的'}} style={styles.tabView}>
                    <View >
                        <UserInfo route={route} navigator={navigator} ></UserInfo>
                    </View>
                </ScrollView>
            </ScrollableTabView>
        );
    }
}
