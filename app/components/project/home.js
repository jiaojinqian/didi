/**
* @Author: 杜绍彬 <dushaobin>
* @Date:   2016-06-21T15:27:23+08:00
* @Email:  shaobin.du@zymobi.com
* @Last modified by:   dushaobin
* @Last modified time: 2016-10-26T12:04:01+08:00
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
    Modal,
    Dimensions
} from 'react-native';

import * as Animatable from 'react-native-animatable';

import {
    BEFORE_PROJECT_LIST,PROJECT_SUCCESS,PROJECT_FAILED,getProject
} from '../../actions/project'


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


class Home extends Component {
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
        let {project,route,navigator,unlockLoading} = this.props;
        
        switch (project.status) {
            case PROJECT_FAILED:
                if(project.res && project.res.message == '未登录'){
                    //navigator.login
                    navigator.push({
                        id:'lancher',
                        name:'登录'
                    })
                }
                unlockLoading()
                break;
            case PROJECT_SUCCESS:
                if(project.list && project.list.length > 0){
                    
                }
                unlockLoading()
                break;
            default:
                
        }
        
    }
    
    getDataSource(){
        
        let {project,route,navigator} = this.props;
        if(project.list && project.list.length > 0){
            return this.listDs.cloneWithRows(project.list);
        }
        return this.listDs.cloneWithRows([]);
        
    }
    
    loadNextPage(nextProp){
        
        let {scrollStatus,getProject,project,lockLoading,unlockLoading} = nextProp;
        
        
        if(!scrollStatus.isBottomTrigger && scrollStatus.isScrollBottom && project.status !== BEFORE_PROJECT_LIST){
            
            if(project.pageNo < project.pageTotal){
                
                lockLoading();
                
                getProject({
                    status:'ONGOING',
                    pageNo:project.pageNo + 1,
                    pageSize:10
                });
                
            }
        }
    }
    
    loadingRes(){
        let {project} = this.props;
        if(project.status == PROJECT_SUCCESS && project.pageNo === project.pageTotal){
            return '没有更多数据！'
        }
        if(project.status == PROJECT_FAILED){
            return '加载数据失败';
        }
    }
    
    componentDidMount(){
        //store.dispatch(getElementsByClassName('className'))
        // this.props.getProject({
        //     status:'ONGOING',
        //     pageNo:1,
        //     pageSize:10
        // });
        
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
                                    navigator.push({
                                        id:'projectDetail',
                                        name:'项目详情',
                                        project:rowData.object
                                    });
                                }}>
                                <View style={styles.rowContainer}>
                                    <View style={styles.left}>
                                        <View style={[styles.leftProgress,{backgroundColor:getCategoryColor(rowData.object.categoryId)}]}>
                                            <Text style={{color:'#fff',fontSize:18}}>
                                                 {rowData.object.progress+'%'}
                                            </Text>
                                        </View>
                                        
                                    </View>
                                    <View style={styles.right}>
                                        <View style={{position:'absolute',top:0,right:0,}}>
                                            <View style={styles.pCategoryBg}>
                                            </View>
                                            <View style={{top:-3,right:-3}}>
                                                <CategoryIcon size={11} catId={rowData.object.categoryId} />
                                            </View>
                                        </View>
                                        <View style={{paddingBottom:5}}>
                                            <Text style={styles.projectName}>
                                                {rowData.object.name}
                                            </Text>
                                        </View>
                                        
                                        <View style={styles.projectOC}>
                                            <Text style={styles.projectOther}>所属团队: {rowData.object.teamName}</Text>
                                        </View>
                                        
                                        <View style={styles.projectOC}>
                                            <Text style={styles.projectOther}>类        别: {rowData.object.categoryName}</Text>
                                        </View>
                                        
                                        <View style={styles.projectOC}>
                                            <Text style={styles.projectOther}>类        型: {rowData.object.type}</Text>
                                        </View>
                                        
                                        <View style={[styles.projectOC,{flexDirection:'row'}]}>
                                            <View style={{flex:1}}>
                                                <Text style={styles.projectOther}>创  建  者: {rowData.object.creator}</Text>
                                            </View>
                                            
                                            <View style={{flex:1}}>
                                                <Text style={styles.projectOther}>成员: {rowData.object.memberSum}</Text>
                                            </View>
                                        </View>
                                        
                                        <View style={styles.projectOC}>
                                            <Text style={styles.projectOther}>创建时间: {rowData.object.createdAtStr}</Text>
                                        </View>
                                        
                                        <View style={styles.projectOC}>
                                            <Text style={styles.projectOther}>截止时间: {rowData.object.endDate || '暂无'}</Text>
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
        project:state.project.project
    }
}

export default connect(mapStateToProps,{
    
})(Home)

