/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component,Button} from 'react';
import {
  StyleSheet, 
  View,
  Alert
} from 'react-native';

import Storage from '../util/Storage'
import FlatListCompoents from '../compoents/FlatListCompoents'

export default class List extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', '详情页'),
    };
  };


  constructor(props){
    super(props)
    this.state = {
        dataArr: undefined,
    }
  }

  componentDidMount() {
    const isFromCollect = this.props.navigation.getParam('isFromCollect', false)
    if(!isFromCollect){
      return
    }

    Storage.get('myLoveList').then((list) => {
      console.log("list:",list)
      if(!list.length){
          Alert.alert(
            '提示',
            '您还没有收藏电影，请在详情页右上角点击爱心收藏', [{
            text: '好的',
            onPress: () => this.props.navigation.goBack()
            }],
        );
        return
      }
      let tempArr = [];
      for(let index in list){
        tempArr.push(list[index])
      }
      this.setState({ dataArr: tempArr })
    })
  }
    
  render() {
    const url = this.props.navigation.getParam('url')
    return (
      <View style={styles.container}>
        <FlatListCompoents
            url={url}
            dataArr={this.state.dataArr}  
            navigation={this.props.navigation}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
});
