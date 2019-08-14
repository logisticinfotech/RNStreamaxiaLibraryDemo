import { NativeModules, requireNativeComponent, Platform } from "react-native";
const { VideoComponent } = NativeModules;
const VideoComponentIOS = requireNativeComponent("VideoComponent");
export default (Platform.OS === "ios" ? VideoComponentIOS : VideoComponent);
