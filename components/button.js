import { StatusBar } from 'expo-status-bar';
import React, { Component   } from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default class Buttons extends React.Component{
  render(){
    const {value , handleOnPress } = this.props;
    return (
          <TouchableOpacity
           style = {styles.container}
           onPress = {()=> handleOnPress(value)}
           >
            <Text style = {styles.text}>{value}</Text>
          </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    margin : 1,
    backgroundColor : 'skyblue',
    justifyContent : 'center',
    alignItems : 'center',
    borderRadius : 50,
    margin : 5
  },
  text : {
      fontSize : 30,
      color : 'black',
  }
});
