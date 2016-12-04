/**
* @Author: 杜绍彬 <dushaobin>
* @Date:   2016-06-21T15:27:23+08:00
* @Email:  shaobin.du@zymobi.com
* @Last modified by:   dushaobin
* @Last modified time: 2016-07-16T10:48:01+08:00
*/



import React, { Component } from 'react';

import { connect } from 'react-redux'

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    ToastAndroid,
    AsyncStorage,
    ScrollView,
    Image,
    Dimensions
} from 'react-native';

import * as Animatable from 'react-native-animatable';

import {
    BEFORE_RESOURCE_LIST,RESOURCE_SUCCESS,RESOURCE_FAILED,getResource
} from '../../actions/resource'

import config from '../../conf/conf'

import Icon from 'react-native-vector-icons/EvilIcons';

import CategoryIcon,{getCategoryColor} from '../../utils/category';

import Button from 'react-native-button'

let {
    height:deviceHeight,
    width:deviceWidth
} = Dimensions.get('window');


const styles = StyleSheet.create({
    container: {
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


class Resource extends Component {
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
    
    updateState(){
        let {resource,route,navigator,unlockLoading} = this.props;
        
        switch (resource.status) {
            case RESOURCE_FAILED:
                if(resource.res && resource.res.message == '未登录'){
                    //navigator.login
                }
                unlockLoading()
                break;
            case RESOURCE_SUCCESS:
                if(resource.list && resource.list.length > 0){
                    
                }
                unlockLoading()
                break;
            default:
                
        }
        
    }
    
    getDataSource(){
        let {resource,route,navigator} = this.props;
        if(resource.list && resource.list.length > 0){
            return this.listDs.cloneWithRows(resource.list);
        }
        return this.listDs.cloneWithRows([]);
    }
    
    loadNextPage(nextProp){
        
        let {scrollStatus,getResource,resource,lockLoading,unlockLoading} = nextProp;
        
        
        if(!scrollStatus.isBottomTrigger && scrollStatus.isScrollBottom && resource.status !== BEFORE_RESOURCE_LIST){
            
            if(resource.pageNo < resource.pageTotal){
                
                lockLoading();
                
                getResource({
                    pageNo:resource.pageNo + 1,
                    pageSize:10
                });
                
            }
        }
    }
    
    loadingRes(){
        let {resource} = this.props;
        
        if(resource.status == RESOURCE_SUCCESS && resource.pageNo === resource.pageTotal){
            return '没有更多数据！'
        }
        if(resource.status == RESOURCE_FAILED){
            return '加载数据失败';
        }
    }
    
    componentDidMount(){
        
        this.props.getResource({
            pageNo:1,
            pageSize:10
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
            '.jsp':'',
        };
        
        let baseUrl = config.host + '/coopDevelopment/img/' ;
        
        
        if(type in typeList){
            return baseUrl+((typeList[type] ? typeList[type] : type)+'.png').substr(1);
        }
        
        return baseUrl+'qt.png';
    }
    
    componentWillReceiveProps(nextProp){
        this.updateState(nextProp);
        this.loadNextPage(nextProp);
    }
    
    componentWillUpdate(){
        
    }
    
    render() {
        //this.updateState();
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
                    renderRow={(rowData) => {
                        return (
                            <Button onPress={()=>{
                                    
                                    // 打开子目录
                                    navigator.push({
                                        id:'childResource',
                                        name:'下一级目录',
                                        resourceInfo:rowData.object
                                    });
                                    
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
            
                <View>
                    <View style={{margin:20,alignItems:'center',justifyContent:'center'}}>
                        {loadText?<Text style={{color:'rgba(0,0,0,0.5)'}}>{loadText}</Text>:<Animatable.View animation="rotate" easing="linear" duration={500} iterationCount='infinite'><Icon name="spinner-3" size={30} color="rgba(0,0,0,0.5)" /></Animatable.View>}
                    </View>
                </View>
            </View>
        );
    }
}


function mapStateToProps(state,ownProps){
    return {
        resource:state.resource.resource
    }
}

export default connect(mapStateToProps,{
    getResource
})(Resource)

