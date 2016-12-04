/**
* @Author: 焦丙乾 jiaobingqian
* @Date:   2016-11-05T16:40:54+08:00
* @Last modified by:   dushaobin
* @Last modified time: 2016-11-10T23:20:15+08:00
*/


import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Image,
    Text,
    View,
    ListView,
    ScrollView,
    DeviceEventEmitter
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';

import { connect } from 'react-redux'

import TabBar from '../utils/TabBar'

import Project from './project/home'
import Team from './team/team'
import Resource from './resource/resource'
import UserInfo from './user/user'
import {
    BEFORE_GETSTORES_LIST,GETSTORES_SUCCESS,GETSTORES_FAILED,getStoresList
} from '../actions/storesList'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
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
    imageTopStyle:{
        marginTop:20,
        marginRight:20,
        marginLeft:20,
        height:100,
        width:100,
        resizeMode:'cover'
     },
     imageCenterStyle:{
        marginRight:10,
        marginTop:20,
        height:100,
        width:100
    },
    imageIcon:{
        marginLeft:10,
        marginRight:10,
        height:100,
        width:100
    },
    describe:{
        fontSize:12,
    },
    row:{
        flexDirection:'row',
    },
    colLeft:{
        //flex: 1,
        //flexDirection: 'column',
        marginTop:10,
        width:120,
        alignItems: 'center',
        borderColor:'#ccc',
        borderWidth:1,
        
        //marginLeft: 7, marginRight: 7,
    },
    colRight:{
        paddingLeft:10,
        marginTop:10,
        flex:1,
        flexDirection:'column',
        borderWidth:1,
        borderColor:'#cc0'
        //alignItems:'center',
    }
});

class StoresList extends Component {
    constructor(...args){
        super(...args);
        
        this.listDs = new ListView.DataSource({rowHasChanged: (r1, r2) => {
                r1.object.id !== r2.object.id;
            }
        });
        
        this.state = {
            rotate:0
        }
    }
    componentWillUnmount(){
        //this.loadingTimer(true);
    }
    componentDidMount(){
        //store.dispatch(getElementsByClassName('className'))
        this.props.getStoresList({
            status:'ONGOING',
            pageNo:1,
            pageSize:10
        });
        
    }
    
    componentWillReceiveProps(nextProp){
        //this.updateState(nextProp);
        //this.loadNextPage(nextProp);
    }
    
    componentWillUpdate(){
        
    }
    getDataSource(){
        console.dir(this.props)
        let {storesList,route,navigator} = this.props;
        console.log(storesList);
        if(storesList.storesList.list && storesList.storesList.list.length > 0){
            return this.listDs.cloneWithRows(storesList.storesList.list);
        }
        return this.listDs.cloneWithRows([]);
        
    }
    loadingRes(){
        let {storesList} = this.props;
        if(storesList.status == GETSTORES_SUCCESS && storesList.pageNo === storesList.pageTotal){
            return '没有更多数据！'
        }
        if(storesList.status == GETSTORES_FAILED){
            return '加载数据失败';
        }
    }
    _pressRow(rowID){
        alert("hellow"+rowID);
    }
    _renderRow(rowData, sectionID, rowID){
        return (
            <TouchableOpacity onPress={()=>this._pressRow(rowID)}>
                <View style={styles.row}>
                    <View style={styles.colLeft}>
                        <Image style={styles.imageIcon} source={{uri:{rowData}}}/>
                        <Text style={styles.desc}>
                          this is a stores!
                        </Text>
                    </View>
                    <View style={styles.colRight}>
                          <Text style={styles.context}>
                              this is the stores's info !
                          </Text>
                    </View>
                </View>
            </TouchableOpacity>
            );
    }
  render() {
      let dataSource = this.getDataSource();
      let {navigator} = this.props;
      
      let loadText = this.loadingRes();
      return (
          <View style={styles.container}>
              <ListView
                  initialListSize={1}
                  scrollRenderAheadDistance={200}
                  dataSource={dataSource}
                  removeClippedSubviews={true}
                  enableEmptySections={true}
                  renderFooter={()=>{
                      return (null);
                  }}
                  renderRow={this._renderRow}
              >
              </ListView>
              
            //   <View style={styles.row}>
            //       <View style={styles.colLeft}>
            //           <Image style={styles.imageIcon} source={require('../img/atom.jpg')}/>
            //           <Text style={styles.desc}>
            //             this is a stores!
            //           </Text>
            //       </View>
            //       <View style={styles.colRight}>
            //             <Text style={styles.context}>
            //                 this is the stores's info !
            //             </Text>
            //       </View>
            //   </View>
            //   <View style={styles.row}>
            //       <View style={styles.colLeft}>
            //           <Image style={styles.imageIcon} source={{uri:"http://f1.diyitui.com/18/ac/88/89/c4/1b/ed/86/be/1c/46/62/79/1e/85/f1.jpg"}}/>
            //           <Text style={styles.desc}>
            //             this is a stores!
            //           </Text>
            //       </View>
            //       <View style={styles.colRight}>
            //             <Text style={styles.context}>
            //                 this is the stores's info !
            //             </Text>
            //       </View>
            //   </View>
         </View>
       );
     }
}

function mapStateToProps(state,ownProps){
    console.dir(state);
    return {
        storeList:state.storesList.storesList
    }
}
//export default StoresList;

export default connect(mapStateToProps,{getStoresList})(StoresList)
