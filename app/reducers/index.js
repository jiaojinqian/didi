/**
* @Author: 杜绍彬 <dushaobin>
* @Date:   2016-01-27:02-44-06
* @Email:  shaobin.du@zymobi.com
* @Project: Rope
* @Last modified by:   dushaobin
* @Last modified time: 2016-11-08T22:54:32+08:00
*/



import { combineReducers } from 'redux';

import { default as user } from './user';
import { default as project } from './project';
import { default as projectInfo } from './projectInfo';
import { default as teamInfo } from './teamInfo';
import { default as team } from './team';
import { default as resource } from './resource';
import { default as storesList } from './storesList';

export default combineReducers({
    user,
    project,
    projectInfo,
    team,
    teamInfo,
    resource,
    storesList,
});
