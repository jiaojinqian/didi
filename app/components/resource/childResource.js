/**
* @Author: 杜绍彬 <dushaobin>
* @Date:   2016-06-21T15:27:23+08:00
* @Email:  shaobin.du@zymobi.com
* @Last modified by:   dushaobin
* @Last modified time: 2016-07-18T10:37:12+08:00
*/

import React, { Component } from 'react';

import { connect } from 'react-redux'

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    ScrollView,
    Image,
    Dimensions,
    InteractionManager
} from 'react-native';

import * as Animatable from 'react-native-animatable';

import {
    BEFORE_CHILD_RESOURCE_LIST,CHILD_RESOURCE_SUCCESS,CHILD_RESOURCE_CLEARED,CHILD_RESOURCE_FAILED,getChildResource,clearChildResource
} from '../../actions/resource'

import config from '../../conf/conf'

import Icon from 'react-native-vector-icons/EvilIcons';

import NavHeader from '../../utils/NavHeader'

import Button from 'react-native-button'

import Loading from '../../utils/loading';

let {
    height:deviceHeight,
    width:deviceWidth
} = Dimensions.get('window');


const styles = StyleSheet.create({
    container: {
        backgroundColor:'#fff'
    },
    rowContainer:{
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: 'rgba(0,0,0,0.15)',
        padding:5,
        flexDirection: 'row',
        flex:1,
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
        fontSize:14
    },
    projectOther:{
        color:'rgba(0,0,0,0.6)',
        fontSize:12
    },
    projectOC:{
        paddingBottom:2
    },
    pCategoryBg:{
        position:'absolute',
        backgroundColor:'#4e6cef',
        width:80,
        height:80,
        right:-60,
        top:-60,
        transform:[{rotate:'-45deg'}]
    }
});


class ChildResource extends Component {
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
        
        let {clearChildResource,route} = this.props;
        
