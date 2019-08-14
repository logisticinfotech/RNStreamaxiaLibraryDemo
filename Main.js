import React, { Component } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
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
	DeviceEventEmitter.addListener("onRtmpConnected", (message) => {
		this.onRtmpConnected(message.onRtmpConnected);
	  });
	DeviceEventEmitter.addListener("onNetworkWeak", () => {
		this.onNetworkWeak();
	});
	DeviceEventEmitter.addListener("onNetworkResume", () => {
		this.onNetworkResume();
	});
	DeviceEventEmitter.addListener("onRtmpConnecting", (connectingMessage) => {
		this.onRtmpConnecting(connectingMessage.onRtmpConnecting);
	});
	DeviceEventEmitter.addListener("onRtmpVideoStreaming", () => {
		this.onRtmpVideoStreaming();
	});
	DeviceEventEmitter.addListener("onRtmpAudioStreaming", () => {
		this.onRtmpAudioStreaming();
	});
	DeviceEventEmitter.addListener("onRtmpStopped", () => {
		this.onRtmpStopped();
	});
	DeviceEventEmitter.addListener("onRtmpDisconnected", () => {
		this.onRtmpDisconnected();
	});
	DeviceEventEmitter.addListener("onRtmpVideoFpsChanged", (value) => {
		this.onRtmpVideoFpsChanged(value.onRtmpVideoFpsChanged);
	});
	DeviceEventEmitter.addListener("onRtmpVideoBitrateChanged", (value) => {
		this.onRtmpVideoBitrateChanged(value.onRtmpVideoBitrateChanged);
	});
	DeviceEventEmitter.addListener("onRtmpAudioBitrateChanged", (value) => {
		this.onRtmpAudioBitrateChanged(value.onRtmpAudioBitrateChanged);
	});
	DeviceEventEmitter.addListener("onRtmpAuthenticationg", (value) => {
		this.onRtmpAuthenticationg(value.onRtmpAuthenticationg);
	});
	DeviceEventEmitter.addListener("onRecordPause", () => {
		this.onRecordPause(value);
	});
	DeviceEventEmitter.addListener("onRecordStarted", (value) => {
		this.onRecordStarted(value.onRecordStarted);
	});
	DeviceEventEmitter.addListener("onRecordFinished", (value) => {
		this.onRecordFinished(value.onRecordFinished);
	});
	DeviceEventEmitter.addListener("handleException", (value) => {
		this.handleException(value.handleException);
	});
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

  onRtmpVideoStreaming = () => {
	  this.props.onRtmpVideoStreaming();
  }

  onRtmpConnected = (message) => {
	  this.props.onRtmpConnected(message);
  }

  onNetworkWeak = () =>{
	  this.props.onNetworkWeak();
  }

  onNetworkResume = () => {
	  this.props.onNetworkResume();
  }

  onRtmpConnecting = (connectingMessage) => {
	this.props.onRtmpConnecting(connectingMessage)
  }

  onRtmpAudioStreaming = () => {
	  this.props.onRtmpAudioStreaming();
  }

  onRtmpStopped = () => {
	 this.props.onRtmpStopped(); 
  }
  onRtmpDisconnected = () => {
	  this.props.onRtmpDisconnected();
  }
  onRtmpVideoFpsChanged = (value) =>{
	  this.props.onRtmpVideoFpsChanged(value);
  }
  onRtmpVideoBitrateChanged = (value) => {
	  this.props.onRtmpVideoBitrateChanged(value);
  }
  onRtmpAudioBitrateChanged = (value) => {
	  this.props.onRtmpAudioBitrateChanged(value);
  }
  onRtmpAuthenticationg = (value) => {
	  this.props.onRtmpAuthenticationg(value);
  }
  onRecordPause = () => {
	  this.props.onRecordPause();
  }
  onRecordStarted = (value) => {
	this.props.onRecordStarted(value);
  }
  onRecordFinished = (value) => {
	  this.props.onRecordFinished(value);
  }
  handleException = (value) => {
	  this.props.handleException(value);
  }
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
  onRtmpConnected: PropTypes.func,
  onNetworkWeak: PropTypes.func,
  onNetworkResume: PropTypes.func,
  onRtmpConnecting: PropTypes.func,
  onRtmpVideoStreaming: PropTypes.func,
  onRtmpAudioStreaming: PropTypes.func,
  onRtmpStopped: PropTypes.func,
  onRtmpDisconnected: PropTypes.func,
  onRtmpVideoBitrateChanged: PropTypes.func,
  onRtmpAudioBitrateChanged: PropTypes.func,
  onRtmpAuthenticationg: PropTypes.func,
  onRecordPause: PropTypes.func,
  onRecordStarted: PropTypes.func,
  onRecordFinished: PropTypes.func,
  handleException: PropTypes.func,
};
