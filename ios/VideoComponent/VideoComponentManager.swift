//
//  VideoComponentManager.swift
//  videoStripDemo
//
//  Created by Darshan on 09/08/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

import UIKit

@objc (VideoComponentManager)
class VideoComponentManager: RCTViewManager {
  
 

  override func view() -> UIView? {
    return VideoComponent()
  }
  
  @objc func startStream(_ node: NSNumber, _ callback: @escaping RCTResponseSenderBlock) {
    DispatchQueue.main.async {
      let view = self.bridge.uiManager.view(forReactTag: node) as! VideoComponent
      view.startStreaming(resolver: { (res, message) in
        if(res) {
          callback([NSNull(), message])
        }else{
          callback([message])
        }
      })
    }
  }
  
  @objc
  func stopStream(_ node:NSNumber){
    DispatchQueue.main.async {
      let view = self.bridge.uiManager.view(forReactTag: node) as! VideoComponent
      view.stopStreaming()
    }
  }
  
  @objc
  func changeCamera(_ node:NSNumber){
    DispatchQueue.main.async {
      let view = self.bridge.uiManager.view(forReactTag: node) as! VideoComponent
      view.changeCamera()
    }
  }
}
