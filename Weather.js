import React, {Component} from 'react';
import {StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types'
import {LinearGradient} from 'expo';
//배경색에 Gradient 추가 하는 expo 속성
import { MaterialCommunityIcons } from '@expo/vector-icons';
//주소 https://expo.github.io/vector-icons/

const weatherCases = {
    Rain : {
        color : ["#00C6FB", "#005BEA"],
        title : 'Raining like  a MF',
        subtitle : 'For more info look outside',
        icon : 'weather-rainy'
    },
    Clear : {
        color : ["#FEF253", "#FF7300"],
        title : 'Sunny as fuck',
        subtitle : 'Go get your ass burnt',
        icon : 'weather-sunny'
    },
    ThunderStorm : {
        color : ["#00ECBC", "#007ADF"],
        title : 'Thunderstorm in the house',
        subtitle : 'Actually, outside of the house',
        icon : 'weather-lightning'
    },
    Clouds : {
        color : ["#D7D2CC", "#304352"],
        title : 'Clouds',
        subtitle : 'I know, fucking boring',
        icon : 'weather-cloudy'
    },
    Snow : {
        color : ["#7DE2FC", "#B9B6ES"],
        title : 'Cold as balls',
        subtitle : 'Do you want to build a snowman?',
        icon : 'weather-snowy'
    },
    Drizzle : {
        color : ["#89F7FE", "#66A6FF"],
        title : 'Drizzle',
        subtitle : 'Is like rain, but gay',
        icon : 'weather-hail'
    },
    Haze : {
        color : ["#89F7FE", "#66A6FF"],
        title : 'Haze',
        subtitle : 'Is like rain, but gay',
        icon : 'weather-hail'
    },
    Mist : {
        color : ["#89F7FE", "#66A6FF"],
        title : 'Mist',
        subtitle : 'Is like rain, but gay',
        icon : 'weather-fog'
    }

}
function Weather({weatherName , temp}) {
    return (
        //LinearGradient 는 from ~ to 로 색상 지정
        <LinearGradient 
            colors={weatherCases[weatherName].color} 
            style={styles.container} 
        >
            <View style={styles.upper}>
                <MaterialCommunityIcons color="white" size={144} name={weatherCases[weatherName].icon}></ionIcons>
                <Text style={styles.temp}>{temp}℃</Text>
            </View>
            <View style={styles.lower}>
                <Text style={styles.title}>{weatherCases[weatherName].title}</Text>
                <Text style={styles.subtitle}>{weatherCases[weatherName].subtitle}</Text>
            </View>
        </LinearGradient>
    )
}

Weather.PropTypes = {
    temp : PropTypes.number.isRequired,
    weatherName : PropTypes.string.isRequired
};

export default Weather;

const styles = StyleSheet.create({
    container : {
        flex : 1,
    },
    upper : {
        flex : 1,
        alignItems : "center",
        justifyContent : "center",
        backgroundColor : "transparent"
    },
    temp : {
        fontSize : 30,
        backgroundColor : "transparent",
        color : "white",
        marginTop : 12
    }, 
    lower : {
        flex : 1,
        alignItems : "flex-start",
        justifyContent : "flex-end",
        paddingLeft : 25
    },
    title : {
        fontSize : 38,
        backgroundColor : "transparent",
        color : "white",
        marginBottom : 10
    },
    subtitle : {
        fontSize : 25,
        backgroundColor : "transparent",
        color : "white",
        marginBottom : 24
    }
});