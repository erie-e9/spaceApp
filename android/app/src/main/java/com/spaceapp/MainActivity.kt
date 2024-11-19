package com.spaceapp

import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import org.devio.rn.splashscreen.SplashScreen
import android.content.res.Configuration
// import com.toyberman.RNSslPinningPackage

class MainActivity : ReactActivity() {

  override fun onCreate(savedInstanceState: Bundle?) {
    // Detect the current theme mode (light or dark)
    val nightModeFlags = resources.configuration.uiMode and Configuration.UI_MODE_NIGHT_MASK
    when (nightModeFlags) {
      Configuration.UI_MODE_NIGHT_YES -> {
        // Dark theme is active
        setTheme(R.style.Theme_App_Dark)
        SplashScreen.show(this, R.style.SplashScreenTheme_Dark, R.id.lottie)
      }
      Configuration.UI_MODE_NIGHT_NO, Configuration.UI_MODE_NIGHT_UNDEFINED -> {
        // Light theme is active or undefined
        setTheme(R.style.Theme_App_Light)
        SplashScreen.show(this, R.style.SplashScreenTheme_Light, R.id.lottie)
      }
    }
    SplashScreen.setAnimationFinished(true)
    super.onCreate(savedInstanceState)
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "spaceApp"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
