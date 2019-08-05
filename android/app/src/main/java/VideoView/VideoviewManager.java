package VideoView;

import android.content.Context;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;

public class VideoviewManager extends SimpleViewManager<Videoview> {
    private static final String REACT_CLASS = "StreamComponent";
    private boolean isChangeOld = false;
    private boolean startCameraOld = false;
    Context mcontext;

    ThemedReactContext themedReactContext;

    @Override
    public String getName() {
        return REACT_CLASS;
    }


    @Override
    protected Videoview createViewInstance(ThemedReactContext reactContext) {
        mcontext = reactContext.getCurrentActivity();
        themedReactContext = reactContext;
        Videoview videoview = new Videoview(reactContext.getCurrentActivity());
        return videoview;
    }

    @ReactProp(name = "changeCamara")
    public void nativeCameraChange(Videoview videoview, Boolean isChange) {
        if (isChangeOld != isChange) {
            isChangeOld = isChange;
            videoview.changeCamera();
        }
    }

    @ReactProp(name = "startCamera")
    public void startCamera(Videoview videoview, Boolean startCamera) {
        if(startCamera == true) {
            boolean flg = videoview.startStream(themedReactContext,startCamera);
            if(flg == true){
                WritableMap event = Arguments.createMap();
                event.putString("Start_Success", "Stream started success");
                themedReactContext.getJSModule(RCTEventEmitter.class).receiveEvent(videoview.getId(), "topChange", event);
            } else {
                WritableMap event = Arguments.createMap();
                event.putString("Start_error", "Stream cannot start");
                themedReactContext.getJSModule(RCTEventEmitter.class).receiveEvent(videoview.getId(), "topChange", event);
            }
        }
    }
    @ReactProp(name = "stopCamera")
    public void stopCamera(Videoview videoview, Boolean stopCamera) {
        if(stopCamera == true) {
            boolean flg = videoview.stopStream(stopCamera);
            if(flg == true){
                WritableMap event = Arguments.createMap();
                event.putString("Stop_Success", "Stream stop success");
                themedReactContext.getJSModule(RCTEventEmitter.class).receiveEvent(videoview.getId(), "topChange", event);
            }
        }
    }

}
