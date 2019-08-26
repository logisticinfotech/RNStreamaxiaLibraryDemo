package VideoStream;

import android.Manifest;
import android.app.Activity;
import android.content.ComponentName;
import android.content.Context;
import android.database.Cursor;
import android.net.Uri;
import android.provider.ContactsContract;
import android.util.Log;
import android.view.View;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.karumi.dexter.Dexter;
import com.karumi.dexter.MultiplePermissionsReport;
import com.karumi.dexter.PermissionToken;
import com.karumi.dexter.listener.PermissionRequest;
import com.karumi.dexter.listener.multi.MultiplePermissionsListener;
import com.streamaxia.android.CameraPreview;
import com.streamaxia.android.StreamaxiaPublisher;
import com.streamaxia.android.handlers.EncoderHandler;
import com.streamaxia.android.handlers.RecordHandler;
import com.streamaxia.android.handlers.RtmpHandler;
import com.streamaxia.android.utils.Size;
import com.videostripdemo.R;

import org.w3c.dom.Text;

import java.io.IOException;
import java.net.SocketException;
import java.util.List;

public class CameraView extends RelativeLayout implements EncoderHandler.EncodeListener, RtmpHandler.RtmpListener, RecordHandler.RecordListener {

    static ThemedReactContext context;
    View view;
    CameraPreview cameraPreview;
    private static StreamaxiaPublisher mPublisher;
    private Context mContext;

    public CameraView(ThemedReactContext context, Activity mContext) {
        super(context);
        this.context = context;
        this.mContext = mContext;
        Dexter.initialize(getContext());
        checkPermissions();
    }

    private void checkPermissions() {
        Dexter.checkPermissions(new MultiplePermissionsListener() {
            @Override
            public void onPermissionsChecked(MultiplePermissionsReport report) {
                if (report.areAllPermissionsGranted()) {
                    init();
                }
            }

            @Override
            public void onPermissionRationaleShouldBeShown(List<PermissionRequest> permissions, PermissionToken token) {
                token.continuePermissionRequest();
            }
        }, Manifest.permission.CAMERA, Manifest.permission.RECORD_AUDIO);
    }

    public void init() {
        view = inflate(getContext(), R.layout.videoview, this);
        cameraPreview = (CameraPreview) findViewById(R.id.preview);
        mPublisher = new StreamaxiaPublisher(cameraPreview, mContext);
        mPublisher.setEncoderHandler(new EncoderHandler(this));
        mPublisher.setRtmpHandler(new RtmpHandler(this));
        mPublisher.setRecordEventHandler(new RecordHandler(this));
        cameraPreview.startCamera();
        mPublisher.switchCamera();
        setStreamerDefaultValues();
    }

    private void setStreamerDefaultValues() {
        List<Size> sizes = mPublisher.getSupportedPictureSizes(getResources().getConfiguration().orientation);
        Size resolution = sizes.get(0);
        mPublisher.setVideoOutputResolution(resolution.width, resolution.height, this.getResources().getConfiguration().orientation);
    }

    public static void start(String streaUrl) {
        Log.e("stream url ", " url => " + streaUrl );
        try {
            mPublisher.startPublish(streaUrl);
            WritableMap payload = Arguments.createMap();
            payload.putString("start_parameter", "Start call");
            context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("onStart", payload);
            Toast.makeText(context, "Stream is Started", Toast.LENGTH_SHORT).show();
        } catch (Exception e) {
            Log.e("start_stream", "Start Stream Error => " + e.getMessage());
        }
    }

    public static void change() {
        mPublisher.switchCamera();
        WritableMap payload = Arguments.createMap();
        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("ChangeCamera", payload);
    }

    public static void stop() {
        Toast.makeText(context, "Stop", Toast.LENGTH_SHORT).show();
        mPublisher.stopPublish();
        WritableMap payload = Arguments.createMap();
        payload.putString("Stop_parameter", "Stop call");
        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("onStop", payload);
    }

    @Override
    public void onNetworkWeak() {
        Log.e("Error", "onNetworkWeak ====>");
        WritableMap payload = Arguments.createMap();
        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("onNetworkWeak", payload);
    }

    @Override
    public void onNetworkResume() {
        Log.e("Error", "onNetworkResume ====>");
        WritableMap payload = Arguments.createMap();
        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("onNetworkResume", payload);
    }

    @Override
    public void onEncodeIllegalArgumentException(IllegalArgumentException e) {
        handleException(e);
    }

