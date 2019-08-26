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
  handleException = value => {
    console.log("handleException => ", value);
  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Main
          streamURL={"rtmp://rtmp.streamaxia.com/streamaxia/VideoStream123"}
          onPressStart={this.onPressStart}
          onPressStop={this.onPressStop}
          onChangeCamera={this.onChangeCamera}
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
          handleException={this.handleException}
        />
      </SafeAreaView>
    );
  }
}
