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
  ScrollView,
  TouchableOpacity
} from 'react-native';

import s,{ maxWidth, mainColor, maxHeight } from '../styles'
import Storage from '../util/Storage'
import EditView from '../compoents/EditView'
import ImagePicker from 'react-native-image-picker';

const NAME = 'NAME' //名字
const PORTRAIT = 'PORTRAIT' //头像


export default class Me extends Component {

  static navigationOptions = {
    title: '我的',
  };

  constructor(props){
    super(props)
    this.state = {
      name: '点击修改昵称'
    }
  }

  componentDidMount() {
      Storage.get(NAME).then((name) => {
        if(!name) return
        this.setState({ name })
      })

      Storage.get(PORTRAIT).then((data) => {
        if(!data) return
        this.setState({ avatarSource:  { uri:data }})
      })
  }

  _pressHeadImg() {
    const options = {
      title: '选择相片',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '相机',
      chooseFromLibraryButtonTitle: '相册',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // const source = { uri: response.uri };
    
        // You can also display the image using data:
        let imageBase64 = 'data:image/jpeg;base64,' + response.data 
        const source = { uri:imageBase64 };
        Storage.update(PORTRAIT, imageBase64)
        this.setState({
          avatarSource: source,
        });
      }
    });
  }
  
  _pressCell(i){
    let routeName, params = {}
    if(i == 0){
      routeName = 'List';
      params = {title: '我的收藏', isFromCollect: true}
    }else if( i == 1){
      routeName = 'Advice'
    }else if (i == 2){
      routeName = 'Contact'
    }else if (i == 3){
      return
    }
    this.props.navigation.navigate(routeName,params)
  }

  render() {
    return (
      <View style={{width:maxWidth, height: maxHeight, backgroundColor: '#f2f2f2'}}>
          <View style={[{height:200, width: maxWidth}, s.center]}>
              <TouchableOpacity onPress={()=>this._pressHeadImg()}>
                <Image style={{height: 80, width: 80, borderRadius: 40, backgroundColor: 'gray'}} source={this.state.avatarSource}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>this.refs.editView.show()}>
                   <Text style={{marginTop: 20, fontSize: 16}}>{this.state.name}</Text>
              </TouchableOpacity>
          </View>
          <View style={{marginTop: 20}}>
            {
              ['我的收藏', '我的建议', '联系我们','版本号：v1.0.1'].map((item,i) => {
                  return(
                    <TouchableOpacity key={i} 
                                      style={[{height: 60, width: maxWidth, backgroundColor: '#fff',marginBottom:1, justifyContent: 'space-between' ,alignItems: 'center'}, s.row]}
                                      onPress={this._pressCell.bind(this,i)}>
                      <Text style={{marginLeft: 20, fontSize: 16}}>{item}</Text>
                      { i != 3 ? <Text style={{marginRight: 20, fontWeight: '600'}}>></Text> :null }
                    </TouchableOpacity>
                  )
              })
            }
          </View>                    
        <EditView
            ref="editView"
            //inputText={this.state.name}
            titleTxt={'修改你的昵称'}
            ensureCallback={name => {
              Storage.update(NAME, name)
              this.setState({ name })
            }}
            />
      </View>
    );
  }
}
