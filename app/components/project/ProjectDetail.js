/**
* @Author: 杜绍彬 <dushaobin>
* @Date:   2016-06-24T11:13:56+08:00
* @Email:  shaobin.du@zymobi.com
* @Last modified by:   dushaobin
* @Last modified time: 2016-07-18T11:08:03+08:00
*/


import React, { Component } from 'react';

import { connect } from 'react-redux'

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions,
    ListView,
    Image,
    InteractionManager
} from 'react-native';

import NavHeader from '../../utils/NavHeader'

import Icon from 'react-native-vector-icons/Ionicons';

import CategoryIcon,{getCategoryColor} from '../../utils/category';

import Button from 'react-native-button'

import Loading from '../../utils/loading';

import { 
    BEFORE_APP_LIST,APP_SUCCESS,APP_FAILED,
    BEFORE_PROCESS_LIST,PROCESS_SUCCESS,PROCESS_FAILED,
    BEFORE_MEMBER_LIST,MEMBER_SUCCESS,MEMBER_FAILED,
    DID_FOCUS,CLEAR_FOCUS,
    getAppList,getMemberList,getProcessList,clearProcessList,
    clearMemberList,clearAppList,
    clearFocus,onDidFocus,memberListEnded
} from '../../actions/projectInfo';


let {
    height:deviceHeight,
    width:deviceWidth
} = Dimensions.get('window');


