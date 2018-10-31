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
  Text, 
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';

import s,{ maxWidth, mainColor } from '../styles'
import { getList } from '../actions/homeAct';
import Storage from '../util/Storage'

export default class List extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', '详情页'),
    };
  };


  constructor(props){
    super(props)
    this.state = {
        dataArr: [],
        showFoot: 0 
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  dealFromCollect() {
    if(this.state.dataArr.length) return
    Storage.get('myLoveList').then((list) => {
      if(!list){
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
      this.setState({ dataArr: tempArr, showFoot: 0})
    })
  }

  fetchData() {
    const isFromCollect = this.props.navigation.getParam('isFromCollect', false)
    if(isFromCollect){
      this.dealFromCollect()
      return
    }
    const url = this.props.navigation.getParam('url')
    let params = `&start=${this.state.dataArr.length + 1}&count=20`
    this.setState({ showFoot: 2 })
    getList(url,params).then((res) => {
      let subjects = res.subjects;
      if(!subjects.length){
        this.setState({showFoot: 1})
        return
      }
      let data = this.state.dataArr;
      this.setState({ 
        dataArr: data.concat(subjects),
        showFoot: 0
       })
    })
  }

  _onEndReached() {
    if(this.state.showFoot != 0 ){
      return ;
    }
    this.fetchData()
  }

  _separator() {
      return (
        <View style={{height: 10}}/>
      )
  }

  _renderFooter(){
    if (this.state.showFoot === 1) {
        return (
            <View style={{height:30,alignItems:'center',justifyContent:'flex-start',}}>
                <Text style={{color:'#999999',fontSize:14,marginTop:5,marginBottom:5,}}>
                    没有更多数据了
                </Text>
            </View>
        );
    } else if(this.state.showFoot === 2) {
        return (
            <View style={[{height:40, marginBottom:10,},s.center, s.row]}>
                <ActivityIndicator />
                <Text style={{marginLeft: 10}}>正在加载更多数据...</Text>
            </View>
        );
    }else{
      return null
    }
}

  _renderItemView(obj) {
    let item = obj.item;
    if(item.subject)
      item = item.subject
    const { id, title, genres, rating = {} ,images = {}, directors = [], casts = [] } = item || {}
    let directorsStr = '导演: ';
    directors.map((item) => {
        directorsStr += `${item.name} `
    })
    let castsStr = '主演: ';
    casts.map((item) => {
        castsStr += `${item.name} `
    })
    return(
      <TouchableOpacity key={obj.index} 
                        style={[{height: 140, backgroundColor: '#fff'},s.row]}
                        onPress={() => {
                          this.props.navigation.navigate('Detail',{id})
                        }}>
          <View style={[s.flex3,s.center]}>
              <Image style={{height:110, width: 74}} source={{uri: images.small}}/>
          </View>
          <View style={[s.flex8,{padding: 10}]}>
              <Text style={{fontWeight: '600', fontSize: 20, marginTop: 8}}>{title}</Text>
              <Text style={{fontSize: 14, marginTop: 8}}>{`豆瓣评分: ${rating.average == 0 ? '暂无' : rating.average}`}</Text>
              <Text numberOfLines={1} style={{marginTop: 12, color: '#333333', fontSize: 13}}>{directorsStr}</Text>
              <Text numberOfLines={1} style={{marginTop: 6, color: '#333333', fontSize: 13}}>{castsStr}</Text>
          </View>
      </TouchableOpacity>
    )
  }
    
  render() {
    // console.log(this.props.navigation.state.params);
    
    return (
      <View style={styles.container}>
        <FlatList
                style={{marginTop: 10}}
                data={this.state.dataArr}
                renderItem={this._renderItemView.bind(this)}
                ListFooterComponent={this._renderFooter.bind(this)}
                onEndReached={this._onEndReached.bind(this)}
                onEndReachedThreshold={0.7}
                ItemSeparatorComponent={this._separator}
                keyExtractor={(item, index) => item.id}
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
