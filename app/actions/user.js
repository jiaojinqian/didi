/**
* @Author: 杜绍彬 <dushaobin>
* @Date:   2016-06-24T23:38:18+08:00
* @Email:  shaobin.du@zymobi.com
* @Last modified by:   dushaobin
* @Last modified time: 2016-10-17T18:51:55+08:00
* @License: MIT
*/

import config from '../conf/conf'

export const RECEIVE_USER = 'RECEIVE_USER';

function receiveUser(user) {
    return {
        type: RECEIVE_USER,
        user: user
    };
}

export function getUser() {
    return dispatch => {
        // shop.getProducts(products => {
        //     dispatch(receiveProducts(products));
        // });
    };
}


export const BEFORE_LOGIN = 'BEFORE_LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const AUTO_LOGIN_SUCCESS = 'AUTO_LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';


function beforeLogin() {
    return {
        type: BEFORE_LOGIN
    };
}

function loginFailed(res){
    return {
        type:LOGIN_FAILED,
        res
    }
}

export function loginSuccess(res){
    return {
        type:LOGIN_SUCCESS,
        res
    }
}

export function autoLogin(res){
    return {
        type:AUTO_LOGIN_SUCCESS,
        res
    }
}

//使用短信验证码登录
export function login(user) {
    var loginApi = config.host+config.api.loginWithPhone;
    console.log(user)
    return (dispatch,getState) => {
        dispatch(beforeLogin());
        let body = new FormData();
        body.append('cellphone',user.phone);
        body.append('regcode',user.code);
        let header = new Headers();
        //header.append('pragma', 'no-cache');
        //header.append('cache-control', 'no-cache');
        header.set('Content-Type','application/json');
        
        fetch(loginApi,{
            method:'post',
            headers:header,
            body:JSON.stringify({cellphone:user.phone,regcode:user.code}),
            credentials: 'same-origin'
        }).then((res) => {
            if(res.ok){
                return res.json()
            }
        }).then(res => {
            if(res.code != 1){
                 dispatch(loginFailed(res));
                 return;
            }
            dispatch(loginSuccess(res))
        }).catch(function(res){
             dispatch(loginFailed(res));
        })
    }
}

//logout
export function logout(){
    
}



export const BEFORE_GET_VCODE = 'BEFORE_GET_VCODE';
export const VCODE_SUCCESS = 'VCODE_SUCCESS';
export const VCODE_FAILED = 'VCODE_FAILED';

function beforeGetVcode() {
    return {
        type: BEFORE_GET_VCODE
    };
}

function vcodeFailed(res){
    return {
        type:VCODE_FAILED,
        res
    }
}

function vcodeSuccess(res){
    return {
        type:VCODE_SUCCESS,
        res
    }
}

//发送验证码到手机
export const BEFORE_PUSH_CODE = 'BEFORE_PUSH_CODE';
export const PUSH_CODE_SUCCESS = 'PUSH_CODE_SUCCESS';
export const PUSH_CODE_FAILED = 'PUSH_CODE_FAILED';

function beforePushCode() {
    return {
        type: BEFORE_PUSH_CODE
    };
}

function pushCodeFailed(res){
    return {
        type:PUSH_CODE_FAILED,
        res
    }
}

function pushCodeSuccess(res){
    return {
        type:PUSH_CODE_SUCCESS,
        res
    }
}

export function pushPhoneCode(info){
    if(!info || !info.phone){
        throw new Error('phone is must pass');
    }
    let api = config.host+config.api.phoneCode+ '?cellphone=' + info.phone;
    
    return (dispatch,getState) => {
        dispatch(beforePushCode());
        let header = new Headers();
        header.append('pragma', 'no-cache');
        header.append('cache-control', 'no-cache');
        header.append('Content-Type','application/x-www-form-urlencoded');
        fetch(api,{
            headers:header,
            method:'get',
            credentials: 'same-origin'
        }).then((res) => {
            if(res.ok){
                return res.json()
            }
        }).then(res => {
            if(res.code > 0){
                 dispatch(pushCodeSuccess(res));
                 return;
            }
            dispatch(pushCodeFailed(res))
        }).catch(function(res){
             dispatch(pushCodeFailed(res));
        })
    }
}

export function getVcode(){
    let api = config.host+config.api.vcode + '?' + (new Date).getTime();
    return (dispatch,getState) => {
        dispatch(beforeGetVcode());
        let header = new Headers();
        header.append('pragma', 'no-cache');
        header.append('cache-control', 'no-cache');
        header.append('Content-Type','application/x-www-form-urlencoded');
        
        
        fetch(api,{
            headers:header,
            method:'get',
            credentials: 'same-origin'
        }).then((res) => {
            if(res.ok){
                return res.json()
            }
        }).then(res => {
            if(res.src){
                 dispatch(vcodeSuccess(res));
                 return;
            }
            dispatch(vcodeFailed(res))
        }).catch(function(res){
             dispatch(vcodeFailed(res));
        })
    }
}


//获取用户信息

export const BEFORE_USER_INFO = 'BEFORE_USER_INFO';
export const USER_INFO_SUCCESS = 'USER_INFO_SUCCESS';
export const USER_INFO_FAILED = 'USER_INFO_FAILED';

