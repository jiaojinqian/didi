/**
* @Author: 杜绍彬 <dushaobin>
* @Date:   2016-06-27T13:29:03+08:00
* @Email:  shaobin.du@zymobi.com
* @Last modified by:   dushaobin
* @Last modified time: 2016-11-10T19:00:13+08:00
* @License: MIT
*/

// const config = {
//     host:'http://zymobi.appcan.cn',
//     api:{
//         login:'/coopDevelopment/newCoopLogin',
//         vcode:'/coopDevelopment/getCaptcha',
//         member:'/coopDevelopment/user/memberInfo',
//         projectList:'/coopDevelopment/project/list',
//         appList:'/coopDevelopment/app/list',//分页
//         processList:'/coopDevelopment/process/list',
//         memberList:'/coopDevelopment/project/member',
//         memberDetail:'/coopDevelopment/project/memberInfo',
//         teamList:'/coopDevelopment/team/list',
//         teamProjectList:'/coopDevelopment/team/teamProjectList',
//         teamMemberList:'/coopDevelopment/team/member',
//         teamMemberInfo:'/coopDevelopment/team/memberInfo',
//         resourceList:'/coopDevelopment/resource/list',
//         user:'/coopDevelopment/user/memberInfo',
//         logout:'/logout'
//     }
// };

const config = {
    host:'http://didizhuanxiu.cn',
    api:{
        phoneCode:'/api/getRegCode.do',//获取手机验证码
        addUser:'/api/addUser.do',//注册新用户
        login:'/api/loginByPassword.do',//登录
        isReged:'/api/cellphoneIsExist.do',//是否注册过
        loginWithPhone:'/api/loginByPhone.do',//使用手机号登录
        storesList:':9080/ddzx-web/shop/nearby.do'
    }
};

export default config;