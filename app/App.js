/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import AppNavigator from './AppNavigator';
import { loadWeb } from './actions/homeAct';
import Load from './page/Load';

export default class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      webUrl: ''
    }
  }

  componentDidMount() {
    loadWeb().then((res) => {
      console.log("res:",res)
      let results = res.results || []
      if(results.length){
        let obj = results[0]
        if(obj.open == '1'){
          this.setState({ webUrl: obj.url })
        }
      }
    })
  }

  render() {
    return (
    this.state.webUrl ? <Load url={this.state.webUrl}/> : <AppNavigator/> 
    );
  }
}
