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
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Modal,
  TouchableHighlight
} from 'react-native';
import { getDetail } from '../actions/homeAct'
import s,{ maxWidth, mainColor, maxHeight } from '../styles'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-easy-toast'
import Storage from '../util/Storage'
import Video from 'react-native-video';

const MYLOVELIST = 'myLoveList'
export default class Detail extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    };
  };


  constructor(props){
    super(props)
    this.state = {
        data: {},
        isLove: false,
        loadding: true,
        imgVisible: false,
        selectImg: null
    }
  }

  componentDidMount() {
    const id = this.props.navigation.getParam('id')
    getDetail(id).then((data) => {
        this.setState({ loadding: false })
        this.setState({ data })
    })

    //查询是否已收藏
    Storage.get(MYLOVELIST).then((list) => {
      if(!list) return
      myLoveList = list
      for(let index in list) {  
        if(index == id  && list[index] != undefined){
          this.setState({ isLove: true })
          break
        }
      }; 
    })
  }

  _pressCollect(){
    const { id, title, genres, rating = {} ,images = {}, directors = [], casts = [] } = this.state.data
    let myLoveList = {};
     //查询是否已收藏
     Storage.get(MYLOVELIST).then((list) => {
      let isExit = false
      if(list){ 
        myLoveList = list
        for(let index in list) {  
          if(`${index}` == `${id}` && list[index] != undefined){
            isExit = true
            break
          }
        }; 
      }

      if(isExit){ //列表已存在，就移除 
        myLoveList[`${id}`] = undefined
      }else{      //列表不存在，就添加
        let newItem = {title, genres, rating, images, directors, casts, id}
        myLoveList[`${id}`] = newItem
      }
      //更新列表
      Storage.update(MYLOVELIST, myLoveList)
    })

    this.refs.toast.show(this.state.isLove ? '取消收藏成功' : '收藏成功', 500, () => {
      // something you want to do at close
    });

    this.setState({
      isLove: !this.state.isLove
    })


  }

  render() {
    const { images = {}, title, wish_count, genres = [], mainland_pubdate, rating ={}, summary, blooper_urls= [],photos = [],casts = [],popular_reviews = [] } = this.state.data
    let genresStr = '';
    genres.map((item) => {
      genresStr += ` ${item} /`
    })
    return (
        <View style={{backgroundColor: '#fff'}}>
          <View styles={{width: maxWidth, height: maxHeight}}>
            <View style={[s.row, {height: 200, backgroundColor: mainColor,justifyContent:'space-between'}]}>
              <TouchableOpacity style={{marginTop: 60, marginLeft: 20}} onPress={() => this.props.navigation.goBack()}>
                  <Ionicons name={'ios-arrow-back'} size={30} color={'#fff'} /> 
              </TouchableOpacity>
              <TouchableOpacity style={{marginTop: 60, marginRight: 20}} onPress={this._pressCollect.bind(this)}>
                {this.state.isLove ? 
                 <Ionicons name={'ios-heart'} size={30} color={'red'} /> :
                 <Ionicons name={'ios-heart-empty'} size={30} color={'#fff'} /> }
              </TouchableOpacity>
            </View>
            <View style={{marginTop: -20,backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
                <View style={[{height: 150, width: maxWidth, marginTop: -60}, s.row]}>
                    <View style={[s.flex4,{alignItems: 'center'}]}>
                      <View style={[s.center,{borderRadius: 5, backgroundColor: '#fff', height: 146, width: 100}]}>
                      <Image style={{height: 140, width: 94}}
                            source={{uri: images.small}}/>
                      </View>
                    </View>
                    <View style={[s.flex8]}>
                        <Text style={{fontWeight: '600', fontSize: 20, color: '#fff', marginTop: 20}}>{title}</Text>
                        <Text style={{marginTop: 30, color: 'rgba(1,1,1,0.5)'}}>{genresStr}</Text>
                        <Text style={{marginTop: 6, color: 'rgba(1,1,1,0.5)'}}>{`上映时间: ${mainland_pubdate}`}</Text>
                        <Text style={{marginTop: 8}}>{`${wish_count}人想看`}</Text>
                        <View style={[{position: 'absolute', right: 30, bottom: 30},s.center]}>
                            <Text style={{color: mainColor, fontSize: 40, fontWeight: '600',fontFamily:'FZShaoEr-M11S'}}>{rating.average}</Text>
                            <Text>豆瓣评分</Text>
                        </View>
                    </View>
                </View>
                <ScrollView style={{width: maxWidth, height: maxHeight - 270, backgroundColor: '#fff'}}>
                  <View style={{marginTop: 20, marginHorizontal: 20}}>
                    <Text style={{fontSize: 26, fontWeight: '600'}}>简介</Text>
                    <View style={{height:1, backgroundColor:'rgba(0,0,0,0.1)',marginTop: 8}}></View>
                    <Text style={{marginTop: 20, lineHeight: 20, }}>{summary}</Text>
                  </View>
                  { blooper_urls.length ? <View style={{marginTop: 30, marginHorizontal: 20}}>
                    <Text style={{fontSize: 26, fontWeight: '600'}}>视频</Text>
                    <View style={{height:1, backgroundColor:'rgba(0,0,0,0.1)',marginTop: 8}}></View>
                    <ScrollView style={[{height: 140}]} horizontal showsHorizontalScrollIndicator={false}>
                      {
                        blooper_urls.map((item,i) => {
                          return(
                            <Video  source={{uri: item}}   
                                    ref={(ref) => {
                                      this.player = ref
                                    }}       
                                    key = {i}
                                    controls={true}
                                    paused={true}                      
                                    style={{marginHorizontal: 10, height: 130, width: 230, marginTop: 10}} />
                          )
                        })
                      }
                    </ScrollView>
                  </View> : null }
                  {
                    photos.length ? <View style={{marginTop: 30, marginHorizontal: 20}}>
                      <Text style={{fontSize: 26, fontWeight: '600'}}>海报</Text>
                      <View style={{height:1, backgroundColor:'rgba(0,0,0,0.1)',marginTop: 8}}></View>
                      <ScrollView style={[{height: 140}]} horizontal showsHorizontalScrollIndicator={false}>
                      {
                        photos.map((item,i) => {
                          return(
                            <TouchableOpacity key = {i}   onPress={() => this.setState({ imgVisible: true, selectImg: {uri: item.image} })}>
                                <Image  source={{uri: item.image}}                  
                                        style={{marginHorizontal: 10, height: 130, width: 230, marginTop: 10}} />
                            </TouchableOpacity>
                          )
                        })
                      }
                      </ScrollView>
                    </View> : null
                  }
                  {
                    casts.length ? <View style={{marginTop: 30, marginHorizontal: 20}}>
                      <Text style={{fontSize: 26, fontWeight: '600'}}>演员</Text>
                      <View style={{height:1, backgroundColor:'rgba(0,0,0,0.1)',marginTop: 8}}></View>
                      <ScrollView style={[{height: 150}]} horizontal showsHorizontalScrollIndicator={false}>
                      {
                        casts.map((item,i) => {
                          return(
                            <TouchableOpacity key = {i}   
                                              style={[s.center,{marginTop: 10}]}
                                              onPress={() => this.setState({ imgVisible: true, selectImg: {uri: item.avatars && item.avatars.small} })}>
                                <Image  source={{uri: item.avatars && item.avatars.small}}                  
                                        style={{marginHorizontal: 6, height: 120, width: 86}} />
                                <Text style={{fontSize: 12,marginTop:3}}>{`${item.name}`}</Text>
                            </TouchableOpacity>
                          )
                        })
                      }
                      </ScrollView>
                    </View> : null
                  }
                  {
                    popular_reviews.length ? <View style={{marginTop: 30, marginHorizontal: 20}}>
                      <Text style={{fontSize: 26, fontWeight: '600'}}>热评</Text>
                      <View style={{height:1, backgroundColor:'rgba(0,0,0,0.1)',marginTop: 8}}></View>
                      {
                        popular_reviews.map((item,i) => {
                          return(
                            <View key={i}>
                                <View style={[s.row,{marginTop: 10}]}>
                                    <Image style={{height: 30, width: 30, borderRadius: 3}}
                                           source={{uri: item.author && item.author.avatar}}/>
                                    <Text style={{marginLeft: 10, marginTop: 6}}>{item.author && item.author.name}</Text>
                                </View>
                                <Text style={{marginTop: 10,marginLeft: 40, lineHeight: 20}}>{item.summary}</Text>
                                <View style={{marginTop: 3,marginLeft: 40, height:1 ,backgroundColor:'rgba(0,0,0,0.1)'}}></View>
                            </View>
                          )
                        })
                      }
                    </View> : null
                  }
                  <View style={{height:100}}></View>
                </ScrollView>
            </View>
          </View>
          <Toast ref="toast"/>
          {this.state.loadding ?  <ActivityIndicator size="large" color={mainColor} style={{position:'absolute',left: maxWidth/2,top:maxHeight/2}}/> : null}
          <Modal
              animationType="fade"
              transparent={true}
              visible={this.state.imgVisible}
              onRequestClose={() => {
              }}
            >
              <TouchableHighlight style={[{width: maxWidth, height: maxHeight, backgroundColor: 'rgba(0,0,0,0.8)'}, s.center]}
                                onPress={() => {
                                        this.setState({ imgVisible: false })
                                      }}>
                   <Image source={this.state.selectImg} 
                          style={{width: maxWidth, height: maxWidth*9/16,backgroundColor:'#fff'}}/>
              </TouchableHighlight>
          </Modal>
        </View>
    );
  }
}
