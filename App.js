import React, {Component} from 'react';
import { StyleSheet, Text, View, StatusBar} from 'react-native';
import Weather from './Weather.js';

const API_KEY = "59a89227e3f85a178fbd417ebefa65b2";

export default class App extends Component {
  state = {
    isLoaded : false,
    error : null,
    temperature : null,
    name : null 
  };
  componentDidMount(){
    //현재 디바이스의 위치 정보를 가져오는 구문 
    navigator.geolocation.getCurrentPosition(
      position => {
        this._getWeather(position.coords.latitude , position.coords.longitude)
      },
      error => {
        this.setState({
          error 
        }); 
      }
    )
  };
  _getWeather = (lat , long ) => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${API_KEY}`)
      .then( response => response.json())
      .then( json => {
        this.setState({
          temperature : json.main.temp,
          name : json.weather[0].main,
          isLoaded : true
        });
      })
      .catch( error => console.log(error));
  };
  render() {
    const { isLoaded, error, temperature, name } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar hidden={true}/>
        { isLoaded ? <Weather weatherName={name} temp={Math.ceil(temperature)-273.15}/> : 
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
