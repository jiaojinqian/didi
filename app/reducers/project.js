/**
* @Author: 杜绍彬 <dushaobin>
* @Date:   2016-01-27:02-44-06
* @Email:  shaobin.du@zymobi.com
* @Project: Rope
* @Last modified by:   dushaobin
* @Last modified time: 2016-11-09T22:31:03+08:00
*/



import { combineReducers } from 'redux';
import { 
    BEFORE_PROJECT_LIST,PROJECT_SUCCESS,PROJECT_FAILED
} from '../actions/project';

function project(state = {list:[]}, action) {
    switch (action.type) {
        case PROJECT_SUCCESS:
            return {
                ...state,
                list:[
                    ...state.list,
                    ...action.res.list
                ],
                pageNo:action.res.pageNo,
                pageSize:action.res.pageSize,
                pageTotal:action.res.pageTotal,
                total:action.res.total,
                status:PROJECT_SUCCESS
            };
        case BEFORE_PROJECT_LIST:
            return {
                ...state,
                status:BEFORE_PROJECT_LIST
            }
        case PROJECT_FAILED:
            return {
                ...state,
                status:PROJECT_FAILED
            }
        default:
            return state;
    }
}



function byId(state = [], action) {
    switch (action.type) {
        case RECEIVE_PRODUCTS:
            return action.products.map(product => product.id);
        default:
            return state;
    }
}

function detailStatus(state = {}, action){
  switch (action.type) {
    case TOGGLE_DETAIL_SHOW:
      return {
        status:1,
        productId:action.productId
      };
    case TOGGLE_DETAIL_HIDE:
      return {
        status:0
      };
    default:
      return state;
  }
}

export function page(){
}

export default combineReducers({
    project
});

export function getProduct(state, id) {
    return state.byId[id];
}

export function getProductDetail(state, id){
  return state.byId[id] && state.byId[id].detail;
}

export function getVisibleProducts(state) {
    return state.visibleIds.map(id => getProduct(state, id));
}