function beforeUserInfo(){
    return {
        type:BEFORE_USER_INFO
    }
}

function getUserInfoSuccess(res){
    return {
        type:USER_INFO_SUCCESS,
        res
    }
}

function getUserInfoFailed(res){
    return {
        type:USER_INFO_FAILED,
        res
    }
}

export function getUserInfo(info){
    
    return (dispatch,getState) => {
        dispatch(beforeUserInfo());
        let body = new FormData();
        body.append('memberId',info.memberId);
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
                dispatch(getUserInfoSuccess(res.message));
                return;
            }
            dispatch(getUserInfoFailed(res))
        }).catch((e)=>{
            dispatch(getUserInfoFailed(e))
        })
    }
}


export const BEFORE_USER_ADD = 'BEFORE_USER_ADD';
export const USER_ADD_SUCCESS = 'USER_ADD_SUCCESS';
export const USER_ADD_FAILED = 'USER_ADD_FAILED';

function beforeUserAdd(){
    return {
        type:BEFORE_USER_ADD
    }
}

function userAddSuccess(res){
    return {
        type:USER_ADD_SUCCESS,
        res
    }
}

function userAddFailed(res){
    return {
        type:USER_ADD_FAILED,
        res
    }
}

//注册新用户

export function addNewUser(user){
    var api = config.host+config.api.addUser;
    return (dispatch,getState) => {
        dispatch(beforeUserAdd());
        let body = new FormData();
        body.append('cellphone',user.phone);
        body.append('regcode',user.code);
        body.append('password',user.password);
        
        let header = new Headers();
        // header.append('pragma', 'no-cache');
        // header.append('cache-control', 'no-cache');
        header.append('Content-Type','application/json');
        
        
        fetch(api,{
            method:'post',
            headers:header,
            body:JSON.stringify({
                cellphone:user.phone,
                regcode:user.code,
                password:user.password}),
            credentials: 'same-origin'
        }).then((res) => {
            if(res.ok){
                return res.json()
            }
        }).then(res => {
            if(res.code != 1){
                 dispatch(userAddFailed(res));
                 return;
            }
            dispatch(userAddSuccess(res))
        }).catch(function(res){
             dispatch(userAddFailed(res));
        })
    }
    
}


export const BEFORE_PHONE_STATUS = 'BEFORE_PHONE_STATUS';
export const PHONE_STATUS_SUCCESS = 'PHONE_STATUS_SUCCESS';
export const PHONE_STATUS_FAILED = 'PHONE_STATUS_FAILED';

function beforePhoneStatus(){
    return {
        type:BEFORE_PHONE_STATUS
    }
}

function phoneStatusSuccess(res){
    return {
        type:PHONE_STATUS_SUCCESS,
        res
    }
}

function phoneStatusFailed(res){
    return {
        type:PHONE_STATUS_FAILED,
        res
    }
}

//手机号是否注册过
export function isPhoneIsExist(info){
    var loginApi = config.host+config.api.cellphoneIsExist;
    return (dispatch,getState) => {
        dispatch(beforePhoneStatus());
        let body = new FormData();
        body.append('cellphone',info.phone);
        fetch(loginApi,{
            method:'post',
            body:body,
            credentials: 'same-origin'
        }).then((res) => {
            if(res.ok){
                return res.json()
            }
        }).then(res => {
            if(res.status == 'failed'){
                 dispatch(phoneStatusFailed(res));
                 return;
            }
            dispatch(phoneStatusSuccess(res))
        }).catch(function(res){
             dispatch(phoneStatusFailed(res));
        })
    }
}


export const BEFORE_UPLOAD_PHOTO = 'BEFORE_UPLOAD_PHOTO';
export const UPLOAD_PHOTO_SUCCESS = 'UPLOAD_PHOTO_SUCCESS';
export const UPLOAD_PHOTO_FAILED = 'UPLOAD_PHOTO_FAILED';

function beforeUploadPhoto(){
    return {
        type:BEFORE_UPLOAD_PHOTO
    }
}

function uploadPhotoSuccess(res){
    return {
        type:UPLOAD_PHOTO_SUCCESS,
        res
    }
}

function uploadPhotoFailed(res){
    return {
        type:UPLOAD_PHOTO_FAILED,
        res
    }
}

//上传数据Demo
export function uploadPhoto(info){
    var uploadUrl = 'https://api.megvii.com/cardpp/v1/ocridcard';
    return (dispatch,getState) => {
        dispatch(beforeUploadPhoto());
        let body = new FormData();
        
        body.append('api_key','CgC_U4zdI5gdGTdLmOFM1LR3qD2fb9GJ');
        body.append('api_secret','zxG8aw4lgNmwIp_DsotqcYng4VVQVc-V');
        
        var name = info.imgSrc.substr(info.imgSrc.lastIndexOf('/')+1);
        
        body.append('image_file',{
            uri: info.imgSrc,
	        type: 'image/jpeg',
            name: name
        });
        
        fetch(uploadUrl,{
            method:'post',
            body:body,
            credentials: 'same-origin'
        }).then((res) => {
            if(res.ok){
                return res.json()
            }
        }).then(res => {
            dispatch(uploadPhotoSuccess(res))
        }).catch(function(res){
             dispatch(uploadPhotoFailed(res));
        })
    }
}


