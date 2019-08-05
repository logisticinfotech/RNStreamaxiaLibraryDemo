import React, { Component } from "react";
import {
  View,
  Text,
  NativeModules,
  TouchableOpacity,
  Alert,
  requireNativeComponent
} from "react-native";

const CameraComponet = requireNativeComponent("VideoView", null);

const { VideoComponent } = NativeModules;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChange: false,
      isCameraStart: false,
      isCameraStop: true
    };
  }
  componentDidMount() {}

  changeCamera = () => {
    VideoComponent.changeCamera();
  };

  startCamera = () => {
    VideoComponent.startCamera();
  };

  stopCamera = () => {
    VideoComponent.stopCamera();
  };

  onStartCamera = event => {
    if (event.nativeEvent.Start_Success) {
      Alert.alert('Start Streaming ');
    } else if (event.nativeEvent.Start_error) {
      Alert.alert('Stop Streaming ');
    } else if (event.nativeEvent.Stop_Success) {
      Alert.alert('Stop Streaming ');
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CameraComponet
          style={{ flex: 1 }}
          //   changeCamara={this.state.isChange}
          //   startCamera={this.state.isCameraStart}
          //   stopCamera={this.state.isCameraStop}
          //   onChange={this.onStartCamera}
        />
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 20,
            width: 150,
            backgroundColor: "white"
          }}
          onPress={this.changeCamera}
        >
          <Text style={{ textAlign: "center" }}>Change Camera</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "column",
            position: "absolute",
            top: 10,
            left: 10
          }}
        >
          <TouchableOpacity
            style={{ height: 30, backgroundColor: "white" }}
            onPress={this.startCamera}
          >
            <Text style={{ textAlign: "center" }}>Start Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.stopCamera}
            style={{ height: 30, backgroundColor: "white", marginTop: 20 }}
          >
            <Text style={{ textAlign: "center" }}>Stop Camera</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
