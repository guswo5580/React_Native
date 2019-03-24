import React, {Component} from 'react';
import { StyleSheet, Text, View, StatusBar} from 'react-native';
import Weather from './Weather.js';

export default class App extends Component {
  state = {
    isLoaded : false,
    error : null
  };
  componentDidMount(){
    //현재 디바이스의 위치 정보를 가져오는 구문 
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          isLoaded : true
        });
      },
      error => {
        this.setState({
          error 
        }); 
      }
    )
  }
  render() {
    const { isLoaded, error } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar hidden={true}/>
        { isLoaded ? <Weather/> : 
        <View style={styles.loading}>
          <Text style={styles.loadingText}>
            Getting Weather Data...
          </Text>
          <Text>
            { error ? <Text style={styles.errorText}>{error}</Text> : null }
          </Text>
        </View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  loading : {
    flex : 1,
    backgroundColor : "#FDF6AA",
    justifyContent : "flex-end",
    paddingLeft : 25
  },
  loadingText : {
    fontSize : 38,
    marginBottom : 100
  },
  errorText : {
    color : "red",
    marginBottom : 40,
    backgroundColor : "transparent",
  }
});
