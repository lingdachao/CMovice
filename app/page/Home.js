/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet, 
    ImageBackground, 
    Text, 
    View, 
    TouchableOpacity,
    TextInput,
    Image,
    ScrollView,
    Modal
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
import s,{ maxWidth, mainColor, maxHeight } from '../styles'
import _ from 'lodash';
import { getList,loadWeb } from '../actions/homeAct';
import JPushModule from 'jpush-react-native'
import {
  HOT_LIST,
  WILL_LIST,
  RANK_LIST,
  PRAISE_LIST,
  US_LIST,
  NEW_LIST,
  MOVICE_SEARCH
} from '../constants/Urls';

export default class Home extends Component {
  static navigationOptions = {
        title: '首页'
    };
    
  constructor(props){
    super(props)
    this.state = {
      textInputValue: '',
      banner: [],
      hotData: [],
      willData: [],
      rankData: [],
      praiseData: [],
      usData: [],
      newData: [],
      notifyVisible: false,
      webUrl: ''
    }
  }

  componentDidMount() {



    //无需启动，原生已启动
    this.receiveNotificationListener = map => {
      this.alert = map.aps.alert;
      this.setState({
        notifyVisible: true,
      })
    }
    JPushModule.addReceiveNotificationListener(this.receiveNotificationListener)

    //获取正在热映
    getList(HOT_LIST).then((res) => {
      this.setState({hotData: res.subjects})
    })
    //获取正在热映
    getList(WILL_LIST).then((res) => {
      this.setState({willData: res.subjects})
    })
    //获取销量榜
    getList(RANK_LIST).then((res) => {
      this.setState({rankData: res.subjects})
    })
    //获取口碑榜
    getList(PRAISE_LIST).then((res) => {
      this.setState({praiseData: res.subjects})
    })
    //获取北美票房榜
    getList(US_LIST).then((res) => {
      this.setState({usData: res.subjects})
    })
    //获取新片榜
    getList(NEW_LIST).then((res) => {
      this.setState({newData: res.subjects})
    })
    

    this.setState({
      banner: [
        {
          img: require('../imgs/banner_1.jpg'),
          id: "25917789"
        },
        {
          img: require('../imgs/banner_2.jpg'),
          id: "26425063"
        },
        {
          img: require('../imgs/banner_3.jpg'),
          id: "26944582"
        },
      ]
    })
  }

  _pressBanner(id){
    this.props.navigation.navigate('Detail',{id})
  }

  renderHeader(title,url) {
    return(
      <View style={[{height: 50, width: maxWidth, backgroundColor: '#fff', marginTop: 10},s.row]}>
          <View style={[s.flex4]}>
              <Text style={{fontFamily:'FZShaoEr-M11S',fontSize:18,color: mainColor, marginTop:15, marginLeft: 15}}>{title}</Text>
          </View>
          <TouchableOpacity style={[s.flex1]} onPress={()=>{
                this.props.navigation.navigate('List',{
                  title,
                  url
                })

                }}>
                <Image
                    style={{height:35,width:55,marginLeft:5,marginTop:5}}
                    resizeMode='contain'
                    source={require('../imgs/home_btn_more.png')}/>
          </TouchableOpacity> 
      </View>
    )
  }

  renderContent(data = []) {
    let tempData = data.slice(0,9)
    let arr = _.chunk(tempData,3) || []
    return(
      <ScrollView 
          style={{width: maxWidth}}
          pagingEnabled
          horizontal>
          {
            arr.map((items,i) => {
              return(
                <View style={[{width: maxWidth, backgroundColor: '#fff'}, s.row]} key={i}>
                    {
                      items.map((item, j) => {
                         let subject = item.subject
                         if(subject)
                          item = subject
                         return(
                           <View key={j} style={[{width: maxWidth/3, padding:5},s.center]}>
                              <TouchableOpacity onPress={this._pressBanner.bind(this,item.id)}>
                                <Image style={{width: maxWidth/3 - 20, height: (maxWidth/3 - 20)*1.48}}
                                      source={{uri: item.images.small}}/>
                              </TouchableOpacity>
                              <Text style={{marginTop: 3}}>{item.title}</Text>
                           </View>
                         )
                      })
                    }
                </View>
              )
            })
          }
      </ScrollView>
    )
  }

