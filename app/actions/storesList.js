/**
* @Author: 焦丙乾 <jiaobingqian>
* @Date:   2016-11-08:21-58-16
* @Email:  jiaobq123@163.com
* @Project: Rope
* @Last modified by:   dushaobin
* @Last modified time: 2016-11-10T23:12:22+08:00
*/

'use strict'

import { combineReducers } from 'redux';

import config from '../conf/conf'


export const BEFORE_GETSTORES_LIST = 'BEFORE_GETSTORES_LIST';
export const GETSTORES_SUCCESS = 'GETSTORES_SUCCESS';
export const GETSTORES_FAILED = 'GETSTORES_FAILED';

function beforeGetList(){
    return {
        type:BEFORE_GETSTORES_LIST
    }
}

function getListSuccess(res){
    return {
        type:GETSTORES_SUCCESS,
        res
    }
}

function getListFailed(res){
    return {
        type:GETSTORES_FAILED,
        res
    }
}


export function getStoresList(sto){
    let api = config.host+config.api.storesList;
    return (dispatch,getState) => {
        dispatch(beforeGetList());
        let body = new FormData();
        body.append('status',sto.status);
        body.append('pageNo',sto.pageNo);
        body.append('pageSize',sto.pageSize);
        
        fetch(api,{
            method:'get',
            //body:body,
            credentials: 'same-origin'
        }).then((res)=>{
            console.log('res1',res)
            if(res.code){
                return res.json()
            }
        }).then((res)=>{
            console.log('res2',res);
            if(res.code == '1'){
                 dispatch(getListSuccess(res.data));
                 return;
            }
            dispatch(getListFailed(res))
            
        }).catch((e)=>{
            console.log('err',e);
            dispatch(getListFailed(e))
        })
    }
}



