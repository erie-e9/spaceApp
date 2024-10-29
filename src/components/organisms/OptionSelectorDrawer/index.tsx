import React, { memo, useCallback, useMemo } from 'react';
import { type RemoteConfigFeatures } from '@slices/types/remoteConfigFeatures';
import OptionSelectorItem from './components/OptionSelectorItem';
import { OptionSelectorList } from './styles';
import {
  OptionButton,
  OptionButtonContainer,
  OptionButtonLabel,
  OptionContainer,
} from './components/styles';

export interface OptionSelectorItemProps {
  title?: string;
  icon?: string;
  onPress?: () => void;
  remoteFeatureFlags?: Array<string> | (keyof RemoteConfigFeatures)[];
}

export interface OptionSelectorDrawerProps {
  listOptions: Array<OptionSelectorItemProps>;
  numColumns?: number;
  horizontal?: boolean;
  containerStyle?: any;
}

const OptionSelectorDrawer: React.FC<OptionSelectorDrawerProps> = ({
  listOptions,
  numColumns = undefined,
  horizontal = false,
  containerStyle,
}) => {
  const items = useMemo(() => listOptions, [listOptions]);

  return (
    <OptionSelectorList
      data={items}
      numColumns={numColumns}
      horizontal={horizontal}
      containerStyle={containerStyle}
      renderItem={({ item, index }: { item: OptionSelectorItemProps; index: React.Key }) => {
        return <OptionSelectorItem key={index} {...item} />;
      }}
    />
  );
};

export default memo(OptionSelectorDrawer);