const styles = StyleSheet.create({
    container: {
        backgroundColor:'#fff'
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
    rowContainer:{
        padding:10,
        flexDirection: 'row',
        flex:1,
        backgroundColor:'#fff'
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
        fontSize:16
    },
    projectOther:{
        color:'rgba(0,0,0,0.6)',
        fontSize:12
    },
    projectOC:{
        padding:5,
    },
    pCategoryBg:{
        position:'absolute',
        backgroundColor:'#4e6cef',
        width:80,
        height:80,
        right:-60,
        top:-60,
        transform:[{rotate:'-45deg'}]
    },
    subContainer:{
        
    },
    subHeader:{
        fontSize:14,
        color:'rgba(0,0,0,0.8)',
        alignSelf:'center'
    },
    processItem:{
        flexDirection:'row'
    },
    processKey:{
        flex:1
    },
    processVal:{
        flex:1,
        textAlign:'right'
    }
});

export class ProjectDetail extends Component {
    constructor(...args){
        super(...args);
        
        this.appDs = new ListView.DataSource({rowHasChanged: (r1, r2) => {
                r1.object.id!== r2.object.id;
            }
        });
        
        this.processDs = new ListView.DataSource({rowHasChanged: (r1, r2) => {
                r1.object.id!== r2.object.id;
            }
        });
        
        this.memberDs = new ListView.DataSource({rowHasChanged: (r1, r2) => {
                r1.id!== r2.id;
            }
        });
        
        this.initData = false;
        
    }
    
    getDataSource(){
        
        let {app,member,processe} = this.props;
        let allDs = {
            member:null,
            processe:null,
            app:null
        };
        
        if(app.list && app.list.length > 0){
            allDs.app = this.appDs.cloneWithRows(app.list);
        }else{
            allDs.app = this.appDs.cloneWithRows([]);
        }
        
        if(member.list && member.list.length > 0){
            allDs.member = this.memberDs.cloneWithRows(member.list);
        }else{
            allDs.member = this.memberDs.cloneWithRows([]);
        }
        
        if(processe.list && processe.list.length > 0){
            allDs.processe = this.processDs.cloneWithRows(processe.list);
        }else{
            allDs.processe = this.processDs.cloneWithRows([]);
        }
        
        return allDs;
        
    }
    
    componentWillUnmount(){
        let {clearProcessList,clearMemberList,clearAppList} = this.props;
        
        clearProcessList();
        clearMemberList();
        clearAppList();
        
    }
    
    componentWillMount(){
        
    }
    componentDidMount(){
        let {
            route,
            navigator,
            getProcessList,
            getAppList,
            getMemberList
        } = this.props;
        
        let {project} = route;
        
        InteractionManager.runAfterInteractions(()=>{
            
            getProcessList({
                projectId:project.id
            });
            
            getAppList({
                projectId:project.id
            });
            
            
            getMemberList({
                projectId:project.id,
                pageSize:10,
                pageNo:1
            });
            
        });
        
    }
    
    componentWillReceiveProps(nextProp){
        
    }
    
    showProcessLoading(type){
        let {processe} = this.props;
        if(processe.status == PROCESS_SUCCESS || processe.status == PROCESS_FAILED){
            return false;
        }
        return true;
    }
    
    showAppLoading(){
        let {app} = this.props;
        if(app.status == APP_SUCCESS || app.status == APP_FAILED){
            return false;
        }
        return true;
    }
    
    showMemberLoading(){
        let {member} = this.props;
        if(member.status == MEMBER_SUCCESS || member.status == MEMBER_FAILED){
            return false;
        }
        return true;
    }
    
    loadNextPage(){
        let {
            route,
            member,
            getMemberList,
            memberListEnded
        } = this.props;
        
        let {project} = route;
        
        if(member.isEnd || (member.pageNo)*10 > member.total){
            memberListEnded();
            return;
        }
        
        getMemberList({
            projectId:project.id,
            pageSize:10,
            pageNo:member.pageNo + 1
        })
        
        
    }
    
    getLoadingTip(resCount,type){
        let {processe,app,member} = this.props;
        if(type == 'process'){
            if(processe.status == PROCESS_FAILED){
                return '获取失败！';
            }
            if(processe.status == PROCESS_SUCCESS && resCount < 1){
                return '无数据！'
            }
        }
        
        if(type == 'app'){
            if(app.status == APP_FAILED){
                return '获取失败！';
            }
            if(app.status == APP_SUCCESS && resCount < 1){
                return '无数据！'
            }
        }
        
        if(type == 'member'){
            if(member.status == MEMBER_FAILED){
                return '获取失败！';
            }
            if(member.status == MEMBER_SUCCESS && resCount < 1){
                return '无数据！'
            }
        }
    }
    
    shouldComponentUpdate(nextProp,nextState){
        let {
            member,
            app,
            processe
        } = this.props;
        
        if(nextProp.member.status === member.status && nextProp.app.status === app.status && nextProp.processe.status === processe.status){
            return false;
        }
        return true;
        
    }
    
    
    render() {
        let {route,navigator,member} = this.props;
        let {project} = route;
        
        let allDs = this.getDataSource();
        
        let processCount = allDs.processe.getRowCount();
        let isShowProcessLoading = this.showProcessLoading();
        
        let processRes = this.getLoadingTip(processCount,'process');
        
        let appCount = allDs.app.getRowCount();
        let appRes = this.getLoadingTip(appCount,'app');
        let isShowAppLoading = this.showAppLoading();
        
        let memberCount = allDs.member.getRowCount();
        let memberRes = this.getLoadingTip(memberCount,'member');
        let isShowMemberLoading = this.showMemberLoading();
        
        let isMemberEnded = (memberCount >= member.total) ? true : false;
        
        return (
            <View style={styles.container}>
                <NavHeader navigator={navigator} title={project.name} leftIcon='ios-arrow-back'></NavHeader>
                
                <ScrollView style={{flex:1,height:deviceHeight - 64}} automaticallyAdjustContentInsets={false}
          scrollEventThrottle={200}>
                    <View style={{backgroundColor:'#fff'}}>
                        <View style={styles.rowContainer}>
                            <View style={styles.right}>
                                <View style={{position:'absolute',top:0,right:0,}}>
                                    <View style={styles.pCategoryBg}>
                                    </View>
                                    <View style={{top:-3,right:-3}}>
                                        <CategoryIcon size={11} catId={project.categoryId} />
                                    </View>
                                </View>
                                <View style={{justifyContent:'center',alignItems:'center',padding:10}}>
                                    <View style={[styles.leftProgress,{backgroundColor:getCategoryColor(project.categoryId)}]}>
                                        <Text style={{color:'#fff',fontSize:18}}>
                                             {project.progress+'%'}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{paddingTop:10,paddingBottom:20,justifyContent:'center',alignItems:'center'}}>
                                    <Text style={styles.projectName}>
                                        {project.name}
                                    </Text>
                                </View>
                                
                                <View style={[styles.projectOC,{borderColor:'rgba(0,0,0,0.15)',borderTopWidth:1}]}>
                                    <Text style={styles.projectOther}>所属团队: {project.teamName}</Text>
                                </View>
                                
                                <View style={styles.projectOC}>
                                    <Text style={styles.projectOther}>创  建  者: {project.creator}</Text>
                                </View>
                                
                                <View style={styles.projectOC}>
                                    <Text style={styles.projectOther}>成员数量: {project.memberSum}</Text>
                                </View>
                                
                                <View style={styles.projectOC}>
                                    <Text style={styles.projectOther}>项目类别: {project.categoryName}</Text>
                                </View>
                                
                                <View style={styles.projectOC}>
                                    <Text style={styles.projectOther}>创建时间: {project.createdAtStr}</Text>
                                </View>
                                <View style={styles.projectOC}>
                                    <Text style={styles.projectOther}>创建时间: {project.createdAtStr}</Text>
                                </View>
                                <View style={styles.projectOC}>
                                    <Text style={styles.projectOther}>截止时间: {project.endDate || '暂无'}</Text>
                                </View>
                                
                                <View style={styles.projectOC}>
                                    <Text style={styles.projectOther}>项目描述: {project.detail}</Text>
                                </View>
                                
                            </View>
                        </View>
                    </View>
                    
                    <View style={{
                            paddingLeft:10,
                            paddingRight:10,
                            paddingBottom:10,
                            backgroundColor:'#f5f5f5'
                        }}>
                            
                        <View style={{padding:10,
                                marginTop:10,
                                borderBottomWidth:1,
                                backgroundColor:'#fff',
                                borderColor: 'rgba(0,0,0,0.15)',}}>
                            <Text style={styles.subHeader}>流程状态</Text>
                        </View>
                        
                        <View style={{
                                justifyContent:'center',
                                alignItems:'center',
                                backgroundColor:'#fff'
                            }}>
                            {isShowProcessLoading ? <Loading></Loading> : null}
                            {processRes?<View style={{margin:30}}><Text style={styles.projectOther}>{processRes}</Text></View>:null}
                        </View>
                        
                        
                        <ListView
                            initialListSize={1}
                            scrollRenderAheadDistance={200}
                            dataSource={allDs.processe}
                            enableEmptySections={true}
                            renderFooter={()=>{
                                return (null);
                            }}
                            renderSeparator={(sectionID, rowID)=>{
                                if(rowID >= processCount - 1 ){
                                    return null;
                                }
                                return (
                                    <View key={rowID} style={{padding:10,justifyContent:'center',alignItems:'center'}}>
                                        <Icon name="ios-arrow-down" size={40} color="#3b50ce"></Icon>
                                    </View>
                                )
                            }}
                            renderRow={(rowData) => {
                                return (<View style={{backgroundColor:'#fff'}}>
                                    <View>
                                        <View style={[styles.projectOC,styles.processItem]}>
                                            <Text style={[styles.projectOther,styles.processKey]}>
                                                流程名称:
                                            </Text>
                                            <Text style={[styles.projectOther,styles.processVal]}>
                                                {rowData.object.name}
                                            </Text>
                                        </View>
                                        
                                        <View style={[styles.projectOC,styles.processItem]}>
                                            <Text style={[styles.projectOther,styles.processKey]}>
                                                权重:
                                            </Text>
                                            <Text style={[styles.projectOther,styles.processVal]}>
                                                {rowData.object.weight || 0}
                                            </Text>
                                        </View>
                                        
                                        <View style={[styles.projectOC,styles.processItem]}>
                                            <Text style={[styles.projectOther,styles.processKey]}>
                                                进度:
                                            </Text>
                                            <Text style={[styles.projectOther,styles.processVal,{color:'#2a36b1'}]}>
                                                {rowData.object.progress || 0}%
                                            </Text>
                                        </View>
                                        
                                        <View style={[styles.projectOC,styles.processItem]}>
                                            <Text style={[styles.projectOther,styles.processKey]}>
                                                状态:
                                            </Text>
                                            <Text style={[styles.projectOther,styles.processVal,{color:'#2a36b1'}]}>
                                                {rowData.object.status}
                                            </Text>
                                        </View>
                                        
                                        <View style={[styles.projectOC,styles.processItem]}>
                                            <Text style={[styles.projectOther,styles.processKey]}>
                                                成员总数:
                                            </Text>
                                            <Text style={[styles.projectOther,styles.processVal]}>
                                                {rowData.object.memberTotal || 0}
                                            </Text>
                                        </View>
                                        
                                        <View style={[styles.projectOC,styles.processItem]}>
                                            <Text style={[styles.projectOther,styles.processKey]}>
                                                资源总数:
                                            </Text>
                                            <Text style={[styles.projectOther,styles.processVal]}>
                                                {rowData.object.resourceTotal || 0}
                                            </Text>
                                        </View>
                                        
                                        <View style={[styles.projectOC,styles.processItem]}>
                                            <Text style={[styles.projectOther,styles.processKey]}>
                                                任务总数:
                                            </Text>
                                            <Text style={[styles.projectOther,styles.processVal]}>
                                                {rowData.object.taskTotal || 0}
                                            </Text>
                                        </View>
                                        
                                        <View style={[styles.projectOC,styles.processItem]}>
                                            <Text style={[styles.projectOther,styles.processKey]}>
                                                未完成任务:
                                            </Text>
                                            <Text style={[styles.projectOther,styles.processVal]}>
                                                {rowData.object.taskUnfinishTotal || 0}
                                            </Text>
                                        </View>
                                        
                                        <View style={[styles.projectOC,styles.processItem]}>
                                            <Text style={[styles.projectOther,styles.processKey]}>
                                                Bug:
                                            </Text>
                                            <Text style={[styles.projectOther,styles.processVal]}>
                                                {rowData.object.bugTotal || 0}
                                            </Text>
                                        </View>
                                        
                                        <View style={[styles.projectOC,styles.processItem]}>
                                            <Text style={[styles.projectOther,styles.processKey]}>
                                                未解决Bug:
                                            </Text>
                                            <Text style={[styles.projectOther,styles.processVal]}>
                                                {rowData.object.bugUnfinishTotal || 0}
                                            </Text>
                                        </View>
                                        
                                        <View style={[styles.projectOC,styles.processItem]}>
                                            <Text style={[styles.projectOther,styles.processKey]}>
                                                创建时间:
                                            </Text>
                                            <Text style={[styles.projectOther,styles.processVal]}>
                                                {rowData.object.createdAtStr || '暂无'}
                                            </Text>
                                        </View>
                                        
                                        <View style={[styles.projectOC,styles.processItem]}>
                                            <Text style={[styles.projectOther,styles.processKey]}>
                                                开始时间:
                                            </Text>
                                            <Text style={[styles.projectOther,styles.processVal]}>
                                                {rowData.object.startDate || '暂无'}
                                            </Text>
                                        </View>
                                        
                                        <View style={[styles.projectOC,styles.processItem]}>
                                            <Text style={[styles.projectOther,styles.processKey]}>
                                                更新时间:
                                            </Text>
                                            <Text style={[styles.projectOther,styles.processVal]}>
                                                {rowData.object.updatedAtStr || '暂无'}
                                            </Text>
                                        </View>
                                        
                                        <View style={[styles.projectOC,styles.processItem]}>
                                            <Text style={[styles.projectOther,styles.processKey]}>
                                                结束时间:
                                            </Text>
                                            <Text style={[styles.projectOther,styles.processVal]}>
                                                {rowData.object.endDate || '暂无'}
                                            </Text>
                                        </View>
                                        <View style={[styles.projectOC,styles.processItem]}>
                                            <Text style={[styles.projectOther,styles.processKey]}>
                                                描述:
                                            </Text>
                                            <Text style={[styles.projectOther,styles.processVal]}>
                                                {rowData.object.detail || '暂无'}
                                            </Text>
                                        </View>
                                        
                                    </View>
                                    
                                </View>)
                            }}
                        />
                        
                        
                    </View>
                    
                    <View style={{
                            paddingLeft:10,
                            paddingRight:10,
                            paddingBottom:10,
                            backgroundColor:'#f5f5f5'
                        }}>
                            
                        <View style={{padding:10,
                                borderBottomWidth:1,
                                backgroundColor:'#fff',
                                borderColor: 'rgba(0,0,0,0.15)',}}>
                            <Text style={styles.subHeader}>应用列表</Text>
                        </View>
                        
                        <View style={{
                                justifyContent:'center',
                                alignItems:'center',
                                backgroundColor:'#fff'
                            }}>
                            {isShowAppLoading ? <Loading></Loading> : null}
                            {appRes?<View style={{margin:30}}><Text style={styles.projectOther}>{appRes}</Text></View>:null}
                        </View>
                        
                        <ListView
                            initialListSize={1}
                            scrollRenderAheadDistance={200}
                            dataSource={allDs.app}
                            enableEmptySections={true}
                            renderFooter={()=>{
                                return (null);
                            }}
                            renderSeparator={(sectionID, rowID)=>{
                                return (
                                    <View key={rowID} style={{padding:10,justifyContent:'center',alignItems:'center'}}>
                                    </View>
                                );
                            }}
                            
                            renderRow={(rowData) => {
                                return (<View style={{backgroundColor:'#ffffff'}}>
                                    <View>
                                        <View style={[styles.projectOC,styles.processItem]}>
                                            <Text style={[styles.projectOther,styles.processKey]}>
                                                应用名称:
                                            </Text>
                                            <Text style={[styles.projectOther,styles.processVal]}>
                                                {rowData.object.name}
                                            </Text>
                                        </View>
                                        
                                        <View style={[styles.projectOC,styles.processItem]}>
                                            <Text style={[styles.projectOther,styles.processKey]}>
                                                应用ID:
                                            </Text>
                                            <Text style={[styles.projectOther,styles.processVal]}>
                                                {rowData.object.appcanAppId}
                                            </Text>
                                        </View>
                                        
                                        <View style={[styles.projectOC,styles.processItem]}>
                                            <Text style={[styles.projectOther,styles.processKey]}>
                                                应用类型:
                                            </Text>
                                            <Text style={[styles.projectOther,styles.processVal]}>
                                                {rowData.object.appType || 0}
                                            </Text>
                                        </View>
                                        
                                        <View style={[styles.projectOC,styles.processItem]}>
                                            <Text style={[styles.projectOther,styles.processKey]}>
                                                是否发布:
                                            </Text>
                                            <Text style={[styles.projectOther,styles.processVal]}>
                                                {rowData.object.published}
                                            </Text>
                                        </View>
                                        
                                        <View style={[styles.projectOC,styles.processItem]}>
                                            <Text style={[styles.projectOther,styles.processKey]}>
                                                实体类型:
                                            </Text>
                                            <Text style={[styles.projectOther,styles.processVal]}>
                                                {rowData.object.repoType || 0}
                                            </Text>
                                        </View>
                                        
                                        <View style={[styles.projectOC,styles.processItem]}>
                                            <Text style={[styles.projectOther,styles.processKey]}>
                                                创建时间:
                                            </Text>
                                            <Text style={[styles.projectOther,styles.processVal]}>
                                                {rowData.object.createdAtStr}
                                            </Text>
                                        </View>
                                        
                                        <View style={[styles.projectOC,styles.processItem]}>
                                            <Text style={[styles.projectOther,styles.processKey]}>
                                                更新时间:
                                            </Text>
                                            <Text style={[styles.projectOther,styles.processVal]}>
                                                {rowData.object.updatedAtStr}
                                            </Text>
                                        </View>
                                        
                                        <View style={[styles.projectOC,styles.processItem]}>
                                            <Text style={[styles.projectOther,styles.processKey]}>
                                                应用 key:  {rowData.object.appcanAppKey}
                                            </Text>
                                        </View>
                                        
                                        <View style={[styles.projectOC,styles.processItem]}>
                                            <Text style={[styles.projectOther,styles.processKey]}>
                                                代码地址:  {rowData.object.remoteRepoUrl}
                                            </Text>
                                        </View>
                                        
                                        <View style={[styles.projectOC,styles.processItem]}>
                                            <Text style={[styles.projectOther,styles.processKey]}>
                                                描        述:  {rowData.object.detail || '暂无'}
                                            </Text>
                                        </View>
                                    </View>
                                    
                                </View>);
                            }}
                        />
                        
                    </View>
                    
                    <View style={{
                            paddingLeft:10,
                            paddingRight:10,
                            paddingBottom:10,
                            backgroundColor:'#f5f5f5'
                        }}>
                            
                        <View style={{padding:10,
                                borderBottomWidth:1,
                                backgroundColor:'#fff',
                                borderColor: 'rgba(0,0,0,0.15)',}}>
                            <Text style={styles.subHeader}>成员列表</Text>
                        </View>
                        
                        <View style={{
                                justifyContent:'center',
                                alignItems:'center',
                                backgroundColor:'#fff'
                            }}>
                            {isShowMemberLoading ? <Loading></Loading> : null}
                            {memberRes?<View style={{margin:30}}><Text style={styles.projectOther}>{memberRes}</Text></View>:null}
                        </View>
                        
                        <ListView
                            initialListSize={1}
                            scrollRenderAheadDistance={200}
                            removeClippedSubviews={true}
                            dataSource={allDs.member}
                            enableEmptySections={true}
                            renderFooter={()=>{
                                return null;
                            }}
                            renderSeparator={(sectionID, rowID)=>{
                                return null;
                            }}
                            renderRow={(rowData) => {
                                return (<View style={{backgroundColor:'#fff'}}>
                                <Button onPress={()=>{
                                        navigator.push({
                                            id:'memberInfo',
                                            name:'成员信息',
                                            member:rowData
                                        });
                                    }}>
                                    <View style={styles.rowContainer}>
                                        <View style={styles.left}>
                                            <View style={{borderWidth:4,borderColor:'#f2f2f2'}}>
                                                <Image source={{uri: rowData.userIcon}} style={{width: 90, height: 90}} />
                                            </View>
                                        </View>
                                        <View style={styles.right}>
                                            <View>
                                                <Text style={styles.projectName}>  {rowData.userName}</Text>
                                            </View>
                                            <View style={styles.projectOC}>
                                                <Text style={styles.projectOther}>账户: {rowData.userAccount}</Text>
                                            </View>
                                            <View style={styles.projectOC}>
                                                <Text style={styles.projectOther}>角色: {rowData.role[0].cnName}</Text>
                                            </View>
                                            <View style={styles.projectOC}>
                                                <Text style={styles.projectOther}>创建时间: {rowData.createdAtStr}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </Button>
                                    
                                </View>)
                            }}
                        />
                    
                        <View style={{backgroundColor:'#fff',padding:10}}>
                            {isMemberEnded?null:<Button style={{marginLeft:5,marginRight:5,height:32,textAlignVertical:"center",fontSize:12,fontWeight:'100',color:'#FFF',backgroundColor:"#3b50ce"}} 
                             activeOpacity={0.4} onPress={() => {
                                this.loadNextPage();
                            }}>加载更多</Button>}
                        </View>
                        
                    </View>
            </ScrollView>
                
            </View>
        );
    }
}


function mapStateToProps(state,ownProps){
    return {
        member:state.projectInfo.member,
        processe:state.projectInfo.processe,
        app:state.projectInfo.app
    }
}

export default connect(mapStateToProps,{
    getAppList,getMemberList,getProcessList,clearProcessList,
    onDidFocus,clearFocus,memberListEnded,clearMemberList,clearAppList
})(ProjectDetail)