    private void handleException(Exception e) {
//        try {
//            Log.e("Error => ", "Error  ========> " + e.getMessage());
////            mPublisher.stopPublish();
//        } catch (Exception e1) {
//            Log.e("Error => ", "Error  ========> " + e1.getMessage());
//        }
        WritableMap payload = Arguments.createMap();
        payload.putString("handleException", e.getMessage());
        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("handleException", payload);
    }

    @Override
    public void onRtmpConnecting(String s) {
        Log.e("Error", " onRtmpConnecting====> " + s);
        WritableMap payload = Arguments.createMap();
        payload.putString("onRtmpConnecting", s);
        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("onRtmpConnecting", payload);
    }

    @Override
    public void onRtmpConnected(String s) {
        Log.e("error","onRtmpConnected ===> " + s);
        WritableMap payload = Arguments.createMap();
        payload.putString("onRtmpConnected", s);
        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("onRtmpConnected", payload);
    }

    @Override
    public void onRtmpVideoStreaming() {
        Log.e("Error", "onRtmpVideoStreaming ====>");
        WritableMap payload = Arguments.createMap();
        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("onRtmpVideoStreaming", payload);
    }

    @Override
    public void onRtmpAudioStreaming() {
        Log.e("Error"," onRtmpAudioStreaming====>");
        WritableMap payload = Arguments.createMap();
        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("onRtmpAudioStreaming", payload);
    }

    @Override
    public void onRtmpStopped() {
        Log.e("Error", "onRtmpStopped ====>");
        WritableMap payload = Arguments.createMap();
        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("onRtmpStopped", payload);
    }

    @Override
    public void onRtmpDisconnected() {
        Log.e("Error", " onRtmpDisconnected====>");
        WritableMap payload = Arguments.createMap();
        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("onRtmpDisconnected", payload);
    }

    @Override
    public void onRtmpVideoFpsChanged(double v) {
        Log.e("Error", "onRtmpVideoFpsChanged ====>");
        WritableMap payload = Arguments.createMap();
        payload.putString("onRtmpVideoFpsChanged",  String.valueOf(v));
        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("onRtmpVideoFpsChanged", payload);
    }

    @Override
    public void onRtmpVideoBitrateChanged(double v) {
        Log.e("Error", "onRtmpVideoBitrateChanged ====>");
        WritableMap payload = Arguments.createMap();
        payload.putString("onRtmpVideoBitrateChanged",  String.valueOf(v));
        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("onRtmpVideoBitrateChanged", payload);
    }

    @Override
    public void onRtmpAudioBitrateChanged(double v) {
        Log.e("Error","onRtmpAudioBitrateChanged ====>");
        WritableMap payload = Arguments.createMap();
        payload.putString("onRtmpAudioBitrateChanged",  String.valueOf(v));
        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("onRtmpAudioBitrateChanged", payload);
    }

    @Override
    public void onRtmpSocketException(SocketException e) {
        handleException(e);
    }

    @Override
    public void onRtmpIOException(IOException e) {
        handleException(e);
    }

    @Override
    public void onRtmpIllegalArgumentException(IllegalArgumentException e) {
        handleException(e);
    }

    @Override
    public void onRtmpIllegalStateException(IllegalStateException e) {
        handleException(e);
    }

    @Override
    public void onRtmpAuthenticationg(String s) {
        Log.e("Error", " onRtmpAuthenticationg====> " + s);
        WritableMap payload = Arguments.createMap();
        payload.putString("onRtmpAuthenticationg",  s);
        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("onRtmpAuthenticationg", payload);
    }

    @Override
    public void onRecordPause() {
        Log.e("Error", "onRecordPause ====>");
        WritableMap payload = Arguments.createMap();
        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("onRecordPause", payload);
    }

    @Override
    public void onRecordResume() {
        WritableMap payload = Arguments.createMap();
        payload.putString("onRecordResume_perameter", "onRecordResume");
        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("onRecordResume", payload);
    }

    @Override
    public void onRecordStarted(String s) {
        Log.e("error","onRecordStarted ===> " + s);
        WritableMap payload = Arguments.createMap();
        payload.putString("onRecordStarted",  s);
        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("onRecordStarted", payload);
    }

    @Override
    public void onRecordFinished(String s) {
        Log.e("Error", "onRecordFinished ====> " + s);
        WritableMap payload = Arguments.createMap();
        payload.putString("onRecordFinished",  s);
        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("onRecordFinished", payload);
    }

    @Override
    public void onRecordIllegalArgumentException(IllegalArgumentException e) {
        handleException(e);
    }

    @Override
    public void onRecordIOException(IOException e) {
        handleException(e);
    }
}
