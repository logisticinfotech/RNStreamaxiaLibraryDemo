package VideoStream;

import android.content.Context;
import android.widget.Toast;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import javax.annotation.Nonnull;

public class CameraViewManager extends SimpleViewManager<CameraView> {
    ThemedReactContext context;
    static CameraView cameraView;
    static String streaUrl;
    @Override
    public String getName() {
        return "VideoView";
    }

    @Override
    protected CameraView createViewInstance(ThemedReactContext reactContext) {
        this.context = reactContext;
        cameraView = new CameraView(reactContext, reactContext.getCurrentActivity());
        return cameraView;
    }

    @ReactProp(name = "url")
    public void url(CameraView cameraView, String streamURL) {
        streaUrl = streamURL;
    }

    public static void startCall(){
        if(cameraView != null){
            CameraView.start(streaUrl);
        }
    }

    public static void changeCamera(){
        if(cameraView != null){
            CameraView.change();
        }
    }
    public static void stopCamera(){
        if(cameraView != null){
            CameraView.stop();
        }
    }
}
