import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class PageOne extends Component {
    render() {
        const goPT = ()=>{
            Actions.pageTwo({text:'hello page two'});
        }
        return (
            <View style={{margin: 128}}>
                <Text onPress={goPT}>This is PageOne!</Text>
            </View>
        )
    }
}