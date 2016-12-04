/**
* @Author: 杜绍彬 <dushaobin>
* @Date:   2016-04-09:10-58-07
* @Email:  shaobin.du@zymobi.com
* @Project: Rope
* @Last modified by:   dushaobin
* @Last modified time: 2016-07-11T15:26:52+08:00
*/

'use strict'

import { combineReducers } from 'redux';

import config from '../conf/conf'


export const BEFORE_APP_LIST = 'BEFORE_APP_LIST';
export const APP_SUCCESS = 'APP_SUCCESS';
export const APP_FAILED = 'APP_FAILED';
export const APP_CLEARED = 'APP_CLEARED';

function beforeAppList(){
    return {
        type:BEFORE_APP_LIST
    }
}

function getAppSuccess(res){
    return {
        type:APP_SUCCESS,
        res
    }
}

function getAppFailed(res){
    return {
        type:APP_FAILED,
        res
    }
}

export function clearAppList(){
    return {
        type:APP_CLEARED
    }
}


export function getAppList(info){
    let api = config.host+config.api.appList;
    return (dispatch,getState) => {
        dispatch(beforeAppList());
        let body = new FormData();
        body.append('projectId',info.projectId);
        //body.append('pageNo',proj.pageNo);
        //body.append('pageSize',proj.pageSize);
        
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
                dispatch(getAppSuccess(res.message));
                  return;
             }
             dispatch(getAppFailed(res))
             
         }).catch((e)=>{
             dispatch(getAppFailed(e))
        })
    }
}


//获取成员列表

export const BEFORE_MEMBER_LIST = 'BEFORE_MEMBER_LIST';
export const MEMBER_SUCCESS = 'MEMBER_SUCCESS';
export const MEMBER_FAILED = 'MEMBER_FAILED';
export const MEMBER_ENDED = 'MEMBER_ENDED';
export const MEMBER_CLEARED = 'MEMBER_CLEARED';


function beforeMemberList(){
    return {
        type:BEFORE_MEMBER_LIST
    }
}

function getMemberSuccess(res){
    return {
        type:MEMBER_SUCCESS,
        res
    }
}

function getMemberFailed(res){
    return {
        type:MEMBER_FAILED,
        res
    }
}

export function clearMemberList(){
    return {
        type:MEMBER_CLEARED
    }
}

export function memberListEnded(){
    return {
        type:MEMBER_ENDED
    }
}


export function getMemberList(info){
    let api = config.host+config.api.memberList;
    return (dispatch,getState) => {
        dispatch(beforeMemberList());
        let body = new FormData();
        body.append('projectId',info.projectId);
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
                dispatch(getMemberSuccess(res.message));
                return;
            }
            dispatch(getMemberFailed(res))
            
        }).catch((e)=>{
            dispatch(getMemberFailed(e))
        })
    }
}

//获取流程列表

export const BEFORE_PPROCESS_LIST = 'BEFORE_PPROCESS_LIST';
export const PROCESS_SUCCESS = 'PROCESS_SUCCESS';
export const PROCESS_FAILED = 'PROCESS_FAILED';

export const RESET_PROCESS = 'RESET_PROCESS';


function beforeProcessList(){
    return {
        type:BEFORE_PPROCESS_LIST
    }
}

function getProcessSuccess(res){
    return {
        type:PROCESS_SUCCESS,
        res
    }
}

function getProcessFailed(res){
    return {
        type:PROCESS_FAILED,
        res
    }
}

function resetProcessStatus(){
    return {
        type:RESET_PROCESS
    }
}


export function getProcessList(info){
    let api = config.host+config.api.processList;
    return (dispatch,getState) => {
        dispatch(beforeProcessList());
        let body = new FormData();
        body.append('projectId',info.projectId);
        // body.append('pageNo',proj.pageNo);
        // body.append('pageSize',proj.pageSize);
        
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
                 dispatch(getProcessSuccess(res.message));
                 return;
            }
            dispatch(getProcessFailed(res))
            
        }).catch((e)=>{
            dispatch(getProcessFailed(e))
        })
    }
}

export const CLEAR_PROCESS_LIST = 'CLEAR_PROCESS_LIST';
export function clearProcessList(){
    return {
        type:CLEAR_PROCESS_LIST
    }
}


export const DID_FOCUS = 'DID_FOCUS';
export function onDidFocus(){
    return {
        type:DID_FOCUS
    }
}

export const CLEAR_FOCUS = 'CLEAR_FOCUS';
export function clearFocus(){
    return {
        type:CLEAR_FOCUS
    }
}

//获取成员详情

export const BEFORE_MEMBER_DETAIL = 'BEFORE_MEMBER_DETAIL';
export const MEMBER_DETAIL_SUCCESS = 'MEMBER_DETAIL_SUCCESS';
export const MEMBER_DETAIL_FAILED = 'MEMBER_DETAIL_FAILED';
export const MEMBER_DETAIL_CLEARED = 'MEMBER_DETAIL_CLEARED';


function beforeMemberDetail(){
    return {
        type:BEFORE_MEMBER_DETAIL
    }
}

function getMemberDetailSuccess(res){
    return {
        type:MEMBER_DETAIL_SUCCESS,
        res
    }
}

function getMemberDetailFailed(res){
    return {
        type:MEMBER_DETAIL_FAILED,
        res
    }
}

export function clearMemberDetail(){
    return {
        type:MEMBER_DETAIL_CLEARED
    }
}


export function getMemberDetail(info){
    let api = config.host+config.api.memberDetail;
    return (dispatch,getState) => {
        dispatch(beforeMemberDetail());
        let body = new FormData();
        body.append('memberId',info.memberId);
        
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
                dispatch(getMemberDetailSuccess(res.message));
                return;
            }
            dispatch(getMemberDetailFailed(res))
            
        }).catch((e)=>{
            dispatch(getMemberDetailFailed(e))
        })
    }
}
