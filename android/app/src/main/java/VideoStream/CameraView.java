package VideoStream;

import android.Manifest;
import android.content.Context;
import android.util.Log;
import android.view.View;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
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

    static Context context;
    View view;
    CameraPreview cameraPreview;
    private static StreamaxiaPublisher mPublisher;


    public CameraView(Context context) {
        super(context);
        this.context = context;
        Dexter.initialize(getContext());
        checkPermissions();
//        init();
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
        mPublisher = new StreamaxiaPublisher(cameraPreview, context);
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

    public static void start(){
        Toast.makeText(context, "Start", Toast.LENGTH_SHORT).show();
    }

    public static void change(){
        mPublisher.switchCamera();
    }

    public static void stop() {
        Toast.makeText(context, "Stop", Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onNetworkWeak() {
    }

    @Override
    public void onNetworkResume() {
    }

    @Override
    public void onEncodeIllegalArgumentException(IllegalArgumentException e) {
        handleException(e);
    }

    private void handleException(Exception e) {
        try {
            Log.e("Error => ", "Error  ========> " + e.getMessage());
            mPublisher.stopPublish();
        } catch (Exception e1) {
            Log.e("Error => ", "Error  ========> " + e1.getMessage());
        }
    }

    @Override
    public void onRtmpConnecting(String s) {

    }

    @Override
    public void onRtmpConnected(String s) {
//        WritableMap event = Arguments.createMap();
//        event.putString("Start_Success", "Stream started success");
//        themedReactContext.getJSModule(RCTEventEmitter.class).receiveEvent(videoview.getId(), "topChange", event);
    }

    @Override
    public void onRtmpVideoStreaming() {

    }

    @Override
    public void onRtmpAudioStreaming() {

    }

    @Override
    public void onRtmpStopped() {

    }

    @Override
    public void onRtmpDisconnected() {

    }

    @Override
    public void onRtmpVideoFpsChanged(double v) {

    }

    @Override
    public void onRtmpVideoBitrateChanged(double v) {

    }

    @Override
    public void onRtmpAudioBitrateChanged(double v) {

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

    }

    @Override
    public void onRecordPause() {

    }

    @Override
    public void onRecordResume() {

    }

    @Override
    public void onRecordStarted(String s) {
        Toast.makeText(context, "onRecored started => " + s, Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onRecordFinished(String s) {

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
