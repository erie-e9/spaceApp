import UIKit
import Foundation
import Lottie

@objc class Dynamic: NSObject {

  @objc func createAnimationView(rootView: UIView, lottieName: String) -> LottieAnimationView {
    let animationView = LottieAnimationView(name: lottieName)
    let screenSize: CGRect = UIScreen.main.bounds
    let screenWidth = screenSize.width * 2
    let screenHeight = screenSize.height * 2

    animationView.frame = CGRect(x: 0, y: 0, width: screenWidth, height: screenHeight)
    animationView.center = rootView.center
    
    let userInterfaceStyle = UITraitCollection.current.userInterfaceStyle
    
    let backgroundColor: UIColor
    if userInterfaceStyle == .dark {
        backgroundColor = UIColor.colorFromHex("#181725")
    } else {
        backgroundColor = UIColor.colorFromHex("#FFFFFF")
    }
    
    animationView.backgroundColor = backgroundColor
    return animationView
  }

  @objc func play(animationView: LottieAnimationView) {
    animationView.play(
      fromProgress: 0.0,
      toProgress: 1.0,
      loopMode: LottieLoopMode.loop,
      completion: { (success) in
        RNSplashScreen.setAnimationFinished(true)
      }
    )
  }
}
