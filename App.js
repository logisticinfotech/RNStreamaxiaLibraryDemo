import React, { Component } from "react";
import { SafeAreaView, Alert } from "react-native";
import Main from "./Main";

export default class App extends Component {
  onPressStart = () => {
    Alert.alert("Start call");
  };
  onPressStop = () => {
    Alert.alert("Stop call");
  };
  onChangeCamera = () => {
    Alert.alert("Change Camera Call");
  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Main
          streamURL={"rtmp://rtmp.streamaxia.com/streamaxia/VideoStream"}
          onPressStart={this.onPressStart}
          onPressStop={this.onPressStop}
          onChangeCamera={this.onChangeCamera}
        />
      </SafeAreaView>
    );
  }
}
