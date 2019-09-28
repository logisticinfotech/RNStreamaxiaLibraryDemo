import React, { Component } from "react";
import ReactNative, {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  Platform,
  NativeModules,
  findNodeHandle
} from "react-native";
const { VideoComponentManager } = NativeModules;
import { DeviceEventEmitter } from "react-native";
import PropTypes from "prop-types";

import CameraComponet from "./CameraComponent";
import VideoComponent from "./VideoComponent";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChange: false,
      isCameraStart: false,
      isCameraStop: true
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
    DeviceEventEmitter.addListener("handleException", value => {
      this.handleException(value.handleException);
    });

    // For Android
    DeviceEventEmitter.addListener("onRtmpConnected", message => {
      this.onRtmpConnected(message.onRtmpConnected);
    });
    DeviceEventEmitter.addListener("onNetworkWeak", () => {
      this.onNetworkWeak();
    });
    DeviceEventEmitter.addListener("onNetworkResume", () => {
      this.onNetworkResume();
    });
    DeviceEventEmitter.addListener("onRtmpConnecting", connectingMessage => {
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
    DeviceEventEmitter.addListener("onRtmpVideoFpsChanged", value => {
      this.onRtmpVideoFpsChanged(value.onRtmpVideoFpsChanged);
    });
    DeviceEventEmitter.addListener("onRtmpVideoBitrateChanged", value => {
      this.onRtmpVideoBitrateChanged(value.onRtmpVideoBitrateChanged);
    });
    DeviceEventEmitter.addListener("onRtmpAudioBitrateChanged", value => {
      this.onRtmpAudioBitrateChanged(value.onRtmpAudioBitrateChanged);
    });
    DeviceEventEmitter.addListener("onRtmpAuthenticationg", value => {
      this.onRtmpAuthenticationg(value.onRtmpAuthenticationg);
    });
    DeviceEventEmitter.addListener("onRecordPause", () => {
      this.onRecordPause(value);
    });
    DeviceEventEmitter.addListener("onRecordStarted", value => {
      this.onRecordStarted(value.onRecordStarted);
    });
    DeviceEventEmitter.addListener("onRecordFinished", value => {
      this.onRecordFinished(value.onRecordFinished);
    });

    // For iOS
    DeviceEventEmitter.addListener("onRecorderStopped", value => {
      this.onRecorderStopped(value);
    });
    DeviceEventEmitter.addListener("onRecorderRecording", value => {
      this.onRecorderRecording(value);
    });
    DeviceEventEmitter.addListener("onRecorderStarting", value => {
      this.onRecorderStarting(value);
    });
    DeviceEventEmitter.addListener("onRecorderStopping", value => {
      this.onRecorderStopping(value);
    });
    DeviceEventEmitter.addListener("onRecorderGetExtraData", value => {
      this.onRecorderGetExtraData(value);
    });
    DeviceEventEmitter.addListener("onRecorderPutExtraData", value => {
      this.onRecorderPutExtraData(value);
    });
    DeviceEventEmitter.addListener("onRecorderStateChange", value => {
      this.onRecorderStateChange(value);
    });
    DeviceEventEmitter.addListener("InternetConnectionStatus", value => {
      this.internetConnectionStatus(value);
    });
    DeviceEventEmitter.addListener("onRecorderInfo", value => {
      this.onRecorderInfo(value);
    });
    DeviceEventEmitter.addListener("onRecorderWarning", value => {
      this.onRecorderWarning(value);
    });
    DeviceEventEmitter.addListener("onRecorderError", value => {
      this.onRecorderError(value);
    });
  }
  componentDidMount() {}

  changeCamera = () => {
    if (Platform.OS === "ios") {
      NativeModules.VideoComponentManager.changeCamera(
        findNodeHandle(this.liveStream)
      ); /// call native module method
    } else {
      VideoComponent.changeCamera(); /// call native module method
    }
  };

  startCamera = () => {
    if (Platform.OS === "ios") {
      VideoComponentManager.startStream(
        ReactNative.findNodeHandle(this.liveStream)
      ); /// call native module method
    } else {
      VideoComponent.startCamera(); // call native module method
    }
  };

  stopCamera = () => {
    if (Platform.OS === "ios") {
      NativeModules.VideoComponentManager.stopStream(
        ReactNative.findNodeHandle(this.liveStream)
      );
    } else {
      VideoComponent.stopCamera(); /// call native module method
    }
  };

  handleException = value => {
    this.props.handleException(value);
  };

  // For iOS Function

  onRecorderStopped = value => {
    this.props.onRecorderStopped(value);
  };
  onRecorderRecording = value => {
    this.props.onRecorderRecording(value);
  };
  onRecorderStarting = value => {
    this.props.onRecorderStarting(value);
  };
  onRecorderStopping = value => {
    this.props.onRecorderStopping(value);
  };
  onRecorderGetExtraData = value => {
    this.props.onRecorderGetExtraData(value);
  };
  onRecorderPutExtraData = value => {
    this.props.onRecorderPutExtraData(value);
  };
  onRecorderStateChange = value => {
    this.props.onRecorderStateChange(value);
  };
  internetConnectionStatus = value => {
    this.props.internetConnectionStatus(value);
  };
  onRecorderInfo = value => {
    this.props.onRecorderInfo(value);
  };
  onRecorderWarning = value => {
    this.props.onRecorderWarning(value);
  };
  onRecorderError = value => {
    this.props.onRecorderError(value);
  };

  // For Android Function

  onRtmpVideoStreaming = () => {
    this.props.onRtmpVideoStreaming();
  };

  onRtmpConnected = message => {
    this.props.onRtmpConnected(message);
  };

  onNetworkWeak = () => {
    this.props.onNetworkWeak();
  };

  onNetworkResume = () => {
    this.props.onNetworkResume();
  };

  onRtmpConnecting = connectingMessage => {
    this.props.onRtmpConnecting(connectingMessage);
  };

  onRtmpAudioStreaming = () => {
    this.props.onRtmpAudioStreaming();
  };

  onRtmpStopped = () => {
    this.props.onRtmpStopped();
  };
  onRtmpDisconnected = () => {
    this.props.onRtmpDisconnected();
  };
  onRtmpVideoFpsChanged = value => {
    this.props.onRtmpVideoFpsChanged(value);
  };
  onRtmpVideoBitrateChanged = value => {
    this.props.onRtmpVideoBitrateChanged(value);
  };
  onRtmpAudioBitrateChanged = value => {
    this.props.onRtmpAudioBitrateChanged(value);
  };
  onRtmpAuthenticationg = value => {
    this.props.onRtmpAuthenticationg(value);
  };
  onRecordPause = () => {
    this.props.onRecordPause();
  };
  onRecordStarted = value => {
    this.props.onRecordStarted(value);
  };
  onRecordFinished = value => {
    this.props.onRecordFinished(value);
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

  setRef = ref => {
    this.liveStream = ref;
  };

  // setText = event => {
  //   // console.log("NAtive Text : ", event.nativeEvent.nativeObject);
  //   console.log("NAtive Text : ", event);
  // };

  _onChange = event => {
    console.log(event.nativeEvent.nativeObject); // "data sent from native"
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {Platform.OS === "ios" ? (
          <VideoComponent
            ref={this.setRef}
            style={{ flex: 1, backgroundColor: "red" }}
            streamURL={this.props.streamURL}
            onChange={this._onChange}
          />
        ) : (
          <CameraComponet
            style={{ flex: 1 }}
            streamURL={this.props.streamURL}
          />
        )}

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
            <Text style={{ textAlign: "center" }}>Start Stream</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.stopCamera}
            style={{ height: 30, backgroundColor: "white", marginTop: 20 }}
          >
            <Text style={{ textAlign: "center" }}>Stop Stream</Text>
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
  onChange: PropTypes.func,
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
  onRecorderStopped: PropTypes.func,
  onRecorderRecording: PropTypes.func,
  onRecorderStarting: PropTypes.func,
  onRecorderStopping: PropTypes.func,
  onRecorderGetExtraData: PropTypes.func,
  onRecorderPutExtraData: PropTypes.func,
  internetConnectionStatus: PropTypes.func,
  onRecorderInfo: PropTypes.func,
  onRecorderWarning: PropTypes.func,
  onRecorderError: PropTypes.func,
  onRecorderStateChange: PropTypes.func
};
