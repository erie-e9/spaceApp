import React from 'react';
import { TextProps as NativeProps } from 'react-native';
import { Text, TextProps } from './styles';

const Typography: React.FC<TextProps & NativeProps> = props => {
  return <Text {...props} />;
};

export default Typography;
