# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# Keep React Native specific classes and methods
# -keep class com.facebook.react.** { *; }
# -keep class com.facebook.fbreact.** { *; }

# Keep any native modules you might have
# -keep class com.spaceApp.** { *; }

# Keep all public classes (just as a fallback, adjust as necessary)
# -keep public class * { *; }

# Ignore logging related classes to prevent stripping out logging functionality
# -keep class **.R$* { *; }
# -keep class android.support.v7.** { *; }
# -keep class com.google.android.gms.** { *; }

#
# React native
-keep class com.facebook.react.** { *; }
-keep class com.facebook.hermes.** { *; }
-keep class com.facebook.jni.** { *; }
-keep class com.facebook.react.uimanager.** { *; }
-keep class com.facebook.react.bridge.** { *; }
-keep class com.facebook.react.modules.** { *; }
-keep class com.facebook.react.views.** { *; }
-keep class com.facebook.react.turbomodule.** { *; }

# okhttp3
-dontwarn okhttp3.**
-keep class okhttp3.** { *; }
-dontwarn okio.**
-keep class okio.** { *; }

# Fresco image manager
-dontwarn com.facebook.imagepipeline.**
-keep class com.facebook.imagepipeline.** { *; }
-dontwarn com.facebook.drawee.**
-keep class com.facebook.drawee.** { *; }

# if app uses Glide
# -keep class com.bumptech.glide.** { *; }
# -dontwarn com.bumptech.glide.**

# Firebase
-keep class com.google.firebase.** { *; }
-dontwarn com.google.firebase.**

# Dep injection
-keep class dagger.** { *; }
-dontwarn javax.inject.**
-keep class javax.inject.** { *; }

# Classes with annotations
-keepattributes *Annotation*

# Turn off Kotlin warnings
-dontwarn kotlin.**

# Allow proGuard reduce size and improve optimize app
-optimizations !code/simplification/arithmetic,!field/*,!class/merging/*

# Generate an info with the used R8 rules
-printconfiguration ~/tmp/full-r8-config.txt


# React-native-fast-image
# -keep public class com.dylanvann.fastimage.* {*;}
# -keep public class com.dylanvann.fastimage.** {*;}
# -keep public class * implements com.bumptech.glide.module.GlideModule
# -keep public class * extends com.bumptech.glide.module.AppGlideModule
# -keep public enum com.bumptech.glide.load.ImageHeaderParser$** {
#   **[] $VALUES;
#   public *;
# }