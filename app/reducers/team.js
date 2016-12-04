/**
* @Author: 杜绍彬 <dushaobin>
* @Date:   2016-01-27:02-44-06
* @Email:  shaobin.du@zymobi.com
* @Project: Rope
* @Last modified by:   dushaobin
* @Last modified time: 2016-07-11T16:54:02+08:00
*/


import { combineReducers } from 'redux';

import { 
    BEFORE_TEAM_LIST,
    TEAM_SUCCESS,
    TEAM_FAILED
} from '../actions/team';

function team(state = {list:[]}, action) {
    switch (action.type) {
        case TEAM_SUCCESS:
            return {
                ...state,
                list:[
                    ...state.list,
                    ...action.res.list
                ],
                total:action.res.total,
                pageTotal:action.res.totalPage,
                pageNo:action.res.curr,
                status:TEAM_SUCCESS
            };
        case BEFORE_TEAM_LIST:
            return {
                ...state,
                status:BEFORE_TEAM_LIST
            }
        case TEAM_FAILED:
            return {
                ...state,
                status:TEAM_FAILED
            }
        default:
            return state;
    }
}


export default combineReducers({
    team
});

