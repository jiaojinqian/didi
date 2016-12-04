/**
* @Author: 杜绍彬 <dushaobin>
* @Date:   2016-04-09:10-58-07
* @Email:  shaobin.du@zymobi.com
* @Project: Rope
* @Last modified by:   dushaobin
* @Last modified time: 2016-07-11T20:10:37+08:00
*/

'use strict'

import { combineReducers } from 'redux';

import config from '../conf/conf'


export const BEFORE_TEAM_LIST = 'BEFORE_TEAM_LIST';
export const TEAM_SUCCESS = 'TEAM_SUCCESS';
export const TEAM_FAILED = 'TEAM_FAILED';

function beforeGetList(){
    return {
        type:BEFORE_TEAM_LIST
    }
}

function getTeamSuccess(res){
    return {
        type:TEAM_SUCCESS,
        res
    }
}

function getTeamFailed(res){
    return {
        type:TEAM_FAILED,
        res
    }
}


export function getTeamList(team){
    let api = config.host+config.api.teamList;
    
    return (dispatch,getState) => {
        dispatch(beforeGetList());
        let body = new FormData();
        
        body.append('pageNo',team.pageNo);
        body.append('pageSize',team.pageSize);
        
        fetch(api,{
            method:'post',
            body:body,
            credentials: 'same-origin'
        }).then((res)=>{
            if(res.ok){
                return res.json()
            }
        }).then((res)=>{
            if(res.status == 'success'){
                res.message.curr = team.pageNo;
                res.message.totalPage = Math.round(res.message.total/team.pageSize);
                dispatch(getTeamSuccess(res.message));
                return;
            }
            dispatch(getTeamFailed(res))
            
        }).catch((e)=>{
            dispatch(getTeamFailed(e))
        })
    }
}



