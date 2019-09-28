import React, { Component } from "react";
import { SafeAreaView, Alert } from "react-native";
import Main from "./Main";
export default class App extends Component {
  onPressStart = () => {
    console.log("Start call");
  };
  onPressStop = () => {
    console.log("Stop call");
  };
  onChangeCamera = () => {
    console.log("Change Camera Call");
  };

  handleException = value => {
    console.log("handleException => ", value);
  };

  // For Android

  onRtmpConnected = message => {
    console.log("onRtmpConnect success => ", message);
  };
  onRtmpConnecting = connectedMessage => {
    console.log("connecting message => ", connectedMessage);
  };
  onNetworkWeak = () => {
    console.log("onNetworkWeak");
  };
  onNetworkResume = () => {
    console.log("onNetworkResume");
  };
  onRtmpVideoStreaming = () => {
    console.log("onRtmpVideoStreaming");
  };
  onRtmpAudioStreaming = () => {
    console.log("onRtmpAudioStreaming");
  };
  onRtmpStopped = () => {
    console.log("onRtmpStopped");
  };
  onRtmpDisconnected = () => {
    console.log("onRtmpDisconnected");
  };
  onRtmpVideoFpsChanged = value => {
    console.log("onRtmpVideoFpsChanged => ", value);
  };
  onRtmpVideoBitrateChanged = value => {
    console.log("onRtmpVideoBitrateChanged => ", value);
  };
  onRtmpAudioBitrateChanged = value => {
    console.log("onRtmpAudioBitrateChanged => ", value);
  };
  onRtmpAuthenticationg = value => {
    console.log("onRtmpAuthenticationg => ", value);
  };
  onRecordPause = () => {
    console.log("onRecordPause => ");
  };
  onRecordStarted = value => {
    console.log("onRecordStarted => ", value);
  };
  onRecordFinished = value => {
    console.log("onRecordFinished => ", value);
  };

  // For IOS

  recorderStopped = value => {
    console.log("recorderStopped => ", value);
  };
  recorderRecording = value => {
    console.log("recorderRecording => ", value);
  };
  recorderStarting = value => {
    console.log("recorderStarting => ", value);
  };
  recorderStopping = value => {
    console.log("recorderStopping => ", value);
  };
  recorderGetExtraData = value => {
    console.log("recorderGetExtraData => ", value);
  };
  recorderPutExtraData = value => {
    console.log("recorderPutExtraData => ", value);
  };
  recorderStateChange = value => {
    console.log("recorderStateChange => ", value);
  };
  internetConnectionStatus = value => {
    console.log("internetConnectionStatus => ", value);
  };
  recorderInfo = value => {
    console.log("recorderInfo => ", value);
  };
  recorderWarning = value => {
    console.log("recorderWarning => ", value);
  };
  recorderError = value => {
    console.log("recorderError => ", value);
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Main
          streamURL={"rtmp://rtmp.streamaxia.com/streamaxia/VideoStream123"}
          onPressStart={this.onPressStart}
          onPressStop={this.onPressStop}
          onChangeCamera={this.onChangeCamera}
          handleException={this.handleException}
          // For Android
          onRtmpConnected={this.onRtmpConnected}
          onNetworkWeak={this.onNetworkWeak}
          onNetworkResume={this.onNetworkResume}
          onRtmpConnecting={this.onRtmpConnecting}
          onRtmpVideoStreaming={this.onRtmpVideoStreaming}
          onRtmpAudioStreaming={this.onRtmpAudioStreaming}
          onRtmpStopped={this.onRtmpStopped}
          onRtmpDisconnected={this.onRtmpDisconnected}
          onRtmpVideoFpsChanged={this.onRtmpVideoFpsChanged}
          onRtmpVideoBitrateChanged={this.onRtmpVideoBitrateChanged}
          onRtmpAudioBitrateChanged={this.onRtmpAudioBitrateChanged}
          onRtmpAuthenticationg={this.onRtmpAuthenticationg}
          onRecordPause={this.onRecordPause}
          onRecordStarted={this.onRecordStarted}
          onRecordFinished={this.onRecordFinished}
          // For iOS
          onRecorderStopped={this.recorderStopped}
          onRecorderRecording={this.recorderRecording}
          onRecorderStarting={this.recorderStarting}
          onRecorderStopping={this.recorderStopping}
          onRecorderGetExtraData={this.recorderGetExtraData}
          onRecorderPutExtraData={this.recorderPutExtraData}
          onRecorderStateChange={this.recorderStateChange}
          internetConnectionStatus={this.internetConnectionStatus}
          onRecorderInfo={this.recorderInfo}
          onRecorderWarning={this.recorderWarning}
          onRecorderError={this.recorderError}
        />
      </SafeAreaView>
    );
  }
}
