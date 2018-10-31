import {
    PixelRatio,
    Dimensions,
    Platform,
    StyleSheet
  } from 'react-native';

const maxWidth = Dimensions.get('window').width;
const maxHeight = Dimensions.get('window').height;
const mainColor = '#f4511e'

const styles = StyleSheet.create({
    center: {justifyContent: 'center', alignItems: 'center'},
    row: {flexDirection: 'row'}, 
    flex1: {flex: 1},
    flex2: {flex: 2},
    flex3: {flex: 3},
    flex4: {flex: 4},
    flex5: {flex: 5},
    flex6: {flex: 6},
    flex7: {flex: 7},
    flex8: {flex: 8},
    flex9: {flex: 9},
    flex10: {flex: 10},
    flex11: {flex: 1},
})

export {maxWidth, maxHeight, mainColor};
export default styles
