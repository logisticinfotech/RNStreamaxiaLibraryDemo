import React, { Component } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native';
import { DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';

import CameraComponet from "./CameraComponent";
import VideoComponent from "./VideoComponent";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChange: false,
      isCameraStart: false,
      isCameraStop: true,
    };
    DeviceEventEmitter.addListener("onStart", event => {
      this.onStartStream(event);
    });
    DeviceEventEmitter.addListener("onStop", event => {
      this.onStopStream(event);
    });
    DeviceEventEmitter.addListener("ChangeCamera", () => {
      this.onChangeCamera();
    });
  }
  componentDidMount() {}

  changeCamera = () => {
    VideoComponent.changeCamera(); /// call native module method
  };

  startCamera = () => {
    VideoComponent.startCamera(); // call native module method
  };

  stopCamera = () => {
    VideoComponent.stopCamera(); /// call native module method
  };

  onChangeCamera = () => {
    this.props.onChangeCamera();
  };

  onStartStream = event => {
    this.props.onPressStart();
  };

  onStopStream = event => {
    this.props.onPressStop();
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <CameraComponet style={{ flex: 1 }} streamURL={this.props.streamURL} />
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 30,
            right: 10,
            alignSelf: "flex-end"
          }}
          onPress={this.changeCamera}
        >
          <Image
            // source={{
            //   uri:
            //     'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png',
            // }}
            source={require("./Image/changeCamera.png")}
            style={{ width: 50, height: 50 }}
          />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'column',
            position: 'absolute',
            top: 10,
            left: 10,
          }}
        >
          <TouchableOpacity
            style={{ height: 30, backgroundColor: 'white' }}
            onPress={this.startCamera}
          >
            <Text style={{ textAlign: 'center' }}>Start Stream</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.stopCamera}
            style={{ height: 30, backgroundColor: 'white', marginTop: 20 }}
          >
            <Text style={{ textAlign: 'center' }}>Stop Stream</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

Main.propsTypes = {
  onPressStart: PropTypes.func,
  onPressStop: PropTypes.func,
  onChangeCamera: PropTypes.func,
};
