import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class PageTwo extends Component {
    constructor(...args){
        
        
        super(...args);
    }
    _bind(){
        
    }
    back(){
        Actions.pop();
    }
    render() {
        return (
            <View style={{margin: 128}}>
                <Text onPress={Actions.pageOne}>This is PageOne!</Text>
                <Text onPress={Actions.pageOne}>{this.props.text}</Text>
            </View>
        )
    }
}