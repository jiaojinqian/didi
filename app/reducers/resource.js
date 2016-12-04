/**
* @Author: 杜绍彬 <dushaobin>
* @Date:   2016-01-27:02-44-06
* @Email:  shaobin.du@zymobi.com
* @Project: Rope
* @Last modified by:   dushaobin
* @Last modified time: 2016-07-18T10:37:19+08:00
*/



import { combineReducers } from 'redux';
import { 
    BEFORE_RESOURCE_LIST,RESOURCE_SUCCESS,RESOURCE_FAILED,
    CHILD_RESOURCE_CLEARED,CHILD_RESOURCE_SUCCESS,CHILD_RESOURCE_FAILED,BEFORE_CHILD_RESOURCE_LIST
} from '../actions/resource';

function resource(state = {list:[]}, action) {
    switch (action.type) {
        case RESOURCE_SUCCESS:
            return {
                ...state,
                list:[
                    ...state.list,
                    ...action.res.list
                ],
                parent:{
                    ...action.res.parent
                },
                pageNo:action.res.pageNo,
                pageTotal:action.res.pageTotal,
                total:action.res.total,
                status:RESOURCE_SUCCESS
            };
        case BEFORE_RESOURCE_LIST:
            return {
                ...state,
                status:BEFORE_RESOURCE_LIST
            }
        case RESOURCE_FAILED:
            return {
                ...state,
                status:RESOURCE_FAILED
            }
        default:
            return state;
    }
}



function childResource(state = {list:{}}, action){
    switch (action.type) {
        case CHILD_RESOURCE_SUCCESS:
            return {
                ...state,
                list:{
                    ...state.list,
                    [action.res.parent.parentId]:{
                        list:[
                            ...(state.list[action.res.parent.parentId] ? state.list[action.res.parent.parentId].list : []),
                            ...action.res.list
                        ],
                        pageNo:action.res.pageNo,
                        pageTotal:action.res.pageTotal,
                        total:action.res.total
                    }
                },
                curr:{
                    ...action.res
                },             
                status:CHILD_RESOURCE_SUCCESS
            };
        case BEFORE_CHILD_RESOURCE_LIST:
            return {
                ...state,
                status:BEFORE_CHILD_RESOURCE_LIST
            }
        case CHILD_RESOURCE_FAILED:
            return {
                ...state,
                status:CHILD_RESOURCE_FAILED
            }
        case CHILD_RESOURCE_CLEARED:
            return {
                ...state,
                list:{
                    ...state.list,
                    [action.res.parentId]:{
                        list:[]
                    }
                },
                status:CHILD_RESOURCE_CLEARED
            }
        default:
            return state;
    }
}


export default combineReducers({
    resource,
    childResource
});

