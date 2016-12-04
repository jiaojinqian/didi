/**
* @Author: 杜绍彬 <dushaobin>
* @Date:   2016-07-05T17:09:52+08:00
* @Email:  shaobin.du@zymobi.com
* @Last modified by:   dushaobin
* @Last modified time: 2016-07-12T16:00:27+08:00
* @License: MIT
*/

import { combineReducers } from 'redux';

import { 
    BEFORE_TEAM_PROJECT_LIST,TEAM_PROJECT_SUCCESS,TEAM_PROJECT_FAILED,TEAM_PROJECT_CLEARED,TEAM_PROJECT_ENDED,
    BEFORE_TEAM_MEMBER_LIST,TEAM_MEMBER_SUCCESS,TEAM_MEMBER_FAILED,TEAM_MEMBER_ENDED,TEAM_MEMBER_CLEARED
    
} from '../actions/teamInfo';


function teamMember(state = {list:[]}, action) {
    switch (action.type) {
        case TEAM_MEMBER_SUCCESS:
            return {
                ...state,
                list:[
                    ...state.list,
                    ...action.res.allUserList
                ],
                pageNo:action.res.pageNo,
                total:action.res.total,
                isEnd:false,
                status:TEAM_MEMBER_SUCCESS
            };
        case BEFORE_TEAM_MEMBER_LIST:
            return {
                ...state,
                status:BEFORE_TEAM_MEMBER_LIST
            }
        case TEAM_MEMBER_FAILED:
            return {
                ...state,
                status:TEAM_MEMBER_FAILED
            }
        case TEAM_MEMBER_ENDED:
            return {
                ...state,
                status:TEAM_MEMBER_ENDED,
                isEnd:true
            }
        case TEAM_MEMBER_CLEARED:
            return {
                ...state,
                status:TEAM_MEMBER_CLEARED,
                list:[]
            }
        default:
            return state;
    }
}

function teamProject(state = {list:[]}, action) {
    switch (action.type) {
        case TEAM_PROJECT_SUCCESS:
            return {
                ...state,
                list:[
                    ...state.list,
                    ...action.res.list
                ],
                teamName:action.res.team.name,
                pageNo:action.res.pageNo,
                total:action.res.total,
                isEnd:false,
                status:TEAM_PROJECT_SUCCESS
            };
        case BEFORE_TEAM_PROJECT_LIST:
            return {
                ...state,
                status:BEFORE_TEAM_PROJECT_LIST
            }
        case TEAM_PROJECT_FAILED:
            return {
                ...state,
                status:TEAM_PROJECT_FAILED
            }
        case TEAM_PROJECT_ENDED:
            return {
                ...state,
                status:TEAM_PROJECT_ENDED,
                isEnd:true
            }
        case TEAM_PROJECT_CLEARED:
            return {
                ...state,
                status:TEAM_PROJECT_CLEARED,
                list:[]
            }
        default:
            return state;
    }
}


export default combineReducers({
    teamMember,
    teamProject
});



