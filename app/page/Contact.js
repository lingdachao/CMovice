/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform, 
  StyleSheet, 
  Text, 
  View,
  TouchableOpacity,
  TextInput
} from 'react-native';

import s,{ maxWidth, mainColor, maxHeight } from '../styles'

export default class Contact extends Component {

  static navigationOptions = {
    title: '联系我们'
  };

  constructor(props){
    super(props)
    this.state = {
    }
  }


  render() {
    return (
        <View style={{flex:1, backgroundColor: '#f2f2f2'}}>
            <View style={{marginTop: 20, marginLeft: 20}}>
                <Text style={{fontSize: 16}}>QQ: 523455666</Text>
                <Text style={{marginTop: 10, fontSize: 16}}>tel: 020-87275488</Text>
                <Text style={{marginTop: 10, fontSize: 16}}>地址：广州市天河区同和镇云景街道22号</Text>
            </View>
        </View>
    );
  }
}
