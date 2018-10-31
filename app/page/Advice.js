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
  TextInput,
  Alert
} from 'react-native';

import s,{ maxWidth, mainColor, maxHeight } from '../styles'

export default class Advice extends Component {

  static navigationOptions = {
    title: '我的建议'
  };

  constructor(props){
    super(props)
    this.state = {
        textInputValue: ''
    }
  }


  render() {
    return (
        <View style={{flex:1, backgroundColor: '#f2f2f2'}}>
            <TextInput  style={{marginTop: 20, width: maxWidth-40, marginLeft: 20, height: 200, backgroundColor: '#fff', padding: 20, borderRadius: 10}}
                        clearButtonMode={'while-editing'}
                        autoFocus={true}
                        multiline={true}
                        onChangeText={(text) => this.setState({textInputValue: text})}
                        value={this.state.textInputValue}/>
            <TouchableOpacity style={[{marginLeft: maxWidth - 120, marginTop: 20, width: 100, height: 44, backgroundColor: mainColor, borderRadius: 30},s.center]}
                              onPress={() => {
                                  if(!this.state.textInputValue.length){
                                   return Alert.alert(
                                        '提示',
                                        '内容不可为空', [{
                                        text: '好的',
                                        }],
                                    );
                                  }
                                  return Alert.alert(
                                        '提示',
                                        '感谢您的建议', [{
                                        text: '好的',
                                        onPress: () => this.props.navigation.goBack()
                                        }],
                                    );
                              }}>
                <Text style={{textAlign: 'center', color: '#fff'}}>提交</Text>
            </TouchableOpacity>
        </View>
    );
  }
}
