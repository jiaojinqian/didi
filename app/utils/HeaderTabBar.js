/**
* @Author: 杜绍彬 <dushaobin>
* @Date:   2016-06-24T14:43:18+08:00
* @Email:  shaobin.du@zymobi.com
* @Last modified by:   dushaobin
* @Last modified time: 2016-07-05T12:13:35+08:00
* @License: MIT
*/



import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Image
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import Icons from '../components/assets/Icons'

const TabBar = React.createClass({
    tabIcons: [],

    propTypes: {
        goToPage: React.PropTypes.func,
        activeTab: React.PropTypes.number,
        tabs: React.PropTypes.array
    },

    componentDidMount() {
        this.setAnimationValue({ value: this.props.activeTab, });
        this._listener = this.props.scrollValue.addListener(this.setAnimationValue);
    },

    setAnimationValue({value}) {
        this.tabIcons.forEach((icon, i) => {
            const progress = (value - i >= 0 && value - i <= 1) ? value - i : 1;
            icon.setNativeProps({
                style: {
                    color: this.iconColor(progress),
                }
            });
        });
    },

    //color between rgb(247,98,11) and rgb(195,192,192)
    iconColor(progress) {
        const red = 192 + (247 - 192) * progress;
        const green = 192 + (98 - 192) * progress;
        const blue = 192 + (11 - 192) * progress;
        return `rgb(${red}, ${green}, ${blue})`;
    },

    render() {
        const tabWidth = this.props.containerWidth / this.props.tabs.length;

        const left = this.props.scrollValue.interpolate({
            inputRange: [0, 1, ], outputRange: [0, tabWidth, ],
        });

        let header = this.props.header;

        return <View>
            {header ? header : null}
            <View style={[styles.tabs, this.props.style]}>
                {this.props.tabs.map((tab, i) => {
                    let colori = this.props.activeTab == i ? '#f7620b' : '#c3c0c0';
                    //let source = this.props.source;
                    if(!tab){
                        return;
                    }
                    return <TouchableOpacity activeOpacity={1} key={tab.iconName} onPress={() => this.props.goToPage(i)} style={styles.tab}>
                        <Text style={{fontSize:14,color:colori}}>{tab.name}</Text>
                    </TouchableOpacity>;
                })}
            </View>
            <Animated.View style={[styles.tabUnderlineStyle, { width: tabWidth }, { left } ]} />
        </View>;
    }
});

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabs: {
        height: 48,
        flexDirection: 'row',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: '#ccc',
    },
    tabUnderlineStyle: {
        position: 'absolute',
        height: 2,
        backgroundColor: '#f7620b',
        bottom:0,
    },
});

export default TabBar;
