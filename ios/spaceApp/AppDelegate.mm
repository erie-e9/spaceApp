#import "AppDelegate.h"
#import "RNFBAppCheckModule.h"
#import <Firebase.h>
#import "RNSplashScreen.h"
#import "React/RCTBridgeModule.h"
#import <React/RCTBundleURLProvider.h>
#import "SpaceApp-Swift.h"
#import <AuthenticationServices/AuthenticationServices.h>
#import <SafariServices/SafariServices.h>
#import <FBSDKCoreKit/FBSDKCoreKit-Swift.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"spaceApp";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  [[FBSDKApplicationDelegate sharedInstance] application:application
                  didFinishLaunchingWithOptions:launchOptions];
  [RNFBAppCheckModule sharedInstance];
  [FIRApp configure];

   BOOL success = [super application:application didFinishLaunchingWithOptions:launchOptions];
    if (success) {
      //This is where we will put the logic to get access to rootview
      UIView *rootView = self.window.rootViewController.view;

      UIUserInterfaceStyle userInterfaceStyle = UITraitCollection.currentTraitCollection.userInterfaceStyle;
      UIColor *backgroundColor;
       if (userInterfaceStyle == UIUserInterfaceStyleDark) {
           backgroundColor = [UIColor colorFromHex:@"#181725"];
       } else {
           backgroundColor = [UIColor colorFromHex:@"#FFFFFF"];
       }
      rootView.backgroundColor = backgroundColor;

      NSString *lottieName = (userInterfaceStyle == UIUserInterfaceStyleDark) ? @"spaceapp_dark" : @"spaceapp_light";
      
      Dynamic *t = [Dynamic new];
      
      UIView *animationUIView = (UIView *)[t createAnimationViewWithRootView:rootView lottieName:lottieName];
   
      // register LottieSplashScreen to RNSplashScreen
      [RNSplashScreen showLottieSplash:animationUIView inRootView:rootView];
      // casting UIView type to LottieAnimationView type
      LottieAnimationView *animationView = (LottieAnimationView *) animationUIView;
      // play
      [t playWithAnimationView:animationView];
      // If you want the animation layout to be forced to remove when hide is called, use this code
      [RNSplashScreen setAnimationFinished:true];
    }
   
    return success;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
