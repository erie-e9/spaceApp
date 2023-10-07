import React, { memo } from 'react';
import { TextProps as NativeProps } from 'react-native';
import { Text, TextProps } from './styles';

export const Typography: React.FC<TextProps & NativeProps> = props => {
  return <Text {...props} />;
};

export default memo(Typography);
