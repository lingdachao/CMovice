/**
 * Created by gewd on 2017/5/2.
 */
import React, {Component} from 'react';
import {
    View,
    FlatList,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    Text
} from 'react-native';
import { getList } from '../actions/homeAct'; 
import s,{ maxWidth, mainColor, maxHeight } from '../styles'

export default class FlatListCompoents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataArr: [],
            showFoot: 0
        }
    }

    componentDidMount() {
        if(this.props.url){
            getList(this.props.url).then((res) => {
                this.setState({dataArr: res.subjects})
            })
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

    _separator() {
        return (
          <View style={{height: 10}}/>
        )
    }

    _onEndReached() {
        if(this.state.showFoot != 0 || !this.props.url){
          return ;
        }
        this.fetchData();
    }

    fetchData() {
        const url = this.props.url
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
 
    render() {
        return (
            <FlatList
                style={{width: maxWidth}}
                data={this.props.dataArr || this.state.dataArr}
                renderItem={this._renderItemView.bind(this)}
                ListFooterComponent={this._renderFooter.bind(this)}
                onEndReached={this._onEndReached.bind(this)}
                onEndReachedThreshold={0.7}
                ItemSeparatorComponent={this._separator}
                keyExtractor={(item, index) => item.id}
                ListHeaderComponent={this.props.ListHeaderComponent ? this.props.ListHeaderComponent : null}
            />
        )
    }
}
