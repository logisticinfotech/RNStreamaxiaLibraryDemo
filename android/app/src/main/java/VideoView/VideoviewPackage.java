package VideoView;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class VideoviewPackage implements ReactPackage {

    public VideoviewPackage() { }

    @Override
    public List<NativeModule>
    createNativeModules(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager>
    createViewManagers(ReactApplicationContext reactContext) {
        List<ViewManager> modules = new ArrayList<>();
        // Add native UI components here
        modules.add(new VideoviewManager());
        return modules;
//        return Arrays.<ViewManager>asList(
//                new VideoviewManager()
//        );
    }
}