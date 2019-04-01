import React from 'react';
import { StyleSheet, Text, View,
        StatusBar, TextInput, Dimensions, Platform, 
        ScrollView , AsyncStorage} from 'react-native';
import Todo from './Todo';
import { AppLoading } from "expo";
import uuidv1 from 'uuid/v1';


const { height , width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    NewTodo : "",
    loadedTodos : false,
    toDos : {}
  };  
  componentDidMount = () => {
    this._loadTodos();
  };

  render() {
    const {NewTodo, loadedTodos, toDos } = this.state;
    if(!loadedTodos){
      return <AppLoading/>
    }
    return (
      <View style={styles.Container}>
        <StatusBar barStyle="light-content"/>
        <Text style={styles.Title}>Native TODO</Text>
        <View style={styles.Card}>
          <TextInput 
          style={styles.input} 
          placeholder={"New ToDo"} 
          value={NewTodo}
          onChangeText={this._FillText}
          placeholderTextColor={"#999"}
          returnKeyType={"done"}
          autoCorrect={false}
          onSubmitEditing={this._addToDo}
          underlineColorAndroid={"transparent"}/>

        <ScrollView contentContainerStyle={styles.Todos}>
          {Object.values(toDos).reverse().map(toDo => 
            <Todo 
              key={toDo.id}
              deleteToDo={this._deleteToDo}
              completeToDo={this._completeToDo}
              uncompleteToDo={this._uncompleteToDo}
              updateToDo={this._updateToDo}
              {...toDo}
            /> )}
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
  _loadTodos = async () => {
    try {
      const toDos = await AsyncStorage.getItem("toDos");
      const parsedToDos = JSON.parse(toDos);
      this.setState({
        loadedTodos : true,
        toDos : parsedToDos || {}
      }); 
      //app이 처음 시작될 때는 정보가 없으므로 null을 반환
    } catch(err) {
      console.error(err);
    }
  };
  _addToDo = () => {
    const {NewTodo} = this.state;
    if(NewTodo !== ""){
      this.setState( prevState => {
        const ID = uuidv1();
        const newToDoObject = {
          [ID] : {
            id : ID,
            isCompleted : false,
            text : NewTodo,
            createdAt : Date.now()
          }
        };
        const newState = {
          ...prevState,
          NewTodo : "",
          toDos : {
            ...prevState.toDos,
            ...newToDoObject
          }
        };
        this._saveToDos(newState.toDos);
        return {...newState };
      });
    }
  };
  _deleteToDo = (id) => {
    this.setState(prevState => {
      const toDos = prevState.toDos;
      delete toDos[id];
      const newState = {
        ...prevState,
        ...toDos
      };
      this._saveToDos(newState.toDos);
      return { ...newState };
    });
  };
  _uncompleteToDo = ( id ) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos : {
          ...prevState.toDos,
          [id] : {
            ...prevState.toDos[id],
            isCompleted : false 
          }
        }
      };
      this._saveToDos(newState.toDos);
      return { ...newState };
    });
  };
  _completeToDo = (id) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos : {
          ...prevState.toDos,
          [id] : {
            ...prevState.toDos[id],
            isCompleted : true 
          }
        }
      };
      this._saveToDos(newState.toDos);
      return { ...newState };
    });
  };
  _updateToDo = (id, text ) => {
    this.setState( prevState => {
      const newState = {
        ...prevState,
        toDos : {
          ...prevState.toDos,
          [id] : {
            ...prevState.toDos[id], text : text
          }
        }
      };
      this._saveToDos(newState.toDos);
      return { ...newState };
    });
  };
  _saveToDos = (newToDos) => {
    const saveToDos = AsyncStorage.setItem("toDos", JSON.stringify(newToDos));
    // console.log(saveToDos);
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
  input : {
    padding : 20,
    borderBottomColor : "#bbb",
    borderBottomWidth : StyleSheet.hairlineWidth,
    fontSize : 25
  },
  Todos : {
    alignItems : "center"
  }
});

