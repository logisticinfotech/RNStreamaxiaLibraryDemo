//
//  VideoComponent.swift
//  videoStripDemo
//
//  Created by Darshan on 09/08/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation
import UIKit
import StreamaxiaSDK
import AVKit




class VideoComponent: UIView {
  
  var onChange: RCTBubblingEventBlock?
  
  
  /// The recorder
  fileprivate var recorder: AXRecorder!
  
  /// The stream info
  fileprivate var streamInfo: AXStreamInfo!
  
  /// The recorder settings
  fileprivate var recorderSettings: AXRecorderSettings!
  
  // Record View
  var recordView: UIView!
  
  /// Av Player
  
  var avplayer : AVAudioPlayer!
  
  /// Extra Varible
  
  static var _streamURL: String?
  static var _isAudioOnly: String?
  
  
  @objc
  var streamURL: String? {
    set {
      VideoComponent._streamURL = newValue
    }
    get {
      return VideoComponent._streamURL
    }
  }
  
  
  // SETUP STREAMAXIA
  
  func startStreaming(resolver streamResult:@escaping ((Bool,String)->Void)) {
    self.recordView = UIView(frame: CGRect(x: 0, y: 0, width: UIScreen.main.bounds.width, height: UIScreen.main.bounds.height))
    self .addSubview(self.recordView)
    
    if onChange != nil {
      onChange!(["nativeObject": "Test"])
    }
    
    DispatchQueue.global(qos: .background).async {
      let sdk = AXStreamaxiaSDK.sharedInstance()!
      let bundleURL = Bundle.main.url(forResource: "demo-certificate", withExtension: "bundle")
      let bundle = Bundle.init(url: bundleURL!)
      sdk.setupSDK(with: bundle?.bundleURL) { (success, error) in
        sdk.debugPrintStatus()
        if (success) {
          DispatchQueue.main.async {
            self.streamInfo = self.defaultStreamInfo()
            self.recorderSettings = self.defaultRecorderSettings()
            if let recorder = AXRecorder.init(streamInfo: self.streamInfo, settings: self.recorderSettings) {
              recorder.recorderDelegate = self
              recorder.setup(with: self.recordView)
              DispatchQueue.main.async {
                recorder.prepareToRecord()
              }
              var error: AXError?
              
              // Enable adaptive bitrate
              // Video quality will be adjusted based on available network and hardware resources
              recorder.activateFeatureAdaptiveBitRateWithError(&error)
              if error != nil {
                print("*** ERROR activating feature adaptive bitrate: \(String(describing: error!.message))")
                error = nil
              }
              
              // Enable local save
              // The broadcast will be saved to the users camera roll when finished
              recorder.activateFeatureSaveLocallyWithError(&error)
              if error != nil {
                print("*** ERROR activating feature save locally: \(String(describing: error!.message))")
              }
              
              DispatchQueue.main.async {
                self.recorder = recorder
                if (self.recorder == nil) {
                  print("*** DEMO *** The recorder was not properly initialized.")
                  streamResult(false,"The recorder was not properly initialized.")
                  return;
                }
                DispatchQueue.main.async {
                  self.checkOrientation()
                  self.recorder.startStreaming(completion: { (success, error) in
                    print("*** DEMO *** The stream started with success: %@", success ? "YES" : "NO")
                    if (success) {
                      streamResult(true,"Stream Success")
                      print("*** DEMO *** Success")
                    } else {
                      streamResult(false,error?.message ?? "Stream Error")
                      print("*** DEMO *** Error: %@", error ?? "")
                    }
                  })
                }
              }
            }else{
              streamResult(false,"Liceance Expire")
            }
            // Printing some debug info about the initialiation settings
            let debugRecorderSettings = AXDebug.init().string(from: self.recorderSettings)
            let debugStreamInfo = AXDebug.init().string(from: self.streamInfo)
            
            print("*** DEMO **** Did set up the recorder with the following settings:\n%@\n%@", debugRecorderSettings!, debugStreamInfo!)
          }
        }else{
          streamResult(false,error?.message ?? "Stream Inialize Error")
        }
      }
    }
  }
  
  
  func stopStreaming() {
    DispatchQueue.main.async {
      if (self.recorder == nil) {
        print("*** DEMO *** The recorder was not properly initialized.")
        return;
      }
      self.recorder.stopStreaming()
    }
  }
  
