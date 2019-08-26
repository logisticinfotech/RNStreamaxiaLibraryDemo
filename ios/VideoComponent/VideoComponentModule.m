//
//  VideoComponentModule.m
//  videoStripDemo
//
//  Created by Darshan on 09/08/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(VideoComponentManager, RCTViewManager)
RCT_EXPORT_VIEW_PROPERTY(streamURL, NSString)
RCT_EXTERN_METHOD(stopStream:(nonnull NSNumber *)node)
RCT_EXTERN_METHOD(changeCamera:(nonnull NSNumber *)node)
RCT_EXTERN_METHOD(startStream:(nonnull NSNumber *)node : (RCTResponseSenderBlock)callback)
RCT_EXPORT_VIEW_PROPERTY(onChange, RCTBubblingEventBlock)

@end
