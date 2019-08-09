package VideoStream;

import android.content.Context;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.streamaxia.android.CameraPreview;

import javax.annotation.Nonnull;

public class CameraModule  extends ReactContextBaseJavaModule {
    ReactApplicationContext reactApplicationContext;
    Context context;
    public CameraModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactApplicationContext= reactContext;
        this.context = reactContext.getApplicationContext();
    }

    @Override
    public String getName() {
        return "VideoComponent";
    }


    @ReactMethod
    public void startCamera(){
        Log.e("start","method call");
        CameraViewManager.startCall();
    }

    @ReactMethod
    public void changeCamera(){
        CameraViewManager.changeCamera();
    }

    @ReactMethod
    public void stopCamera() {
        CameraViewManager.stopCamera();
    }
}
