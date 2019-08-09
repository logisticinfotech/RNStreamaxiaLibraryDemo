import React, { Component } from "react";
import { requireNativeComponent } from "react-native";
const Componet = requireNativeComponent('VideoView');

class CameraComponet extends Component {
  render() {
    return <Componet style={{ flex: 1 }} url={this.props.streamURL} />;
  }
}

export default CameraComponet;
