import React, { forwardRef, memo, ReactNode, ForwardedRef } from 'react';
import { TextProps as NativeTextProps, TextStyle } from 'react-native';
import { useCopy } from '@services';
import { firstCapitalized, startsWithNumber } from '@utils/functions';
import { Text, TextProps } from './styles';

interface TypographyProps extends TextProps, NativeTextProps {
  children: ReactNode | ReactNode[];
  remoteFeatureFlags?: Array<any>;
}

const extractText = (
  node: ReactNode,
  getCopyValue: (key: string) => string,
): { text: string; props?: TextStyle & { onPress?: () => void } } => {
  if (typeof node === 'string') {
    return {
      text: startsWithNumber(node) ? node : getCopyValue(node),
    };
  }

  if (typeof node === 'object' && node !== null && 'props' in node) {
    const { children, ...restProps } = (node as any).props;

    if (children === ' ') {
      return { text: ' ' };
    }

    return {
      text: typeof children === 'string' ? getCopyValue(children) : children,
      props: restProps,
    };
  }

  return { text: String(node || '') };
};

const renderChildren = (
  children: ReactNode | ReactNode[],
  getCopyValue: (key: string) => string,
  restProps: TextProps & NativeTextProps,
  ref: ForwardedRef<any>,
) => {
  if (Array.isArray(children)) {
    return children.map((child, index) => {
      const { text, props } = extractText(child, getCopyValue);
      return (
        <Text ref={ref} key={index} {...restProps} {...props}>
          {restProps.firstCapitalized ? firstCapitalized(text) : text}
        </Text>
      );
    });
  }

  const { text, props } = extractText(children, getCopyValue);
  return (
    <Text ref={ref} {...restProps} {...props}>
      {restProps.firstCapitalized ? firstCapitalized(text) : text}
    </Text>
  );
};

const Typography: React.FC<TypographyProps> = forwardRef(
  ({ children, remoteFeatureFlags, ...restProps }, ref) => {
    const { getCopyValue } = useCopy();
    return (
      <Text ref={ref} {...restProps}>
        {renderChildren(children, getCopyValue, restProps, ref)}
      </Text>
    );
  },
);

Typography.displayName = 'Typography';
export default memo(Typography);