        clearChildResource({
            parentId:route.resourceInfo.id
        })
        
    }
    
    showLoading(){
        let {resourceStatus} = this.props;
        if(resourceStatus == CHILD_RESOURCE_SUCCESS || resourceStatus == CHILD_RESOURCE_FAILED || resourceStatus == CHILD_RESOURCE_CLEARED){
            return false;
        }
        return true;
    }
    
    getDataSource(){
        let {resource,route,navigator} = this.props;
        if(resource.list && resource.list.length > 0){
            return this.listDs.cloneWithRows(resource.list);
        }
        return this.listDs.cloneWithRows([]);
    }
    
    loadNextPage(){
        let {
            route,
            resource,
            getChildResource
        } = this.props;
        
        let {resourceInfo} = route;
        
        
        getChildResource({
            projectId:resourceInfo.projectId,
            parentId:resourceInfo.id,
            pageSize:10,
            pageNo:resource.pageNo + 1
        })
    }
    
    getLoadingTip(){
        let {resourceStatus,resource} = this.props;
        
        if(resourceStatus == CHILD_RESOURCE_SUCCESS && resource.total < 1){
            return '没有更多数据！'
        }
        if(resourceStatus == CHILD_RESOURCE_FAILED){
            return '加载数据失败';
        }
        
    }
    
    
    componentDidMount(){
        let {
            route
        } = this.props;
        
        let {
            resourceInfo
        } = route;
        
        
        InteractionManager.runAfterInteractions(()=>{
            
            this.props.getChildResource({
                parentId:resourceInfo.id,
                projectId:resourceInfo.projectId,
                pageNo:1,
                pageSize:10
            });
            
        });
        
    }
    
    getIconUrl(type){
        
        let typeList = {
            'dir':'.wenjianjia',
            '.txt':'',
            '.doc':'',
            '.docxx':'',
            '.wps':'',
            '.html':'',
            '.pdf':'',
            '.vsd':'',
            '.xls':'',
            '.xlsx':'',
            '.pptx':'',
            '.ppt':'',
            '.rar':'',
            '.zip':'',
            '.7z':'',
            '.pic':'',
            '.exe':'',
            '.com':'',
            '.apk':'',
            '.ipa':'',
            '.psd':'',
            '.ai':'',
            '.log':'',
            '.wav':'',
            '.avi':'',
            '.c':'',
            '.wki':'',
            '.bas':'',
            '.fla':'',
            '.asm':'',
            '.for':'',
            '.lib':'',
            '.lst':'',
            '.msg':'',
            '.obj':'',
            '.pas':'',
            '.aac':'',
            '.flac':'',
            '.mpg':'',
            '.mov':'',
            '.swf':'',
            '.rm':'',
            '.aif':'',
            '.au':'',
            '.mp3':'',
            '.ram':'',
            '.wma':'',
            '.mmf':'',
            '.amr':'',
            '.java':'',
            '.msi':'',
            '.tmp':'',
            '.mdf':'',
            '.bat':'',
            '.cas':'',
            '.chm':'',
            '.chr':'',
            '.csv':'',
            '.dll':'',
            '.fot':'',
            '.js':'',
            '.css':'',
        };
        
        let baseUrl = config.host + '/coopDevelopment/img/' ;
        
        
        if(type in typeList){
            return baseUrl+((typeList[type] ? typeList[type] : type)+'.png').substr(1);
        }
        
        return baseUrl+'qt.png';
    }
    
    componentWillReceiveProps(nextProp){
        //this.updateState(nextProp);
        //this.loadNextPage(nextProp);
    }
    
    componentWillUpdate(nextProp){
        let {
            resourceStatus
        } = this.props;
        
        if(nextProp.resourceStatus === resourceStatus){
            return false;
        }
        return true;
        
    }
    
    render() {
        //this.updateState();
        let dataSource = this.getDataSource();
        
        let {navigator,resource,route} = this.props;
        
        let {
            resourceInfo
        } = route;
        
        let resCount = dataSource.getRowCount();
        let resTip = this.getLoadingTip();
        
        let isShowLoading = this.showLoading();
        
        let isResEnded = (resCount >= resource.total) ? true : false;
        
        return (
            <View style={styles.container}>
                
                <NavHeader navigator={navigator} title={resourceInfo.name} leftIcon='ios-arrow-back'></NavHeader>
                
                <ScrollView style={{flex:1,height:deviceHeight - 64}} automaticallyAdjustContentInsets={false}
          scrollEventThrottle={200}>
                    
                  <View style={{
                          justifyContent:'center',
                          alignItems:'center',
                          backgroundColor:'#fff'
                      }}>
                      {isShowLoading ? <Loading></Loading> : null}
                      {resTip?<View style={{margin:30}}><Text style={styles.projectOther}>{resTip}</Text></View>:null}
                  </View>
                    
                    <ListView
                        initialListSize={1}
                        scrollRenderAheadDistance={200}
                        dataSource={dataSource}
                        removeClippedSubviews={true}
                        enableEmptySections={true}
                        renderFooter={()=>{
                            return (null);
                        }}
                        renderRow={(rowData) => {
                            return (
                                <Button onPress={()=>{
                                        
                                        // 打开子目录
                                        if(rowData.object.type == 'dir'){
                                            
                                            navigator.push({
                                                id:'childResource',
                                                name:'下一级目录',
                                                resourceInfo:rowData.object
                                            });
                                            
                                        }else{
                                            //down load file
                                            
                                        }
                                        
                                    }}>
                                    
                                    <View style={styles.rowContainer}>
                                        <View style={styles.left}>
                                            <Image source={{uri: this.getIconUrl(rowData.object.type)}} style={{width: 80, height: 80}} />
                                        </View>
                                        <View style={styles.right}>
                                            
                                            <View style={{paddingBottom:5}}>
                                                <Text style={styles.projectName}>
                                                    {rowData.object.name}
                                                </Text>
                                            </View>
                                            
                                            <View style={styles.projectOC}>
                                                <Text style={styles.projectOther}>所属项目: {rowData.object.projectName}</Text>
                                            </View>
                                            
                                            <View style={styles.projectOC}>
                                                <Text style={styles.projectOther}>大        小: {rowData.object.sizeStr}</Text>
                                            </View>
                                            
                                            <View style={styles.projectOC}>
                                                <Text style={styles.projectOther}>上  传  者: {rowData.object.userName}</Text>
                                            </View>
                                            
                                            <View style={styles.projectOC}>
                                                <Text style={styles.projectOther}>上传时间: {rowData.object.createdAtStr}</Text>
                                            </View>
                                            
                                        </View>
                                    </View>
                                </Button>
                            );
                        }}
                    />
                    
                
                    
                    <View style={{backgroundColor:'#fff',padding:10}}>
                        {isResEnded?null:<Button style={{marginLeft:5,marginRight:5,height:32,textAlignVertical:"center",fontSize:12,fontWeight:'100',color:'#FFF',backgroundColor:"#3b50ce"}} 
                         activeOpacity={0.4} onPress={() => {
                            this.loadNextPage();
                        }}>加载更多</Button>}
                    </View>
                
                </ScrollView>
            </View>
        );
    }
}


function mapStateToProps(state,ownProps){
    let {
        resourceInfo
    } = ownProps.route;
    
    return {
        resourceStatus:state.resource.childResource.status,
        resource:state.resource.childResource.list[resourceInfo.id]?state.resource.childResource.list[resourceInfo.id]:[]
    }
}

export default connect(mapStateToProps,{
    getChildResource,clearChildResource
})(ChildResource)

