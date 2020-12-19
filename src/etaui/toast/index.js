import React, { useEffect, useRef, useCallback } from 'react'
import { StyleSheet, Text, View, Animated } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useToast } from './useToast'

const fadeDuration = 300
const tabBarHeight = 15

const ETAToast = () => {
  // ETAToast is using hook to retrieve config and to hide itself
    const insets = useSafeAreaInsets()
    const { toastConfig, hideToast } = useToast()
    const opacity = useRef(new Animated.Value(0)).current

    useEffect(() => {
        if (!toastConfig) {
            return
        }

        fadeIn()
        // Sets up a timer to hide toast after duration
        const timer = setTimeout(hideToast, toastConfig.duration)

        return () => clearTimeout(timer)
    }, [toastConfig, fadeIn, fadeOut])

    const fadeIn = useCallback(() => {
        Animated.timing(opacity, {
          toValue: 1,
          duration: fadeDuration,
          useNativeDriver: true,
        }).start()
    }, [opacity])

    const fadeOut = useCallback(() => {
        Animated.timing(opacity, {
            toValue: 0,
            duration: fadeDuration,
            useNativeDriver: true,
        }).start(() => {
            hideToast()
        })
    }, [opacity, hideToast])

    // When config is null, toast is hidden
    if (!toastConfig) {
        return null
    }

    const { type, message } = toastConfig

    let backgroundColor
    switch (type) {
        case 'Info':
            backgroundColor = '#4DD0E1'
        break
        case 'Error':
            backgroundColor = 'rgba(230, 0, 0, 1)'
        break
        case 'Success':
            backgroundColor = 'rgba(0, 205, 0, 1)'
        break
    }

    return (
        <Animated.View style={[
            styles.container,
            { bottom: insets.bottom + tabBarHeight, opacity }
          ]}>
            <View style={[styles.toast, { backgroundColor }]}>
                <Text style={styles.message}>{message}</Text>
            </View>
        </Animated.View>
    )
}

export default ETAToast

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        position: 'absolute',
        marginHorizontal: 20,
        maxWidth: 480,
    },
      toast: {
        borderRadius: 6,
        padding: 7,
    },
      message: {
        fontSize: 13,
        textAlign: 'center',
        color: '#fff',
    },
})