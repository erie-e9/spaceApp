import React, { memo, ReactNode, useMemo } from 'react';
import { TextProps as NativeProps, TextStyle } from 'react-native';
import { useCopy } from '@services';
import { firstCapitalized, startsWithNumber } from '@utils/functions';
import { useRemoteFeaturesSelectorHook } from '@redux/hooks';
import { type RemoteConfigFeatures } from '@slices/types/remoteConfigFeatures';
import { useAppAlerts, useGetFeatureStatus as getStatus } from '@hooks';
import { Text, TextProps } from './styles';

interface TypographyProps extends TextProps, NativeProps {
  children: ReactNode | ReactNode[];
  remoteFeatureFlags?: Array<any>;
}

const extractText = (
  node: ReactNode,
  getCopyValue: (key: string) => string,
): { text: string; props?: TextStyle & { onPress?: () => void } } => {
  if (typeof node === 'string' && !startsWithNumber(node)) {
    return { text: getCopyValue(node) };
  }

  if (typeof node === 'object' && node !== null) {
    const { children, ...restProps } = (node as any).props;

    if (children === ' ') {
      return { text: ' ' };
    }

    const extractedText = typeof children === 'string' ? getCopyValue(children) : children;

    return {
      text: extractedText,
      props: restProps,
    };
  }

  return { text: String(node || '') };
};

const Typography: React.FC<TypographyProps> = ({ children, remoteFeatureFlags, ...restProps }) => {
  const { getCopyValue } = useCopy();
  const { showFeatureUnavailableToast } = useAppAlerts();
  const remoteConfigFeatures = useRemoteFeaturesSelectorHook();

  const getFeatureStatus = (
    featureKey: keyof RemoteConfigFeatures,
  ): [boolean, boolean, boolean] => {
    const status = getStatus(featureKey, remoteConfigFeatures);
    return [status === 'on', status === 'off', status === 'hide'];
  };

  const [on, off, hide] = useMemo(() => {
    let [onR, offR, hideR] = [true, false, false];
    let conditional = 'and';
    (remoteFeatureFlags || []).forEach((featureFlag: string, index: number): void => {
      const [onT, offT, hideT] = getFeatureStatus(featureFlag as keyof RemoteConfigFeatures);
      if (['and', 'or', 'hide'].includes(featureFlag)) {
        conditional = featureFlag;
        return;
      }
      if (index === 0) {
        offR = offT;
        onR = onT;
        hideR = hideT;
      } else {
        if (conditional === 'and') {
          offR = offR && offT;
          onR = !offR;
          hideR = hideR && hideT;
        }
        if (conditional === 'or') {
          offR = offR || offT;
          onR = !offR;
          hideR = hideR || hideT;
        }
        if (conditional === 'hide') {
          hideR = hideT;
        }
      }
    });
    return [onR, offR, hideR];
  }, [remoteFeatureFlags]);

  const onTap = (): void => {
    let calls = [];
    let proceed = true;
    calls = [checkOn, checkOff];
    calls.forEach((call): void => {
      if (proceed) {
        proceed = call();
      }
    });
  };

  const checkOn = (): boolean => {
    if (on && restProps.onPress) {
      restProps.onPress;
      return false;
    }
    return true;
  };

  const checkOff = (): boolean => {
    if (off) {
      showFeatureUnavailableToast();
      return false;
    }
    return true;
  };
  const renderChildren = (childNodes: ReactNode | ReactNode[]) => {
    if (Array.isArray(childNodes)) {
      return childNodes.map((child, index) => {
        const { text, props } = extractText(child, getCopyValue);
        return (
          <Text disabled={off} {...restProps} {...props} key={index}>
            {restProps.firstCapitalized ? firstCapitalized(text) : text}
          </Text>
        );
      });
    }

    const { text, props } = extractText(childNodes, getCopyValue);
    return (
      <Text disabled={off} {...restProps} {...props}>
        {restProps.firstCapitalized ? firstCapitalized(text) : text}
      </Text>
    );
  };

  return (
    <Text disabled={off} {...restProps}>
      {renderChildren(children)}
    </Text>
  );
};

export default memo(Typography);
