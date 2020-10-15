import React, { memo, useMemo } from 'react'
import { View, StyleSheet, Animated, Image } from 'react-native'

const ETAProgressiveImage = memo(({ source, thumbnailSource, style }, ...props) => {
    const thumbnailAnimated = new Animated.Value(0)
    const imageAnimated = new Animated.Value(0)

    const handleThumbnailLoad = useMemo(() => {
        Animated.timing(thumbnailAnimated, {
            toValue: 1,
            useNativeDriver: true
        }).start()
    }, [source, thumbnailSource])
    
    const onImageLoad = useMemo(() => {
        Animated.timing(imageAnimated, {
            toValue: 1,
            useNativeDriver: true
        }).start()
    }, [source, thumbnailSource])

    return (
        <>
            <Animated.Image
                {...props}
                source={thumbnailSource}
                style={[{ opacity: thumbnailAnimated }, style]}
                onLoad={handleThumbnailLoad}
                progressiveRenderingEnabled={true}
                blurRadius={1}
            />
            <Animated.Image
                {...props}
                source={source}
                style={[styles.imageOverlay, { opacity: imageAnimated }, style]}
                onLoad={onImageLoad}
                progressiveRenderingEnabled={true}
            />
            {/* <Image
                // {...props}
                source={source}
                style={style}
                // onLoad={onImageLoad}
            /> */}
        </>
    )
})

const styles = StyleSheet.create({
    imageOverlay: {
        position: 'absolute',
        // left: 0,
        // right: 0,
        // bottom: 0,
        // top: 0,
    },
})

export default ETAProgressiveImage