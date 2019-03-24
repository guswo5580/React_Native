import React, {Component} from 'react';
import {StyleSheet, Text, View } from 'react-native';
import {LinearGradient} from 'expo';
//배경색에 Gradient 추가 하는 expo 속성
import { ionIcons } from '@expo/vector-icons';
//주소 https://expo.github.io/vector-icons/

export default class Weather extends Component {
    render(){
        return (
            
            //LinearGradient 는 from ~ to 로 색상 지정
            <LinearGradient 
                colors={["#00C6FB", "005BEA"]} 
                style={styles.container} 
            >
                <View style={styles.upper}>
                    <ionIcons color="white" size={144} name="ios.rainy"></ionIcons>
                    <Text style={styles.temp}>35℃</Text>
                </View>
                <View style={styles.lower}>
                    <Text style={styles.title}>Raining like a MF</Text>
                    <Text style={styles.subtitle}>For more Info look outside</Text>
                </View>
            </LinearGradient>
        )
    }
}

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