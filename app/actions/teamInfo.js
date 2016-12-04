/**
* @Author: 杜绍彬 <dushaobin>
* @Date:   2016-04-09:10-58-07
* @Email:  shaobin.du@zymobi.com
* @Project: Rope
* @Last modified by:   dushaobin
* @Last modified time: 2016-07-12T15:57:18+08:00
*/

'use strict'

import { combineReducers } from 'redux';

import config from '../conf/conf'


export const BEFORE_TEAM_PROJECT_LIST = 'BEFORE_TEAM_PROJECT_LIST';
export const TEAM_PROJECT_SUCCESS = 'TEAM_PROJECT_SUCCESS';
export const TEAM_PROJECT_FAILED = 'TEAM_PROJECT_FAILED';
export const TEAM_PROJECT_CLEARED = 'TEAM_PROJECT_CLEARED';
export const TEAM_PROJECT_ENDED = 'TEAM_PROJECT_ENDED';

function beforeTeamProjectList(){
    return {
        type:BEFORE_TEAM_PROJECT_LIST
    }
}

function getTeamProjectSuccess(res){
    return {
        type:TEAM_PROJECT_SUCCESS,
        res
    }
}

function getTeamProjectFailed(res){
    return {
        type:TEAM_PROJECT_FAILED,
        res
    }
}

export function clearTeamProjectList(){
    return {
        type:TEAM_PROJECT_CLEARED
    }
}

export function teamProjectListEnded(){
    return {
        type:TEAM_PROJECT_ENDED
    }
}

export function getTeamProjectList(info){
    let api = config.host+config.api.teamProjectList;
    return (dispatch,getState) => {
        dispatch(beforeTeamProjectList());
        let body = new FormData();
        body.append('teamId',info.teamId);
        body.append('pageNo',info.pageNo);
        body.append('pageSize',info.pageSize);
        
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
                res.message.pageNo = info.pageNo;
                dispatch(getTeamProjectSuccess(res.message));
                return;
             }
             dispatch(getTeamProjectFailed(res))
             
         }).catch((e)=>{
             dispatch(getTeamProjectFailed(e))
        })
    }
}


//获取成员列表

export const BEFORE_TEAM_MEMBER_LIST = 'BEFORE_TEAM_MEMBER_LIST';
export const TEAM_MEMBER_SUCCESS = 'TEAM_MEMBER_SUCCESS';
export const TEAM_MEMBER_FAILED = 'TEAM_MEMBER_FAILED';
export const TEAM_MEMBER_ENDED = 'TEAM_MEMBER_ENDED';
export const TEAM_MEMBER_CLEARED = 'TEAM_MEMBER_CLEARED';


function beforeTeamMemberList(){
    return {
        type:BEFORE_TEAM_MEMBER_LIST
    }
}

function getTeamMemberSuccess(res){
    return {
        type:TEAM_MEMBER_SUCCESS,
        res
    }
}

function getTeamMemberFailed(res){
    return {
        type:TEAM_MEMBER_FAILED,
        res
    }
}

export function clearTeamMemberList(){
    return {
        type:TEAM_MEMBER_CLEARED
    }
}

export function teamMemberListEnded(){
    return {
        type:TEAM_MEMBER_ENDED
    }
}


export function getTeamMemberList(info){
    let api = config.host+config.api.teamMemberList;
    return (dispatch,getState) => {
        dispatch(beforeTeamMemberList());
        let body = new FormData();
        body.append('teamId',info.teamId);
        body.append('pageNo',info.pageNo);
        body.append('pageSize',info.pageSize);
        
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
                res.message.pageNo = info.pageNo;
                dispatch(getTeamMemberSuccess(res.message));
                return;
            }
            dispatch(getTeamMemberFailed(res))
            
        }).catch((e)=>{
            dispatch(getTeamMemberFailed(e))
        })
    }
}