  renderModal() {
    return(
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.notifyVisible}
        onRequestClose={() => {
        }}
      >
        <View style={[{width: maxWidth, height: maxHeight, backgroundColor: 'rgba(0,0,0,0.4)'}, s.center]}>
            <TouchableOpacity style={{width: 300, height: 200,}} onPress={() => {
                this.setState({ notifyVisible: false })
              }}>
                <View style={[{flex: 4, backgroundColor: mainColor,  borderTopLeftRadius: 15, borderTopRightRadius: 15},s.center]}>
                    <Text style={{color: '#fff', fontSize: 20}}>标题</Text>
                </View>
                <View style={[{flex: 8, backgroundColor: '#fff'},s.center]}>
                    <Text>{this.alert}</Text>
                </View>
            </TouchableOpacity>
        </View>
    </Modal>
    )
  }

  renderItem(title,data,url) {
    return(
      <View style={{height: 260}}>
        {this.renderHeader(title,url)}
        {this.renderContent(data)}
      </View>
    )
  }

    
  render() {
    return (
      <View style={styles.container}>
          <View style={[{width: maxWidth, backgroundColor: mainColor, height: 60}, s.center]}>
              <View style={[{height: 44, width: maxWidth * 0.8, backgroundColor: '#fff', borderRadius: 10}, s.row]}>
                  <View style={[s.flex2, s.center]}>
                      <Ionicons name={'ios-search'} size={25} color={mainColor} /> 
                  </View>
                  <TextInput style={s.flex10}
                             clearButtonMode={'while-editing'}
                             placeholder={'复仇者联盟3'}
                             onChangeText={(text) => this.setState({textInputValue: text})}
                             value={this.state.textInputValue}
                             onSubmitEditing={() => {
                              let searchKey = this.state.textInputValue || '复仇者联盟3'
                              this.props.navigation.navigate('List',{'url':`${MOVICE_SEARCH}?q=${searchKey}`,title:searchKey})
                             }}
                             />
              </View>
          </View>
          <ScrollView style={{marginTop: 10}}>
            <View style={{height: 150}}>
              <Swiper
                autoplay
                dotStyle={{backgroundColor: '#E3F0E1'}}
                activeDotStyle={{backgroundColor: mainColor}}
                paginationStyle={{bottom: 5}}
                >
                  {   this.state.banner.map((item, i) => {
                      return (
                        <TouchableOpacity key={i} onPress={this._pressBanner.bind(this,item.id)}>
                            <Image source={item.img} style={{height: 150, width: maxWidth}}/>
                        </TouchableOpacity>
                      )
                  })
                  }
              </Swiper>  
            </View>
            <View style={[{height: 400, backgroundColor: '#fff',marginTop: 10}]}>
                  <View style={[s.row]}>
                    <TouchableOpacity>
                      <ImageBackground style={[{width: maxWidth/3,height: 300},s.center]}
                                    blurRadius={2.2}
                                    source={{uri:'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2538555285.jpg'}}>
                                    <Text style={styles.bannerText}>即将热映</Text>
                      </ImageBackground>
                    </TouchableOpacity>
                    <View>
                      <TouchableOpacity>
                        <ImageBackground style={[{width: maxWidth/3*2,height: 150},s.center]}
                                        blurRadius={2.2}
                                        source={{uri:'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2537399580.jpg'}}>
                                    <Text style={styles.bannerText}>历史排行榜</Text>                                            
                        </ImageBackground>
                      </TouchableOpacity>
                      <View style={[s.row]}>
                        <TouchableOpacity>
                          <ImageBackground style={[{width: maxWidth/3,height: 150},s.center]}
                                          blurRadius={2.2}
                                          source={{uri:'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2528018780.jpg'}}>
                                      <Text style={styles.bannerText}>口碑榜</Text>                                            
                          </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity>
                          <ImageBackground style={[{width: maxWidth/3,height: 150},s.center]}
                                        blurRadius={2.2}
                                        source={{uri:'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2529571873.jpg'}}>
                                    <Text style={styles.bannerText}>新片榜</Text>                                            
                          </ImageBackground>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity>
                    <ImageBackground style={[{width: maxWidth,height: 100},s.center]}
                                          blurRadius={2.2}
                                          source={{uri:"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2537158013.jpg"}}>
                                      <Text style={styles.bannerText}>北美票房榜</Text>                                            
                    </ImageBackground>
                  </TouchableOpacity>
            </View>
            {this.renderItem('正在热映',this.state.hotData,HOT_LIST)}
            {this.renderItem('即将热映',this.state.willData,WILL_LIST)}
            {this.renderItem('历史排行榜',this.state.rankData,RANK_LIST)}
            {this.renderItem('口碑榜',this.state.praiseData,PRAISE_LIST)}
            {this.renderItem('北美票房榜',this.state.usData,US_LIST)}
            {this.renderItem('新片榜',this.state.newData,NEW_LIST)}
            <View style={{height: 100}}/>
            {this.renderModal()}
          </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  bannerText: {
    color: '#fff',
    fontFamily:'FZShaoEr-M11S',
    fontSize: 20,
    textDecorationLine:'underline',
    lineHeight:60
  }
});
