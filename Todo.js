// https://docs.expo.io/versions/v32.0.0/distribution/uploading-apps/ 배포 방법
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet,
        Dimensions, TextInput } from 'react-native';
import PropTypes from 'prop-types';

const { width , height } = Dimensions.get("window");

export default class Todo extends React.Component{
    // Todo.js 에서 state로 설정할 요소와 props로 설정할 요소에 대한 constructor 표현
    constructor(props) {
        super(props);
        this.state = {
            isEditing : false,
            todoValue : ""
        }
    }
    //props 정보에 대한 정의
    static PropTypes = {
        text : PropTypes.string.isRequired,
        isCompleted : PropTypes.bool.isRequired,
        deleteToDo : PropTypes.func.isRequired,
        id : PropTypes.string.isRequired,
        uncompleteToDo : PropTypes.func.isRequired,
        completeToDo : PropTypes.func.isRequired,
        updateToDo : PropTypes.func.isRequired
    };
    render(){
        const { isEditing, todoValue } = this.state;
        const { text , id, deleteToDo, isCompleted} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.column}>
                    <TouchableOpacity onPress={this._toggleComplete}>
                        <View style={[
                            styles.circle,
                            isCompleted ? styles.completedCircle : styles.uncompletedCircle
                            ]}/>
                    </TouchableOpacity>
                    {isEditing ? (
                        <TextInput
                            style={[styles.input, styles.text,
                                isCompleted ? styles.completedText  : styles.uncompletedText]} 
                            value={ todoValue }
                            multiline={true}
                            onChangeText={this._controllInput}
                            returnKeyType={"done"}
                            onBlur={this._finishEditing}
                            underlineColorAndroid={"transparent"}
                            />
                    ) : (
                        <Text style={[
                            styles.text,
                            isCompleted ? styles.completedText  : styles.uncompletedText
                        ]}>{ text }
                        </Text>
                    )}
                </View>
                    {isEditing ? (
                        <View style={styles.actions}>
                            <TouchableOpacity 
                                onPressOut={this._finishEditing}
                                onBlur={this._finishEditing}
                                multiline={true}
                                returnKeyType={"done"}>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>✅</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.actions}>
                            <TouchableOpacity onPressOut={this._startEditing}>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>✏️</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPressOut={() => deleteToDo(id)}>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>❌</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
            </View>
        );
    }
    _toggleComplete = () => {
        const { isCompleted, completeToDo, uncompleteToDo , id } = this.props;
        if(isCompleted) {
            uncompleteToDo(id);
        }else {
            completeToDo(id);
        }
    };
    _startEditing = () => {
        this.setState({
            isEditing : true,
        });
    };
    _finishEditing = () => {
        const { todoValue } = this.state;
        const { id, updateToDo } = this.props;
        updateToDo(id, todoValue);
        this.setState({
            isEditing : false
        });
    };
    _controllInput = (text) => {
        this.setState({
            todoValue : text
        });
    };
}

const styles = StyleSheet.create({
    container : {
        width : width -50,
        borderBottomColor : "#bbb",
        borderBottomWidth : StyleSheet.hairlineWidth,
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "space-between"
    },
    text : {
        fontWeight : "600",
        fontSize : 20,
        marginVertical : 20,
        
    },
    ////////////////////////////////////////////////////////
    circle : {
        width : 30,
        height : 30,
        borderRadius : 15,
        borderColor : "red",
        borderWidth : 3,
        marginRight : 20
    },
    completedCircle : {
        borderColor : "#bbb"
    },
    uncompletedCircle : {
        borderColor : "#F23657"
    },
    ////////////////////////////////////////////////////////
    completedText : {
        color : "#bbb",
        textDecorationLine : "line-through"
    },
    uncompletedText : {
        color : "#353839",
    },
    ////////////////////////////////////////////////////////
    column : {
        flexDirection : "row",
        alignItems : "center",
        width : width / 2,
    },
    actions : {
        flexDirection : "row"
    },
    actionContainer : {
        marginVertical : 10,
        marginHorizontal : 10
    },
    input : {
        marginVertical : 15,
        width : width  / 2
    }
    ////////////////////////////////////////////////////////
})