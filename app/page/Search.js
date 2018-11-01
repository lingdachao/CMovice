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
  ScrollView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import s,{ maxWidth, mainColor, maxHeight } from '../styles'
import Storage from '../util/Storage'
import { MOVICE_SEARCH} from '../constants/Urls';

export default class Search extends Component {

  static navigationOptions = {
    title: '搜索'
  };

  constructor(props){
    super(props)
    this.state = {
        searchList: [],
    }
  }

  componentDidMount() {
    Storage.get('search').then((searchList) => {
        this.setState({ searchList: searchList ? searchList.arr : [] })
    })
  }

  search(textInputValue) {
    let searchKey = textInputValue || this.state.textInputValue 
    this.props.navigation.navigate('List',{'url':`${MOVICE_SEARCH}?q=${searchKey}`,title:searchKey})

    Storage.get('search').then((list) => {
        let searchList = list ? list.arr : []

        let index = -1;
        for(let i = 0; i < searchList.length; i++){
            if(searchKey === searchList[i]){
               index = i
            }
        }
        if( index > -1 ){
            searchList.splice(index,1);
        }
        
        searchList.splice(0,0,searchKey);
        if(searchList.length > 10){
            searchList.splice(searchList.length - 1,1);
        }
        this.setState({ searchList })
        Storage.update('search', {'arr':searchList})
    })

  }

  render() {
      console.log("this.state.searchList:",this.state.searchList)
    return (
        <View style={{backgroundColor: '#f2f2f2'}}>
            <View style={[{width: maxWidth, backgroundColor: mainColor, height: 60}, s.center]}>
              <View style={[{height: 44, width: maxWidth * 0.8, backgroundColor: '#fff', borderRadius: 10}, s.row]}>
                  <View style={[s.flex2, s.center]}>
                      <Ionicons name={'ios-search'} size={25} color={mainColor} /> 
                  </View>
                  <TextInput style={s.flex10}
                             clearButtonMode={'while-editing'}
                             placeholder={'请输入要搜索的电影名称'}
                             onChangeText={(text) => this.setState({textInputValue: text})}
                             value={this.state.textInputValue}
                             onSubmitEditing={() => this.search()}
                             />
              </View>
            </View>
            <View style={{marginTop: 10}}>
                <Text style={{marginLeft: 10}}>热门搜索</Text>
                <View style={[s.wrap,s.row,{paddingVertical: 10,marginTop: 5}]}>
                    {
                        ['复仇者联盟3','铁血战士','毒液','昨日清空','宝贝儿','雪怪大冒险','这个杀手不太冷'].map((item,i) => {
                            return(
                                <TouchableOpacity  key={i} onPress={() => this.search(item)}>
                                    <View style={[{borderRadius: 10, backgroundColor: mainColor, marginHorizontal: 10, marginVertical: 5,padding: 5}]}>
                                        <Text style={{textAlign: 'center', color: '#fff'}}>{item}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
            {
                this.state.searchList && this.state.searchList.length ?
                <ScrollView style={{marginTop: 10, width: maxWidth}}>
                    {
                        this.state.searchList.map((item,i) => {
                            return(
                                <TouchableOpacity key={i} onPress={() => this.search(item)}>
                                    <View style={[s.row,{backgroundColor: '#fff', marginBottom: 1,backgroundColor: '#fff', height: 44, justifyContent: 'space-between', alignItems: 'center'}]}>
                                        <Text style={{flex: 11,marginLeft: 10}}>{item}</Text>
                                        <Text style={{flex: 1}}>></Text>
                                    </View>
                                </TouchableOpacity>                                
                            )
                        })
                    }
                </ScrollView>
                : null
            }
        </View>
    );
  }
}
