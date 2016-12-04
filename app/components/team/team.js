/**
* @Author: 杜绍彬 <dushaobin>
* @Date:   2016-06-21T15:27:23+08:00
* @Email:  shaobin.du@zymobi.com
* @Last modified by:   dushaobin
* @Last modified time: 2016-07-12T16:09:41+08:00
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
    BEFORE_TEAM_LIST,
    TEAM_SUCCESS,
    TEAM_FAILED,
    getTeamList
} from '../../actions/team'

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


class Team extends Component {
    constructor(...args){
        super(...args);
        this.listDs = new ListView.DataSource({rowHasChanged: (r1, r2) => {
                r1.object.id !== r2.object.id;
            }
        });
        
    }
    
    componentWillUnmount(){
        //this.loadingTimer(true);
    }
    
    updateState(){
        let {team,route,navigator,unlockLoading} = this.props;
        
        switch (team.status) {
            case TEAM_FAILED:
                if(team.res && team.res.message == '未登录'){
                    //navigator.login
                }
                unlockLoading()
                break;
            case TEAM_SUCCESS:
                if(team.list && team.list.length > 0){
                    
                }
                unlockLoading()
                break;
            default:
                
        }
        
    }
    getDataSource(){
        
        let {team,route,navigator} = this.props;
        if(team.list && team.list.length > 0){
            return this.listDs.cloneWithRows(team.list);
        }
        return this.listDs.cloneWithRows([]);
        
    }
    
    loadNextPage(nextProp){
        
        let {scrollStatus,getTeamList,team,lockLoading,unlockLoading} = nextProp;
        
        
        
        if(!scrollStatus.isBottomTrigger && scrollStatus.isScrollBottom && team.status !== BEFORE_TEAM_LIST){
            
            if(team.pageNo < team.pageTotal){
                
                lockLoading();
                
                getTeamList({
                    pageNo:team.pageNo + 1,
                    pageSize:10
                });
                
            }
        }
    }
    
    loadingRes(){
        let {team} = this.props;
        if(team.status == TEAM_SUCCESS && team.pageNo === team.pageTotal){
            return '没有更多数据！'
        }
        if(team.status == TEAM_FAILED){
            return '加载数据失败';
        }
    }
    
    componentDidMount(){
        
        this.props.getTeamList({
            pageNo:1,
            pageSize:10
        });
        
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
        //let total = dataSource.getRowCount();
        
        let {navigator} = this.props;
        
        let loadText = this.loadingRes();
        
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={dataSource}
                    enableEmptySections={true}
                    renderFooter={()=>{
                        return (null);
                    }}
                    renderRow={(rowData) => {
                        return (
                            <Button onPress={()=>{
                                    navigator.push({
                                        id:'teamDetail',
                                        name:'团队详情',
                                        team:rowData.object
                                    });
                                }}>
                                <View style={styles.rowContainer}>
                                    <View style={styles.left}>
                                        <View style={[styles.leftProgress,{backgroundColor:getCategoryColor(parseInt(rowData.object.id%21))}]}>
                                            <Text style={{color:'#fff',fontSize:40}}>
                                                 {rowData.object.name[0].toUpperCase()}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.right}>
                                        <View style={{paddingBottom:5}}>
                                            <Text style={styles.projectName}>
                                                {rowData.object.name}
                                            </Text>
                                        </View>
                                        
                                        <View style={[styles.projectOC,styles.processItem]}>
                                            <Text style={[styles.projectOther,styles.processKey]}>
                                                类型:
                                            </Text>
                                            <Text style={[styles.projectOther,styles.processVal]}>
                                                {rowData.object.type}
                                            </Text>
                                        </View>
                                        
                                        <View style={[styles.projectOC,styles.processItem]}>
                                            <Text style={[styles.projectOther,styles.processKey]}>
                                                成员数量:
                                            </Text>
                                            <Text style={[styles.projectOther,styles.processVal]}>
                                                {rowData.object.memberSum}
                                            </Text>
                                        </View>
                                        
                                        <View style={[styles.projectOC,styles.processItem]}>
                                            <Text style={[styles.projectOther,styles.processKey]}>
                                                项目数量:
                                            </Text>
                                            <Text style={[styles.projectOther,styles.processVal]}>
                                                {rowData.object.projectSum}
                                            </Text>
                                        </View>
                                        
                                        <View style={[styles.projectOC,styles.processItem]}>
                                            <Text style={[styles.projectOther,styles.processKey]}>
                                                创  建  者:
                                            </Text>
                                            <Text style={[styles.projectOther,styles.processVal]}>
                                                {rowData.object.creator}
                                            </Text>
                                        </View>
                                        
                                        <View style={[styles.projectOC,styles.processItem]}>
                                            <Text style={[styles.projectOther,{width:60}]}>
                                                创建时间:
                                            </Text>
                                            <Text style={[styles.projectOther,styles.processVal]}>
                                                {rowData.object.createdAtStr}
                                            </Text>
                                        </View>
                                        
                                        <View style={styles.projectOC}>
                                            <Text style={styles.projectOther}>描述: {rowData.object.detail}</Text>
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
        team:state.team.team
    }
}

export default connect(mapStateToProps,{
    getTeamList
})(Team)

