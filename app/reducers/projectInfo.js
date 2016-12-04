/**
* @Author: 杜绍彬 <dushaobin>
* @Date:   2016-07-05T17:09:52+08:00
* @Email:  shaobin.du@zymobi.com
* @Last modified by:   dushaobin
* @Last modified time: 2016-07-11T14:47:09+08:00
* @License: MIT
*/

import { combineReducers } from 'redux';

import { 
    BEFORE_APP_LIST,APP_SUCCESS,APP_FAILED,APP_CLEARED,
    BEFORE_PROCESS_LIST,PROCESS_SUCCESS,PROCESS_FAILED,CLEAR_PROCESS_LIST,
    BEFORE_MEMBER_LIST,MEMBER_SUCCESS,MEMBER_FAILED,MEMBER_ENDED,MEMBER_CLEARED,
    BEFORE_MEMBER_DETAIL,MEMBER_DETAIL_SUCCESS,MEMBER_DETAIL_FAILED,MEMBER_DETAIL_CLEARED,
    DID_FOCUS,CLEAR_FOCUS
} from '../actions/projectInfo';

function app(state = {list:[]}, action) {
    switch (action.type) {
        case APP_SUCCESS:
            return {
                ...state,
                list:[
                    ...state.list,
                    ...action.res
                ],
                status:APP_SUCCESS
            };
        case BEFORE_APP_LIST:
            return {
                ...state,
                status:BEFORE_APP_LIST
            }
        case APP_FAILED:
            return {
                ...state,
                status:APP_FAILED
            }
        case APP_CLEARED:
            return {
                ...state,
                status:APP_CLEARED,
                list:[]
            }
            
        default:
            return state;
    }
}


function member(state = {list:[]}, action) {
    switch (action.type) {
        case MEMBER_SUCCESS:
            return {
                ...state,
                list:[
                    ...state.list,
                    ...action.res.list
                ],
                pageNo:action.res.pageNo,
                total:action.res.total,
                isEnd:false,
                status:MEMBER_SUCCESS
            };
        case BEFORE_MEMBER_LIST:
            return {
                ...state,
                status:BEFORE_MEMBER_LIST
            }
        case MEMBER_FAILED:
            return {
                ...state,
                status:MEMBER_FAILED
            }
        case MEMBER_ENDED:
            return {
                ...state,
                status:MEMBER_FAILED,
                isEnd:true
            }
        case MEMBER_CLEARED:
            return {
                ...state,
                status:MEMBER_CLEARED,
                list:[]
            }
        default:
            return state;
    }
}


function processe(state = {list:[]}, action) {
    switch (action.type) {
        case PROCESS_SUCCESS:
            return {
                ...state,
                list:[
                    ...state.list,
                    ...action.res.list
                ],
                status:PROCESS_SUCCESS
            };
        case BEFORE_PROCESS_LIST:
            return {
                ...state,
                status:BEFORE_PROCESS_LIST
            }
        case PROCESS_FAILED:
            return {
                ...state,
                status:PROCESS_FAILED
            }
        case CLEAR_PROCESS_LIST:
            return {
                ...state,
                list:[],
                status:''
            };
        default:
            return state;
    }
}




function page(state = {status:''}, action){
    switch (action.type) {
        case DID_FOCUS:
            return {
                status:DID_FOCUS
            };
        case CLEAR_FOCUS:
            return {
                status:''
            }
        default:
            return state;
    }
}



function memberDetail(state = {info:{role:{}}}, action) {
    switch (action.type) {
        case MEMBER_DETAIL_SUCCESS:
            return {
                ...state,
                info:action.res,
                status:MEMBER_DETAIL_SUCCESS
            };
        case BEFORE_MEMBER_DETAIL:
            return {
                ...state,
                status:BEFORE_MEMBER_DETAIL
            }
        case MEMBER_DETAIL_FAILED:
            return {
                ...state,
                status:MEMBER_DETAIL_FAILED
            }
        case MEMBER_DETAIL_CLEARED:
            return {
                ...state,
                status:MEMBER_DETAIL_CLEARED,
                info:{}
            }
        default:
            return state;
    }
}



export default combineReducers({
    app,
    member,
    processe,
    memberDetail,
    page
});



