/**
* @Author: 杜绍彬 <dushaobin>
* @Date:   2016-06-24T11:13:56+08:00
* @Email:  shaobin.du@zymobi.com
* @Last modified by:   dushaobin
* @Last modified time: 2016-07-12T15:56:48+08:00
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
    BEFORE_TEAM_MEMBER_LIST,TEAM_MEMBER_SUCCESS,TEAM_MEMBER_FAILED,TEAM_MEMBER_ENDED,TEAM_MEMBER_CLEARED,
    BEFORE_TEAM_PROJECT_LIST,TEAM_PROJECT_SUCCESS,TEAM_PROJECT_FAILED,TEAM_PROJECT_ENDED,TEAM_PROJECT_CLEARED,
    getTeamMemberList,getTeamProjectList,
    clearTeamMemberList,clearTeamProjectList,
    teamMemberListEnded,teamProjectListEnded
} from '../../actions/teamInfo';


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

export class TeamDetail extends Component {
    constructor(...args){
        super(...args);
        
        this.teamMemberDs = new ListView.DataSource({rowHasChanged: (r1, r2) => {
                r1.id!== r2.id;
            }
        });
        
        this.teamProjectDs = new ListView.DataSource({rowHasChanged: (r1, r2) => {
                r1.id!== r2.id;
            }
        });
        
        this.initData = false;
        
    }
    
    getDataSource(){
        
        let {teamProject,teamMember} = this.props;
        
        let allDs = {
            teamProject:null,
            teamMember:null
        };
        
        if(teamProject.list && teamProject.list.length > 0){
            allDs.teamProject = this.teamProjectDs.cloneWithRows(teamProject.list);
        }else{
            allDs.teamProject = this.teamProjectDs.cloneWithRows([]);
        }
        
        if(teamMember.list && teamMember.list.length > 0){
            allDs.teamMember = this.teamMemberDs.cloneWithRows(teamMember.list);
        }else{
            allDs.teamMember = this.teamMemberDs.cloneWithRows([]);
        }
        
        return allDs;
        
    }
    
    componentWillUnmount(){
        let {clearTeamProjectList,clearTeamMemberList} = this.props;
        
        clearTeamProjectList();
        clearTeamMemberList();
        
        // clearAppList();
        
    }
    
    componentWillMount(){
        
    }
    componentDidMount(){
        let {
            route,
            navigator,
            getTeamProjectList,
            getTeamMemberList
        } = this.props;
        
        let {team} = route;
        
        InteractionManager.runAfterInteractions(()=>{
            
            getTeamProjectList({
                teamId:team.id,
                pageSize:10,
                pageNo:1
            });
            
            getTeamMemberList({
                teamId:team.id,
                pageSize:10,
                pageNo:1
            });
            
        });
        
    }
    
    componentWillReceiveProps(nextProp){
        
    }
    
    showTeamMemberLoading(){
        let {teamMember} = this.props;
        if(teamMember.status == TEAM_MEMBER_SUCCESS || teamMember.status == TEAM_MEMBER_FAILED){
            return false;
        }
        return true;
    }
    
    showTeamProjectLoading(){
        let {teamProject} = this.props;
        if(teamProject.status == TEAM_PROJECT_SUCCESS || teamProject.status == TEAM_PROJECT_FAILED){
            return false;
        }
        return true;
    }
    
    loadNextPage(type){
        let {
            route,
            teamMember,
            teamProject,
            getTeamMemberList,
            getTeamProjectList,
            teamMemberListEnded,
            teamProjectListEnded
        } = this.props;
        
        let {team} = route;
        
        if(type === 'teamMember'){
            if(teamMember.isEnd || (teamMember.pageNo)*10 > teamMember.total){
                teamMemberListEnded();
                return;
            }
            
            getTeamMemberList({
                teamId:team.id,
                pageSize:10,
                pageNo:teamMember.pageNo + 1
            });
            
        }
        
        if(type === 'teamProject'){
            if(teamProject.isEnd || (teamProject.pageNo)*10 > teamProject.total){
                teamProjectListEnded();
                return;
            }
            
            getTeamProjectList({
                teamId:team.id,
                pageSize:10,
                pageNo:teamProject.pageNo + 1
            });
        }
        
    }
    
    getLoadingTip(resCount,type){
        let {teamProject,teamMember} = this.props;
        if(type == 'teamMember'){
            if(teamMember.status == TEAM_MEMBER_FAILED){
                return '获取失败！';
            }
            if(teamMember.status == TEAM_MEMBER_SUCCESS && resCount < 1){
                return '无数据！'
            }
        }
        
        if(type == 'teamProject'){
            if(teamProject.status == TEAM_PROJECT_FAILED){
                return '获取失败！';
            }
            if(teamProject.status == TEAM_PROJECT_SUCCESS && resCount < 1){
                return '无数据！'
            }
        }
        
    }
    
    shouldComponentUpdate(nextProp,nextState){
        let {
            teamMember,
            teamProject
        } = this.props;
        
        if(nextProp.teamProject.status === teamProject.status && nextProp.teamMember.status === teamMember.status){
            return false;
        }
        return true;
        
    }
    
    
    render() {
        let {route,navigator,teamMember,teamProject} = this.props;
        let {team} = route;
        
        let allDs = this.getDataSource();
        
        let teamMemberCount = allDs.teamMember.getRowCount();
        let isShowTeamMemberLoading = this.showTeamMemberLoading();
        let teamMemberRes = this.getLoadingTip(teamMemberCount,'teamMember');
        
        let teamProjectCount = allDs.teamProject.getRowCount();
        let teamProjectRes = this.getLoadingTip(teamProjectCount,'teamProject');
        let isShowTeamProjectLoading = this.showTeamProjectLoading();
        
        let isTeamMemberEnded = (teamMemberCount >= teamMember.total) ? true : false;
        
        let isTeamProjectEnded = (teamProjectCount >= teamProject.total) ? true : false;
        
        return (
            <View style={styles.container}>
                <NavHeader navigator={navigator} title={team.name} leftIcon='ios-arrow-back'></NavHeader>
                
                <ScrollView style={{flex:1,height:deviceHeight - 64}} automaticallyAdjustContentInsets={false}
          scrollEventThrottle={200}>
                    <View style={{backgroundColor:'#fff'}}>
                        <View style={styles.rowContainer}>
                            <View style={styles.right}>
                                <View style={{justifyContent:'center',alignItems:'center',padding:10}}>
                                    <View style={[styles.leftProgress,{backgroundColor:getCategoryColor(parseInt(team.id%21))}]}>
                                        <Text style={{color:'#fff',fontSize:40}}>
                                             {team.name[0].toUpperCase()}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{paddingTop:10,paddingBottom:20,justifyContent:'center',alignItems:'center'}}>
                                    <Text style={styles.projectName}>
                                        {team.name}
                                    </Text>
                                </View>
                                
                                <View style={[styles.projectOC,styles.processItem]}>
                                    <Text style={[styles.projectOther,styles.processKey]}>
                                        类    型:
                                    </Text>
                                    <Text style={[styles.projectOther,styles.processVal]}>
                                        {team.type}
                                    </Text>
                                </View>
                                
                                <View style={[styles.projectOC,styles.processItem]}>
                                    <Text style={[styles.projectOther,styles.processKey]}>
                                        创  建  者:
                                    </Text>
                                    <Text style={[styles.projectOther,styles.processVal]}>
                                        {team.creator}
                                    </Text>
                                </View>
                                
                                
                                <View style={[styles.projectOC,styles.processItem]}>
                                    <Text style={[styles.projectOther,styles.processKey]}>
                                        成员数量:
                                    </Text>
                                    <Text style={[styles.projectOther,styles.processVal]}>
                                        {team.memberSum}
                                    </Text>
                                </View>
                                
                                <View style={[styles.projectOC,styles.processItem]}>
                                    <Text style={[styles.projectOther,styles.processKey]}>
                                        项目数量:
                                    </Text>
                                    <Text style={[styles.projectOther,styles.processVal]}>
                                        {team.projectSum}
                                    </Text>
                                </View>
                                
                                <View style={styles.projectOC}>
                                    <Text style={styles.projectOther}>描    述: {team.detail}</Text>
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
                            <Text style={styles.subHeader}>团队项目</Text>
                        </View>
                        
                        <View style={{
                                justifyContent:'center',
                                alignItems:'center',
                                backgroundColor:'#fff'
                            }}>
                            {isShowTeamProjectLoading ? <Loading></Loading> : null}
                            {teamProjectRes?<View style={{margin:30}}><Text style={styles.projectOther}>{teamProjectRes}</Text></View>:null}
                        </View>
                        
                        
                        <ListView
                            initialListSize={1}
                            scrollRenderAheadDistance={200}
                            dataSource={allDs.teamProject}
                            enableEmptySections={true}
                            renderFooter={()=>{
                                return (null);
                            }}
                            renderSeparator={(sectionID, rowID)=>{
                                if(rowID >= teamProjectCount - 1 ){
                                    return null;
                                }
                                
                                return (
                                    <View key={rowID} style={{padding:2,justifyContent:'center',alignItems:'center'}}>
                                    </View>
                                )
                                
                            }}
                            renderRow={(rowData) => {
                                return (<View style={{backgroundColor:'#fff'}}>
                                    <Button onPress={()=>{
                                            rowData.teamName = teamProject.teamName;
                                            navigator.push({
                                                id:'projectDetail',
                                                name:'项目详情',
                                                project:rowData
                                            });
                                            
                                        }}>
                                        <View style={styles.rowContainer}>
                                            <View style={styles.left}>
                                                <View style={[styles.leftProgress,{backgroundColor:getCategoryColor(rowData.categoryId)}]}>
                                                    <Text style={{color:'#fff',fontSize:18}}>
                                                         {rowData.progress+'%'}
                                                    </Text>
                                                </View>
                                                
                                            </View>
                                            <View style={styles.right}>
                                                <View style={{position:'absolute',top:0,right:0,}}>
                                                    <View style={styles.pCategoryBg}>
                                                    </View>
                                                    <View style={{top:-3,right:-3}}>
                                                        <CategoryIcon size={11} catId={rowData.categoryId} />
                                                    </View>
                                                </View>
                                                
                                                <View style={{paddingBottom:5}}>
                                                    <Text style={styles.projectName}>
                                                        {rowData.name}
                                                    </Text>
                                                </View>
                                                
                                                <View style={[styles.projectOC,{padding:1}]}>
                                                    <Text style={styles.projectOther}>类型: {rowData.categoryName}</Text>
                                                </View>
                                                
                                                <View style={[styles.projectOC,{padding:1}]}>
                                                    <Text style={styles.projectOther}>状态: {rowData.status}</Text>
                                                </View>
                                                
                                                <View style={[styles.projectOC,{padding:1}]}>
                                                    <Text style={styles.projectOther}>所属团队: {rowData.teamName}</Text>
                                                </View>
                                                
                                                <View style={[styles.projectOC,{padding:1}]}>
                                                    <Text style={styles.projectOther}>创  建  者: {rowData.creator}</Text>
                                                </View>
                                                
                                                <View style={[styles.projectOC,{padding:1}]}>
                                                    <Text style={styles.projectOther}>成      员: {rowData.memberSum}</Text>
                                                </View>
                                                
                                                <View style={[styles.projectOC,{padding:1}]}>
                                                    <Text style={styles.projectOther}>创建时间: {rowData.createdAtStr}</Text>
                                                </View>
                                                
                                                <View style={[styles.projectOC,{padding:1}]}>
                                                    <Text style={styles.projectOther}>截止时间: {rowData.endDate || '暂无'}</Text>
                                                </View>
                                                
                                                <View style={[styles.projectOC,{padding:1}]}>
                                                    <Text style={styles.projectOther}>描述: {rowData.detail}</Text>
                                                </View>
                                                
                                            </View>
                                        </View>
                                    </Button>
                                    
                                </View>)
                            }}
                        />
                        
                        <View style={{backgroundColor:'#fff',padding:10}}>
                            {isTeamProjectEnded?null:<Button style={{marginLeft:5,marginRight:5,height:32,textAlignVertical:"center",fontSize:12,fontWeight:'100',color:'#FFF',backgroundColor:"#3b50ce"}} 
                             activeOpacity={0.4} onPress={() => {
                                this.loadNextPage('teamProject');
                            }}>加载更多</Button>}
                        </View>
                        
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
                            <Text style={styles.subHeader}>团队成员</Text>
                        </View>
                        
                        <View style={{
                                justifyContent:'center',
                                alignItems:'center',
                                backgroundColor:'#fff'
                            }}>
                            {isShowTeamMemberLoading ? <Loading></Loading> : null}
                            {teamMemberRes?<View style={{margin:30}}><Text style={styles.projectOther}>{teamMemberRes}</Text></View>:null}
                        </View>
                        
                        <ListView
                            initialListSize={1}
                            scrollRenderAheadDistance={200}
                            removeClippedSubviews={true}
                            dataSource={allDs.teamMember}
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
                                        rowData.userIcon = rowData.icon;
                                        rowData.userAccount = rowData.account;
                                        rowData.role = [{cnName:rowData.roleNameInTeam}]
                                        navigator.push({
                                            id:'memberInfo',
                                            name:'成员信息',
                                            member:rowData
                                        });
                                    }}>
                                    <View style={styles.rowContainer}>
                                        <View style={styles.left}>
                                            <View style={{borderWidth:4,borderColor:'#f2f2f2'}}>
                                                <Image source={{uri: rowData.icon}} style={{width: 90, height: 90}} />
                                            </View>
                                        </View>
                                        <View style={styles.right}>
                                            <View>
                                                <Text style={styles.projectName}>  {rowData.userName}</Text>
                                            </View>
                                            <View style={styles.projectOC}>
                                                <Text style={styles.projectOther}>账户: {rowData.account}</Text>
                                            </View>
                                            <View style={styles.projectOC}>
                                                <Text style={styles.projectOther}>角色: {rowData.roleNameInTeam}</Text>
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
                            {isTeamMemberEnded?null:<Button style={{marginLeft:5,marginRight:5,height:32,textAlignVertical:"center",fontSize:12,fontWeight:'100',color:'#FFF',backgroundColor:"#3b50ce"}} 
                             activeOpacity={0.4} onPress={() => {
                                this.loadNextPage('teamMember');
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
        teamMember:state.teamInfo.teamMember,
        teamProject:state.teamInfo.teamProject
    }
}

export default connect(mapStateToProps,{
    getTeamProjectList,getTeamMemberList,
    clearTeamMemberList,clearTeamProjectList,
})(TeamDetail)
