/**
* @Author: 杜绍彬 <dushaobin>
* @Date:   2016-04-09:10-58-07
* @Email:  shaobin.du@zymobi.com
* @Project: Rope
* @Last modified by:   dushaobin
* @Last modified time: 2016-07-18T11:34:08+08:00
*/

'use strict'

import { combineReducers } from 'redux';

import config from '../conf/conf'


export const BEFORE_PROJECT_LIST = 'BEFORE_PROJECT_LIST';
export const PROJECT_SUCCESS = 'PROJECT_SUCCESS';
export const PROJECT_FAILED = 'PROJECT_FAILED';

function beforeGetList(){
    return {
        type:BEFORE_PROJECT_LIST
    }
}

function getListSuccess(res){
    return {
        type:PROJECT_SUCCESS,
        res
    }
}

function getListFailed(res){
    return {
        type:PROJECT_FAILED,
        res
    }
}


export function getProject(proj){
    let api = config.host+config.api.projectList;
    return (dispatch,getState) => {
        dispatch(beforeGetList());
        let body = new FormData();
        body.append('status',proj.status);
        body.append('pageNo',proj.pageNo);
        body.append('pageSize',proj.pageSize);
        
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
                 dispatch(getListSuccess(res.message));
                 return;
            }
            dispatch(getListFailed(res))
            
        }).catch((e)=>{
            dispatch(getListFailed(e))
        })
    }
}



