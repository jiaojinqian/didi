/**
* @Author: dushaobin <rrd>
* @Date:   2016-11-26
* @Email:  dushaobin@we.com
* @Project: wern
* @Last modified by:   rrd
* @Last modified time: 2016-11-26
*/



import React, { Component, PropTypes } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'underscore';

var BACKGROUND_COLOR, BORDER_RADIUS, BORDER_WIDTH, COLOR, MARGIN, SIZE;

class Checkbox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            backgroundColor: '#FFF',
            borderRadius: 0,
            borderWidth: 2,
            checked: false,
            color: '#000',
            margin: 2,
            name: '',
            onChange: null,
            size: 20
        };
    }

    componentDidMount() {
        this.setState(_.extend(this.props.style, _.omit(this.props, 'style')))
    }

    componentWillReceiveProps(nextProps) {
        this.props = nextProps;
        this.setState({ checked: nextProps.checked});
    }

    render() {
        BACKGROUND_COLOR = this.state.backgroundColor;
        BORDER_RADIUS = this.state.borderRadius;
        BORDER_WIDTH = this.state.borderWidth;
        COLOR = this.state.color;
        MARGIN = this.state.margin;
        SIZE = this.state.size;

        return (
            <TouchableHighlight underlayColor='transparent'
                onPress={() => { this._toggleCheck() }}
                style={{backgroundColor: this.state.checked ? BACKGROUND_COLOR : '#ccc' , borderColor: COLOR,
                        borderRadius: BORDER_RADIUS, borderWidth: BORDER_WIDTH,
                        height: SIZE, margin: MARGIN, width: SIZE }}>
                <View style={{flex: 1, alignItems: 'center',justifyContent:'center'}}>
                    {
                    <Icon name='check' size={SIZE - 20} color={ COLOR }/> }
                </View>
            </TouchableHighlight>
        );
    }

    _toggleCheck() {
        var checked = !this.state.checked;
        this.setState({ checked: checked });
        this.props.onChange && this.props.onChange(this.props.name, checked);
    }
}

Checkbox.propTypes = {
    checked: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    size: PropTypes.number,
    style: PropTypes.object,
}

module.exports = Checkbox;
