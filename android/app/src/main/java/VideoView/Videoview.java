package VideoView;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.graphics.Bitmap;
import android.os.Handler;
import android.util.Log;
import android.view.View;
import android.widget.RelativeLayout;
import android.widget.Toast;
import android.widget.VideoView;

import androidx.appcompat.app.AppCompatActivity;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.CatalystInstance;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.uimanager.ThemedReactContext;
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

import java.io.IOException;
import java.net.SocketException;
import java.util.List;

public class Videoview extends RelativeLayout implements RtmpHandler.RtmpListener,
        RecordHandler.RecordListener,
        EncoderHandler.EncodeListener
{
    private CameraPreview mCameraView;
    private StreamaxiaPublisher mPublisher;
    private Context mContext;

    public Videoview(Activity context) {
        super(context);
        this.mContext = context;
        Dexter.initialize(getContext());
        checkPermissions();
    }


    private void init() {
        View view = inflate(mContext, R.layout.videoview, this);
        mCameraView = (CameraPreview) findViewById(R.id.preview);
        mPublisher = new StreamaxiaPublisher(mCameraView, mContext);
        mPublisher.setEncoderHandler(new EncoderHandler(this));
        mPublisher.setRtmpHandler(new RtmpHandler(this));
        mPublisher.setRecordEventHandler(new RecordHandler(this));
        mCameraView.startCamera();
        setStreamerDefaultValues();
    }



    public void changeCamera() {
        mPublisher.switchCamera();
    }

    private void takeSnapshot() {
        final Handler handler = new Handler();
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                mCameraView.takeSnapshot(new CameraPreview.SnapshotCallback() {
                    @Override
                    public void onSnapshotTaken(Bitmap image) {

                    }
                });
            }
        }, 5000);
    }

    public boolean stopStream(boolean flg){
        if(flg == true){
            try {
                mPublisher.stopPublish();
                return true;
            } catch (Exception e) {
                Log.e("==== startStopStream", "Stop Stream Error => " + e.getMessage());
                return false;
            }
        }
        return false;
    }

    public boolean startStream(ThemedReactContext themedReactContext, boolean flg) {
        if(flg == true) {
            try {
                mPublisher.startPublish("rtmp://rtmp.streamaxia.com/streamaxia/BRLStream");
                Toast.makeText(mContext, "Start Stream", Toast.LENGTH_SHORT).show();
                return true;
            } catch (Exception e) {
                Log.e("==== startStopStream", "Start Stream Error===>" + e.toString());
                return false;
            }
        }
        return false;
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


    private void setStreamerDefaultValues() {
        List<Size> sizes = mPublisher.getSupportedPictureSizes(getResources().getConfiguration().orientation);
        Size resolution = sizes.get(0);
        mPublisher.setVideoOutputResolution(resolution.width, resolution.height, this.getResources().getConfiguration().orientation);
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
    /*
     * RecordHandler implementation
     * */
    @Override
    public void onRecordPause() {
    }
    @Override
    public void onRecordResume() {

    }

    @Override
    public void onRecordStarted(String s) {

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

    /*
     * RTMPListener implementation
     * */

    @Override
    public void onRtmpConnecting(String s) {
//        setStatusMessage(s);
    }

    @Override
    public void onRtmpConnected(String s) {
//        setStatusMessage(s);
//        startStopTextView.setText("STOP");
    }

    @Override
    public void onRtmpVideoStreaming() {
//        Log.i(TAG,"Dataaaaa"+"nRtmpVideoStreaming");
    }

    @Override
    public void onRtmpAudioStreaming() {
//        Log.i(TAG,"Dataaaaa"+"onRtmpAudioStreaming");
    }

    @Override
    public void onRtmpStopped() {
//        setStatusMessage("STOPPED");
    }

    @Override
    public void onRtmpDisconnected() {
//        setStatusMessage("Disconnected");
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

    private void stopChronometer() {
//        mChronometer.setBase(SystemClock.elapsedRealtime());
//        mChronometer.stop();
    }

    private void handleException(Exception e) {
        try {
//            Toast.makeText(getApplicationContext(), e.getMessage(), Toast.LENGTH_SHORT).show();
            Log.e("Error => ", "Error  ========> " + e.getMessage());
            mPublisher.stopPublish();
        } catch (Exception e1) {

        }
    }

}
