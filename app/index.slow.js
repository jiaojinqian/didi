/**
* @Author: 杜绍彬 <dushaobin>
* @Date:   2016-06-16T15:36:54+08:00
* @Email:  shaobin.du@zymobi.com
* @Last modified by:   dushaobin
* @Last modified time: 2016-06-24T15:40:37+08:00
*/



import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import RNRF, {
    Router,
    Route,
    Scene,
    Modal,
    TabBar} from 'react-native-router-flux';

/**
 * ### Redux
 *
 * ```Provider``` will tie the React-Native to the Redux store
 */
import {
  Provider,
  connect } from 'react-redux';
  
/** 
 * ### icons
 *
 * Add icon support for use in Tabbar
 * 
 */
import Icon from 'react-native-vector-icons/FontAwesome';


import TabIcon from './components/TabIcon'

/**
 *  The version of the app but not  displayed yet
 */
var VERSION = '0.1.1';

import PageOne from './components/test/PageOne';
import PageTwo from './components/test/PageTwo';

import ForgetPassword from './components/ForgetPassword'
import Lancher from './components/Lancher'
import Main from './components/Main'
import TabView from './components/test/TabView'

import SplashScreen from '@remobile/react-native-splashscreen';

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
    }
});


export default class App extends Component {
    componentDidMount() {
        SplashScreen.hide();
    }
    render() {
        return (
            <Router>
                <Scene key="modal" component={Modal}>
                    <Scene key="root">
                        <Scene key="lancher" component={Lancher} title="协同开发" initial={true} style={{flex:1, }} titleStyle={styles.navTitle} navigationBarStyle={styles.navBar} />
                        <Scene key="forgetPassword" navigationBarStyle={styles.navBar} titleStyle={styles.navTitle} backButtonTextStyle={{color:'#FFF'}} component={ForgetPassword} backTitle=" 返回" title="忘记密码" panHandlers={null}></Scene>
                        <Scene key="main" tabs={true} selectedIconStyle={styles.subTabBar} tabBarStyle={styles.subTabBar} >
                            
                            <Scene key="project" initial={true} navigationBarStyle={styles.navBar}  titleStyle={styles.navTitle} component={TabView} iconName="folder"  title="项目" icon={TabIcon}/>
                            
                            <Scene key="team" title="团队" onPress={() => {alert('team');}} navigationBarStyle={styles.navBar}  titleStyle={styles.navTitle} iconName="group" component={Main} icon={TabIcon}>
                            </Scene>
                            
                            
                            <Scene key="task" navigationBarStyle={styles.navBar}  titleStyle={styles.navTitle} component={TabView} iconName="receipt" title="任务" icon={TabIcon} />
                            
                            <Scene key="resource" component={TabView} iconName="insert-drive-file" title="资源" navigationBarStyle={styles.navBar}  titleStyle={styles.navTitle}  icon={TabIcon}/>
                            
                            <Scene key="document" title="文档" iconName="work" icon={TabIcon} navigationBarStyle={styles.navBar}  titleStyle={styles.navTitle} component={Main}>
                            </Scene>
                            
                        </Scene>
                        <Scene key="error"></Scene>
                        <Scene key="pageOne" component={PageOne} title="PageOne"/>
                        <Scene key="pageTwo" component={PageTwo} title="PageTwo" />
                    </Scene>
                </Scene>
        </Router>
    )
  }
}



