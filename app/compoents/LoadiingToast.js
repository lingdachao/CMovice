import React from 'react';
import {
  Image,
} from 'react-native';

import ToastView from './ToastView';

export default class LoadingToast extends React.Component {
  render(){
    return (
      <ToastView
        style={{ backgroundColor: 'transparent' }}
        isShow
        container={<Image
          style={{ height: 20, width: 20, backgroundColor: 'transparent' }}
          source={require('../imgs/gif_loading.gif')}
        />}
      />
  );
  }
}
