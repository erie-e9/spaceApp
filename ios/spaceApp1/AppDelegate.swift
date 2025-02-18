import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider

// Third party plugins
import Firebase
import FBSDKCoreKit
import Lottie
import react_native_lottie_splash_screen

@main
class AppDelegate: RCTAppDelegate {
  override func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
    self.moduleName = "spaceApp1"
    self.dependencyProvider = RCTAppDependencyProvider()
    // You can add your custom initial props in the dictionary below.
    // They will be passed down to the ViewController used by React Native.
    self.initialProps = [:]

    // Third party plugins initialization
      // Firebase
      FirebaseApp.configure()
       // App Check (if needed)
      // RNFBAppCheckModule.sharedInstance()
      // Facebook SDK
      ApplicationDelegate.shared.application(application, didFinishLaunchingWithOptions: launchOptions)
      
      // Lottie splashscreen
      let success = super.application(application, didFinishLaunchingWithOptions: launchOptions)

      if success {
        // Set up root view background color based on dark/light mode
        if let rootView = self.window.rootViewController?.view {
          let userInterfaceStyle = UITraitCollection.current.userInterfaceStyle
          let backgroundColor: UIColor = UIColor.colorFromHex(userInterfaceStyle == .dark ? "#181725" : "#FFFFFF")
          rootView.backgroundColor = backgroundColor

          // Set up Lottie splash screen
          let lottieName = (userInterfaceStyle == .dark) ? "splashscreen_dark" : "splashscreen_light"
          let dynamic = Dynamic()
          if let animationUIView = dynamic.createAnimationView(rootView: rootView, lottieName: lottieName) as? UIView {
            react_native_lottie_splash_screen.RNSplashScreen.showLottieSplash(animationUIView, inRootView: rootView)

            if let animationView = animationUIView as? LottieAnimationView {
              dynamic.play(animationView: animationView)
            }

            // Force remove animation layout when hide is called
            react_native_lottie_splash_screen.RNSplashScreen.setAnimationFinished(true)
          }
        }
      }
    // /Third party plugins

    return success
  }

  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
  
  // Third party plugins methods
    // Facebook: Handle deep linking and URL opening for Facebook, Google, and React Native Linking
    override func application(_ application: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
        return ApplicationDelegate.shared.application(application, open: url, options: options) || // Facebook
               RCTLinkingManager.application(application, open: url, options: options) // React Native Linking
    }
  // /Third party plugins methods
}
