#!/bin/bash

echo "Cleaning React Native caches..."
npm cache clean --force
yarn cache clean
pod cache clean --all 
rm -rf ios/build android/build .metro-bundler-cache/ .cache/
rm -rf ~/Library/Developer/Xcode/DerivedData
rm -rf ~/Library/Developer/CoreSimulator
rm -rf ~/Library/Caches/CocoaPods
rm -rf ~/.gradle/caches/
watchman watch-del-all
xcrun simctl shutdown all
xcrun simctl erase all
echo "Cache cleaned!"
