import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput} from 'react-native'
import io from "socket.io-client"

export class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      chatMessage : "",
      chatArray : []
    }
  };

  componentDidMount(){

    this.socket = io("https://e7a5-77-135-189-178.ngrok.io")
    this.socket.on("chat message", msg => {
      console.log("dfssd", this.state.chatArray);
      this.setState({ chatArray: [...this.state.chatArray, msg]});
      console.log("dfssd", this.state.chatArray);
    })
  };

  submitChatMessage(){
      this.socket.emit("chat message", this.state.chatMessage);
      this.setState({chatMessage: ""});
  };

  

  render() {

    const chatMessages = this.state.chatArray.map(chatMessage => 
    <Text key={chatMessage}> {chatMessage} </Text>
    );

    return (
      <View style = {styles.container}>
        <TextInput 
        style = {{ height : 50, borderWidth : 2, position:'absolute', bottom: 0, width: 500}}
        autoCorrect = {false}
        onSubmitEditing = { () => this.submitChatMessage()}
        value = {this.state.chatMessage}
        onChangeText = {chatMessage => {
          this.setState({chatMessage});
        }}  
      />
      {chatMessages}
      </View>
    )
  }
}

// Style 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  }
});

export default App
