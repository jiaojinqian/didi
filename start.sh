#!/bin/bash

nodeModules="../node_modules"

#在上层创建node_modules目录

#if [ ! -d "$nodeModules" ] ; then
#mkdir "$nodeModules"
#fi

#echo "创建node_modules成功"

#开始安装npm的依赖包
npm install

echo "npm deps 安装完成"

#link android 原生代码

rnpmRes=$( npm ls -g rnpm)

#rnpmRes="alibs"

isEmpty="empty"

if [[ $rnpmRes =~ $isEmpty ]]
then
    echo "rnpm 没有安装"
    npm install -g rnpm
else
    echo "rnpm 已经安装了"
fi

echo "开始link代码"

rnpm link

echo $rnpmRes

#echo "查看rnpmRes $rnpmRes"
 
touch .gitignore

echo -e "/node_modules/*\n!.gitignore\n.*" > .gitignore




