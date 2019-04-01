import React from 'react';
import { StyleSheet, Text, View,
        StatusBar, TextInput, Dimensions, Platform, 
        ScrollView } from 'react-native';
// import styled from 'styled-components';
import Todo from './Todo';

const { height , width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    NewTodo : ""
  };  
  render() {
    const {NewTodo} = this.state;
    return (
      <View style={styles.Container}>
        <StatusBar barStyle="light-content"/>
        <Text style={styles.Title}>Native TODO</Text>
        <View style={styles.Card}>
          <TextInput 
          style={styles.Input} 
          placeholder={"New ToDo"} 
          value={Text}
          onChangeText={this._FillText}
          placeholderTextColor={"#999"}
          returnKeyType={"done"}
          autoCorrect={false}/>

        <ScrollView contentContainerStyle={styles.Todos}>
          <Todo/>
        </ScrollView>
        </View>
      </View>
    );
  }
  _FillText = text => {
    this.setState({
      NewTodo : text
    });
  };
}

const styles = StyleSheet.create({
  Container : {
    flex : 1,
    backgroundColor : "rgb(234, 58, 90)",
    alignItems : "center"
  },
  Title : {
    color : "white",
    fontSize : 30,
    marginTop : 50,
    fontWeight : "300"
  },
  Card : {
    backgroundColor : "white",
    marginTop : 20,
    flex :1,
    width : width-25,
    borderTopLeftRadius : 10,
    borderTopRightRadius : 10,
    ...Platform.select({
      android : {
        elevation : 5
      }
    })
  },
  Input : {
    padding : 20,
    borderBottomColor : "#bbb",
    borderBottomWidth : StyleSheet.hairlineWidth,
    fontSize : 25
  },
  Todos : {
    alignItems : "center"
  }
});

