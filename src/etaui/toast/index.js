import React, { useEffect, useRef, useCallback } from 'react'
import { StyleSheet, Text, View, Animated } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useToast } from './useToast'
import { AntDesign } from '@icons'

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
    let textColor
    switch (type) {
        case 'Info':
            backgroundColor = '#1778F2'
            textColor = '#fff'
        break
        case 'Error':
            backgroundColor = '#ff3333'
            textColor = '#fff'
        break
        case 'Success':
            backgroundColor = 'rgba(0, 205, 0, 1)'
            textColor = '#fff'
        break
    }

    return (
        <Animated.View style={[
            styles.container,
            { bottom: insets.bottom + tabBarHeight, opacity }
          ]}>
            <View style={[styles.toast, { backgroundColor,  borderColor: backgroundColor === 'transparent' ? '#555' : 'transparent' }]}>
                <View style={styles.iconView}>
                {
                    type === 'Info'
                    ?  <AntDesign name='info' size={12} color='#333' />
                    :   type === 'Success'
                    ?   <AntDesign name='check' size={12} color={backgroundColor} />
                    :   <AntDesign name='close' size={12} color={backgroundColor} />
                    
                }
                </View>
                <Text style={[styles.message, { color: textColor}]}>{message}</Text>
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
        zIndex: 1000,
    },
    toast: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        padding: 7,
        borderWidth: 0.5,
    },
    iconView: {
        height: 13,
        width: 13,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginHorizontal: 3,
        backgroundColor: '#ffffff',
    },
    message: {
        fontSize: 12,
        textAlign: 'center'
    },
})