  func changeCamera() {
    DispatchQueue.main.async {
      
      if(self.recorder.settings.currentCamera == .back) {
        self.recorder.switch(to: .front, withCompletion: { (result, error) in
          if(error != nil) {
            print("Error : ",error!)
          }else{
            print("result : ",result)
          }
        })
      }else{
        self.recorder.switch(to: .back, withCompletion: { (result, error) in
          if(error != nil) {
            print("Error : ",error!)
          }else{
            print("result : ",result)
          }
        })
      }
    }
  }
  
  fileprivate func checkOrientation() {
    let currentOrientation: UIInterfaceOrientation = UIApplication.shared.statusBarOrientation
    var error: AXError? = nil
    if currentOrientation == .portrait {
      recorder.changeResolutionInversion(true, withError: &error)
    } else if currentOrientation != .portraitUpsideDown {
      recorder.changeResolutionInversion(false, withError: &error)
    }
    if error != nil {
      // Handle error
    }
  }
  
  fileprivate func defaultStreamInfo() -> AXStreamInfo {
    let info = AXStreamInfo.init()
    info.useSecureConnection = false
    if let _ = streamURL {
      info.customStreamURLString = streamURL
    }else{
      info.customStreamURLString = "rtmp://rtmp.streamaxia.com/streamaxia/VideoStream"
    }
    info.username = ""
    info.password = ""
    return info
  }
  
  fileprivate func defaultRecorderSettings() -> AXRecorderSettings {
    let utils = AXUtils.init()
    let settings = AXRecorderSettings.init()
    settings.videoFrameResolution = .standard720p
    settings.videoBitrate = utils.bitrate(for: settings.videoFrameResolution)
    settings.keyFrameInterval = Int(0.5 * Double(settings.frameRate))
    settings.currentCamera = .front
    return settings
  }
  
}

// MARK: - AXRecorderDelegate -

extension VideoComponent: AXRecorderDelegate {
  func recorder(_ recorder: AXRecorder!, didChange state: AXRecorderState) {
    //    print("*** DEMO *** Recorder State Changed to: \(state)")
    
    var string = "N/A"
    
    switch state {
    case .stopped:
      string = "[Stopped]"
      print("*** DEMO *** Recorder State Changed to: \(string)")
    case .recording:
      string = "[Recording]"
      print("*** DEMO *** Recorder State Changed to: \(string)")
    case .starting:
      string = "[Starting...]"
      print("*** DEMO *** Recorder State Changed to: \(string)")
    case .stopping:
      string = "[Stopping...]"
      print("*** DEMO *** Recorder State Changed to: \(string)")
    case .collectingExtraData:
      string = "[Get Extra Data]"
      print("*** DEMO *** Recorder State Changed to: \(string)")
    case .processingExtraData:
      string = "[Proc. Extra Data]"
      print("*** DEMO *** Recorder State Changed to: \(string)")
    default:
      string = "[Unknown state]"
      print("*** DEMO *** Recorder State Changed to: \(string)")
    }
  }
  
  func recorder(_ recorder: AXRecorder!, didUpdateStreamTime deltaTime: TimeInterval) {
    // Show the recording time in the right label
  }
  
  func recorder(_ recorder: AXRecorder!, didChange status: AXNetworkStatus) {
    print("*** DEMO *** did change network status: \(status)")
    
    var string = "Unknown network status"
    
    switch status {
    case .notReachable:
      print("Lost internet connection")
      string = "Lost internet connection"
    case .reachableViaWiFi:
      string = "Internet is reachable on wifi"
    case .reachableViaWWAN:
      string = "Internet is reachabale on Cellular"
    }
    print(string)
  }
  
  func recorder(_ recorder: AXRecorder!, didReceive info: AXInfo!) {
    print("*** DEMO *** did receive info: %@", info)
  }
  
  func recorder(_ recorder: AXRecorder!, didReceive warning: AXWarning!) {
    print("*** DEMO *** did receive warning: %@", warning)
  }
  
  func recorder(_ recorder: AXRecorder!, didReceiveError error: AXError!) {
    print("*** DEMO *** did receive error: %@", error)
  }
}
