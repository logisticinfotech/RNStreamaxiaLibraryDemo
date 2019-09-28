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
    let rootView = VideoComponent(frame: CGRect(x: 0, y: 0, width: UIScreen.main.bounds.width, height: UIScreen.main.bounds.height))
    rootView.setUpView(bridge: self.bridge)
    return rootView
  }
  
  @objc func startStream(_ node: NSNumber) {
    DispatchQueue.main.async {
      let view = self.bridge.uiManager.view(forReactTag: node) as! VideoComponent
      view.startStreaming()
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
