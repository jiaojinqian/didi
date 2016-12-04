/**
* @Author: 杜绍彬 <dushaobin>
* @Date:   2016-02-19T09:37:54+08:00
* @Email:  shaobin.du@zymobi.com
* @Last modified by:   dushaobin
* @Last modified time: 2016-10-17T16:37:13+08:00
* @License: MIT
*/

import { combineReducers } from 'redux';

import {
    BEFORE_LOGIN,LOGIN_SUCCESS,LOGIN_FAILED,
    BEFORE_GET_VCODE,VCODE_FAILED,VCODE_SUCCESS,
    BEFORE_USER_INFO,USER_INFO_SUCCESS,USER_INFO_FAILED,AUTO_LOGIN_SUCCESS,
    BEFORE_PUSH_CODE,PUSH_CODE_FAILED,PUSH_CODE_SUCCESS,
    BEFORE_USER_ADD,USER_ADD_SUCCESS,USER_ADD_FAILED,
    BEFORE_UPLOAD_PHOTO,UPLOAD_PHOTO_FAILED,UPLOAD_PHOTO_SUCCESS
} from '../actions/user';


const initialState = {
    state:'',
    info: {}
};

export function user(state = initialState, action) {
    switch (action.type) {
        case BEFORE_LOGIN:
            return {
                ...state,
                state : BEFORE_LOGIN
            };
        case LOGIN_FAILED:
            return {
                ...state,
                state:LOGIN_FAILED,
                info:action.res
            };
        case LOGIN_SUCCESS:
            return {
                state:LOGIN_SUCCESS,
                info:action.res
            }
        case AUTO_LOGIN_SUCCESS:
            return {
                state:LOGIN_SUCCESS,
                info:action.res
            }
        case BEFORE_USER_ADD:
            return {
                ...state,
                state : BEFORE_USER_ADD
            };
        case USER_ADD_SUCCESS:
            return {
                ...state,
                state:USER_ADD_SUCCESS,
                info:action.res
            };
        case USER_ADD_FAILED:
            return {
                state:USER_ADD_FAILED,
                info:action.res
            }
        case BEFORE_UPLOAD_PHOTO:
            return {
                ...state,
                state : BEFORE_UPLOAD_PHOTO
            };
        case UPLOAD_PHOTO_SUCCESS:
            return {
                ...state,
                state:UPLOAD_PHOTO_SUCCESS,
                info:action.res
            };
        case UPLOAD_PHOTO_FAILED:
            return {
                state:UPLOAD_PHOTO_FAILED,
                info:action.res
            }
        default:
            return state;
    }
}

let defSta = {state:'',info:{}};

export function vcode(state = defSta, action) {
    switch (action.type) {
        case BEFORE_GET_VCODE:
            return {
                ...state,
                state:BEFORE_GET_VCODE
            };
        case VCODE_FAILED:
            return {
                ...state,
                state:VCODE_FAILED,
                info:action.res
            };
        case VCODE_SUCCESS:
            return {
                state:VCODE_SUCCESS,
                info:action.res
            }
        default:
            return state;
    }
}


export function userInfo(state = {info:{}}, action) {
    switch (action.type) {
        case BEFORE_USER_INFO:
            return {
                ...state,
                status : BEFORE_USER_INFO
            };
        case USER_INFO_FAILED:
            return {
                ...state,
                status:USER_INFO_FAILED
            };
        case USER_INFO_SUCCESS:
            return {
                ...state,
                status:USER_INFO_SUCCESS,
                info:action.res
            }
        default:
            return state;
    }
}

export function phone(state = {info:{}}, action){
    switch (action.type) {
        case BEFORE_PUSH_CODE:
            return {
                ...state,
                status : BEFORE_PUSH_CODE
            };
        case PUSH_CODE_FAILED:
            return {
                ...state,
                status:PUSH_CODE_FAILED
            };
        case PUSH_CODE_SUCCESS:
            return {
                ...state,
                status:PUSH_CODE_SUCCESS,
                info:action.res
            }
        default:
            return state;
    }
}



export default combineReducers({
    user,
    userInfo,
    vcode,
    phone
})

