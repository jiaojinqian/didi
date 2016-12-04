/**
* @Author: 杜绍彬 <dushaobin>
* @Date:   2016-06-30T11:34:40+08:00
* @Email:  shaobin.du@zymobi.com
* @Last modified by:   dushaobin
* @Last modified time: 2016-06-30T11:51:32+08:00
* @License: MIT
*/

import {
    ToastAndroid,
    AsyncStorage
} from 'react-native';

const userInfo = 'userInfo';

export function saveUser(user){
    let userInfo = {
        ...user.info.message,
        outTime:(new Date).getTime()
    }
    return AsyncStorage.setItem(userInfo,JSON.stringify(user.info.message));
}

export function clearUser(){
    return AsyncStorage.removeItem(userInfo);
}

export function checkUserStatus(){
    let now = (new Date()).getTime();
    return getUserInfo().then((info)=>{
        return JSON.parse(info);
    }).then((info) => {
        return info.outTime > (new Date()).getTime() ? true : false;
    })
}

export function getUserInfo(){
    return AsyncStorage.getItem(userInfo);
}

