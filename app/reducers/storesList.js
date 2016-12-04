/**
* @Author: 焦丙乾 <jiaobingqian>
* @Date:   2016-11-08:22-37-14
* @Email:  jiaobq123@163.com
* @Project: Rope
* @Last modified by:   dushaobin
* @Last modified time: 2016-11-10T22:20:13+08:00
*/



import { combineReducers } from 'redux';
import { 
    BEFORE_GETSTORES_LIST,GETSTORES_SUCCESS,GETSTORES_FAILED
} from '../actions/storesList';

function storesList(state = {list:[]}, action) {
    switch (action.type) {
        case GETSTORES_SUCCESS:
            return {
                ...state,
                list:[
                    ...state.list,
                    ...action.res.data
                ],
                //pageNo:action.res.pageNo,
                //pageSize:action.res.pageSize,
                //pageTotal:action.res.pageTotal,
                //total:action.res.total,
                status:GETSTORES_SUCCESS
            };
        case BEFORE_GETSTORES_LIST:
            return {
                ...state,
                status:BEFORE_GETSTORES_LIST
            }
        case GETSTORES_FAILED:
            return {
                ...state,
                status:GETSTORES_FAILED
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
    storesList
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
