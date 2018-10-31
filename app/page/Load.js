/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  WebView
} from 'react-native';
import s,{ maxWidth, maxHeight } from '../styles'
export default class Load extends Component {

  render() {
    return (
        <WebView style={{width: maxWidth, height: maxHeight}}
                 source={{uri:this.props.url}}/>
    );
  }
}
