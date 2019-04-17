import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import {
    Actions
} from 'react-native-router-flux';

class Home extends React.Component{
    state = {
        name : ''
    };
    render(){
        const { name } = this.state;
        return ( 
            <View>
                <Text>
                    Enter your name : 
                </Text>
                <TextInput
                    placeholder='name..'
                    onChangeText={(text) => {
                        this.setState({
                            name : text
                        });
                    }}>
                </TextInput>
                <TouchableOpacity 
                    onPress={() => {
                        Actions.chat({
                            name : name
                        });
                    }}>
                    <Text>Next</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Home;