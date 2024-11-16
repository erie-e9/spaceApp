import React, { memo, useMemo, useState } from 'react';
import { ActivityIndicator, ImageProps } from 'react-native';
import FastImage, { FastImageProps, Source as FastImageSource } from '@d11/react-native-fast-image';
import { LoaderIndicatorContainer, PlaceholderContainer, StyledImage } from './styles';

interface CustomImageProps extends Omit<FastImageProps, 'source'> {
  source: FastImageSource | string;
  priority?: FastImageSource['priority'];
  headers?: FastImageSource['headers'];
  resizeMode?: FastImageProps['resizeMode'];
  placeholderSource?: FastImageSource;
  borderRadius?: ImageProps['borderRadius'];
}

const isWebImage = (source: any): source is string => {
  return (
    typeof source === 'string' && (source.startsWith('http://') || source.startsWith('https://'))
  );
};

const isBase64Image = (source: any): source is string => {
  return typeof source === 'string' && source.startsWith('data:image/');
};

const isLocalUri = (source: any): source is string => {
  return (
    typeof source === 'string' && (source.startsWith('file://') || source.startsWith('content://'))
  );
};

const Image: React.FC<CustomImageProps> = ({
  source,
  placeholderSource,
  priority,
  headers,
  resizeMode,
  borderRadius,
  style,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const imageSource: FastImageSource = useMemo(() => {
    if (isWebImage(source) || isBase64Image(source) || isLocalUri(source)) {
      return {
        uri: source,
        priority: FastImage.priority[priority || 'normal'],
        headers,
        cache: 'cacheOnly',
      };
    } else {
      return source as FastImageSource;
    }
  }, [source, priority, headers]);
  const imageStyle = style as { width: number; height: number };

  return (
    <PlaceholderContainer width={imageStyle?.width || 50} height={imageStyle?.height || 50}>
      {isLoading &&
        (placeholderSource ? (
          <StyledImage
            source={{
              ...placeholderSource,
              priority: FastImage.priority[priority || 'normal'],
              headers,
            }}
            resizeMode={FastImage.resizeMode[resizeMode || 'contain']}
            width={imageStyle?.width || 50}
            height={imageStyle?.height || 50}
            borderRadius={borderRadius}
          />
        ) : (
          <LoaderIndicatorContainer
            width={imageStyle?.width || 50}
            height={imageStyle?.height || 50}
          >
            <ActivityIndicator size="small" color="#737373" />
          </LoaderIndicatorContainer>
        ))}
      <StyledImage
        source={imageSource}
        resizeMode={FastImage.resizeMode[resizeMode || 'contain']}
        onLoadEnd={() => setIsLoading(false)}
        width={imageStyle?.width || 50}
        height={imageStyle?.height || 50}
        borderRadius={borderRadius}
        {...props}
      />
    </PlaceholderContainer>
  );
};

export default memo(Image);
