/**
* @Author: 杜绍彬 <dushaobin>
* @Date:   2016-04-09:10-58-07
* @Email:  shaobin.du@zymobi.com
* @Project: Rope
* @Last modified by:   dushaobin
* @Last modified time: 2016-07-16T14:01:39+08:00
*/

'use strict'

import { combineReducers } from 'redux';

import config from '../conf/conf'


export const BEFORE_RESOURCE_LIST = 'BEFORE_RESOURCE_LIST';
export const RESOURCE_SUCCESS = 'RESOURCE_SUCCESS';
export const RESOURCE_FAILED = 'RESOURCE_FAILED';

function beforeGetList(){
    return {
        type:BEFORE_RESOURCE_LIST
    }
}

function getListSuccess(res){
    return {
        type:RESOURCE_SUCCESS,
        res
    }
}

function getListFailed(res){
    return {
        type:RESOURCE_FAILED,
        res
    }
}


export function getResource(info){
    let api = config.host+config.api.resourceList;
    return (dispatch,getState) => {
        dispatch(beforeGetList());
        let body = new FormData();
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
                res.message.pageTotal = Math.ceil(res.message.total/info.pageSize);
                dispatch(getListSuccess(res.message));
                return;
            }
            dispatch(getListFailed(res))
        }).catch((e)=>{
            dispatch(getListFailed(e))
        })
    }
}

export const BEFORE_CHILD_RESOURCE_LIST = 'BEFORE_CHILD_RESOURCE_LIST';
export const CHILD_RESOURCE_SUCCESS = 'CHILD_RESOURCE_SUCCESS';
export const CHILD_RESOURCE_FAILED = 'CHILD_RESOURCE_FAILED';
export const CHILD_RESOURCE_CLEARED = 'CHILD_RESOURCE_CLEARED';

function beforeChildGetList(){
    return {
        type:BEFORE_CHILD_RESOURCE_LIST
    }
}

function getChildSuccess(res){
    return {
        type:CHILD_RESOURCE_SUCCESS,
        res
    }
}

function getChildFailed(res){
    return {
        type:CHILD_RESOURCE_FAILED,
        res
    }
}

export function clearChildResource(res){
    return {
        type:CHILD_RESOURCE_CLEARED,
        res
    }
}


export function getChildResource(info){
    let api = config.host+config.api.resourceList;
    return (dispatch,getState) => {
        dispatch(beforeChildGetList());
        let body = new FormData();
        body.append('parentId',info.parentId)
        body.append('pageNo',info.pageNo);
        body.append('pageSize',info.pageSize);
        body.append('projectId',info.projectId);
        
        fetch(api,{
            method:'post',
            body:body,
            credentials: 'same-origin'
        }).then((res)=>{
            if(res.ok){
                return res.json();
            }
        }).then((res)=>{
            if(res.status == 'success'){
                res.message.pageNo = info.pageNo;
                res.message.pageTotal = Math.ceil(res.message.total / info.pageSize);
                dispatch(getChildSuccess(res.message));
                return;
            }
            dispatch(getChildFailed(res))
        }).catch((e)=>{
            dispatch(getChildFailed(e))
        })
        
    }
}


