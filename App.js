import React from 'react';
import { StyleSheet, Text, View,
        StatusBar, TextInput, Dimensions, Platform, 
        ScrollView , AsyncStorage} from 'react-native';

import Todo from './Todo';

import { AppLoading } from "expo";
//expo 에서 제공하는 로딩 화면 이용 // app.json에서 변경 가능
import uuidv1 from 'uuid/v1';
//임의의 id값을 생성할 수 있는 모듈


const { height , width } = Dimensions.get("window");
//기기에 맞는 width , height 값을 가져오는 역할

export default class App extends React.Component {
  state = {
    loadedTodos : false,
    //데이터 로딩 완료 여부 확인 
    NewTodo : "",
    //input을 통해 입력하는 내용
    toDos : {}
    //저장한 목록들
  };  

  //데이터를 가져오는 것을 완료할 때를 구분하기 위해 DidMount cycle을 이용
  componentDidMount = () => {
    this._loadTodos();
  };

  render() {
    const {NewTodo, loadedTodos, toDos } = this.state;
    //state는 render 에서 재선언 해줄것
    if(!loadedTodos){
      return <AppLoading/>
    }

    return (
      <View style={styles.Container}>
        <StatusBar barStyle="light-content"/>
        {/* 스마트폰 화면 에서의 알림바 표시 여부 */}
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
          {/* 텍스트 입력 Native 효과들 */}

        {/* 기본 View는 스크롤이 불가 ScrollView를 이용!! */}
        <ScrollView contentContainerStyle={styles.Todos}>
          {Object.values(toDos).reverse().map(toDo => 
          //String 형식의 mapping은 위와 같은 방법으로 
            <Todo 
              key={toDo.id}
              //prop되는 정보들을 구별하는 것에 id를 부여하여 구별 
              deleteToDo={this._deleteToDo}
              completeToDo={this._completeToDo}
              uncompleteToDo={this._uncompleteToDo}
              updateToDo={this._updateToDo}
              //각 기능에 대한 함수를 전달 
              {...toDo}
              //저장된 목록을 전달 
            /> )}
        </ScrollView>
        </View>
      </View>
    );
  }
  _loadTodos = async () => {
    try {
      const toDos = await AsyncStorage.getItem("toDos");
      const parsedToDos = JSON.parse(toDos);
      this.setState({
        loadedTodos : true,
        toDos : parsedToDos
      }); 
      //app이 처음 시작될 때는 정보가 없으므로 null을 반환
    } catch(err) {
      console.error(err);
    }
  };

  _FillText = text => {
    this.setState({
      NewTodo : text
    });
    //Textinput으로 입력하는 값에 따라서 NewTodo의 값 변환 -> Textinput에 표현되는 값 변환 
  };
  
  _addToDo = () => {
    const { NewTodo } = this.state;
    if(NewTodo !== ""){
      this.setState( prevState => {
        //prevState = 이전의 State (NewTodo) 의 내용들을 가리킨다 
        const ID = uuidv1();
        const newToDoObject = {
          //ID를 포함한 Object 생성 - 새로운 input을 받았을 때!!
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
          //Textinput에 있는 값은 다시 빈칸으로 돌리고 
          toDos : {
            // 기존의 state 변수에 새로 만든 정보들과 이전의 정보들을 저장
            ...prevState.toDos,
            ...newToDoObject
          }
        };
        this._saveToDos(newState.toDos);
        return {...newState };
        // 스토리지에 저장하고 바뀐 내용을 반환 
      });
    }else return null;
  };


  _deleteToDo = (id) => {
    this.setState(prevState => {
      const toDos = prevState.toDos;
      //기존의 목록 내용을 불러오기 
      delete toDos[id];
      //id 제거 함수 이용 
      const newState = {
        //새로운 오브젝트로 구성
        ...prevState,
        ...toDos
      };
      //저장하고 새로운 오브젝트를 반환
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
            //id에 해당하는 toDo의 정보를 가져오고 
            //그 안의 isCompleted 속성을 변경
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

  _updateToDo = ( id, text ) => {
    this.setState( prevState => {
      const newState = {
        ...prevState,
        toDos : {
          ...prevState.toDos,
          [id] : {
            ...prevState.toDos[id], 
            text : text
          }
        }
      };
      this._saveToDos(newState.toDos);
      return { ...newState };
    });
  };

  //저장소를 이용하여 저장 ( Object를 그대로 저장 x -> string으로 변환해서 저장 )
  _saveToDos = (newToDos) => {
    const saveToDos = AsyncStorage.setItem("toDos", JSON.stringify(newToDos));
  };
}

//Native 디자인은 flex 디자인을 많이 이용!!!!
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

    // 안드로이드 및 IOS에 따른 설정 변화
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

