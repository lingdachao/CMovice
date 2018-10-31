import React from 'react';
import { maxHeight, maxWidth } from '../styles';
import {
  View,
  TouchableWithoutFeedback,
} from 'react-native';


export default class ToastView extends React.Component {
  render(){
    const { isShow, onPress, style, container, top } = this.props;
    const topHeight = top == null ? 0 : top;
    const height = maxHeight - topHeight;
    return (
      <View style={{ position: 'absolute', top: topHeight, zIndex: 9999 }}>
        {
          isShow ? (
            <TouchableWithoutFeedback onPress={onPress}>
              <View style={[{ height: height, width: maxWidth, backgroundColor: 'rgba(0,0,0,0.5)',
              justifyContent: 'center', alignItems: 'center' }, style]}>
                {container}
              </View>
            </TouchableWithoutFeedback>
          ) : (<View />)
        }
      </View>
    );
  }
}
