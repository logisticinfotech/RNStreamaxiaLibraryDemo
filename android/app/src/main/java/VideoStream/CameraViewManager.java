package VideoStream;

import android.content.Context;
import android.widget.Toast;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

import javax.annotation.Nonnull;

public class CameraViewManager extends SimpleViewManager<CameraView> {
    Context context;
    static CameraView cameraView;
    @Override
    public String getName() {
        return "VideoView";
    }

    @Override
    protected CameraView createViewInstance(ThemedReactContext reactContext) {
        this.context = reactContext;
        cameraView = new CameraView(reactContext);
        return cameraView;
    }
    public static void startCall(){
        if(cameraView != null){
            CameraView.start();
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
