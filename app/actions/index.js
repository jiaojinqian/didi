/**
* @Author: 杜绍彬 <dushaobin>
* @Date:   2016-01-27:02-44-06
* @Email:  shaobin.du@zymobi.com
* @Project: Rope
* @Last modified by:   dushaobin
* @Last modified time: 2016-04-15:12-48-43
*/



import shop from '../../common/api/shop';

export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';

function receiveProducts(products) {
    return {
        type: RECEIVE_PRODUCTS,
        products: products
    };
}

export function getAllProducts() {
    return dispatch => {
        shop.getProducts(products => {
            dispatch(receiveProducts(products));
        });
    };
}

export const ADD_TO_CART = 'ADD_TO_CART';
function addToCartUnsafe(productId) {
    return {
        type: ADD_TO_CART,
        productId
    };
}


export const GET_PRODUCT_DETAIL = 'GET_PRODUCT_DETAIL';
export function getProductDetail(productId) {
    return {
        type: GET_PRODUCT_DETAIL,
        productId
    };
}


export function addToCart(productId) {
    return (dispatch, getState) => {
        if (getState().products.byId[productId].inventory > 0) {
            //shop.addToCartFromServer(productId);
            dispatch(addToCartUnsafe(productId));
        }
    };
}

export function viewDetail(productId){
  return (despatch,getState) => {
    if (shop.products.byId[productId]) {
        //shop.addToCartFromServer(productId);
        //shop.getDetailFromServer(PorductId)
        dispatch(getProductDetail(productId));
    }
  };
};

//显示隐藏产品详情
export const TOGGLE_DETAIL_SHOW = 'TOGGLE_DETAIL_SHOW';
export const TOGGLE_DETAIL_HIDE = 'TOGGLE_DETAIL_HIDE';


export function toggleDetail(productId){
  return {
    type:TOGGLE_DETAIL_SHOW,
    productId
  };
}


export function toggleProductDetail(productId){

  console.log('before despatch:',productId);

  return (despatch,getState) => {
    let currState = getState();

    console.log('despatch:',currState);

    if (currState.shop.products.byId[productId]) {
        //shop.addToCartFromServer(productId);
        //shop.getDetailFromServer(PorductId)
        //dispatch(getProductDetail(productId));
        dispatch(toggleDetail(productId));

    }

  };

}


export const CHECKOUT_REQUEST = 'CHECKOUT_REQUEST';
export const CHECKOUT_SUCCESS = 'CHECKOUT_SUCCESS';
export const CHECKOUT_FAILURE = 'CHECKOUT_FAILURE';

export function checkout(products) {
    return (dispatch, getState) => {
        const cart = getState().cart;

        dispatch({ type: CHECKOUT_REQUEST });
        shop.buyProducts(products, () => {
            dispatch({ type: CHECKOUT_SUCCESS, cart });
            // Replace the line above with line below to rollback on failure:
            // dispatch({ type: CHECKOUT_FAILURE, cart });
        });
    };
}
