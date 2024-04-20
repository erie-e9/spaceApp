import React, { memo, useMemo } from 'react';
import { RemoteConfigFeatures } from '@slices/types/remoteConfigFeatures';
import OptionSelectorItem from './components/OptionSelectorItem';
import { OptionSelectorList, BodyContainer } from './styles';

export interface OptionSelectorItemProps {
  title?: string;
  remoteConfig?: keyof RemoteConfigFeatures;
  onPress?: () => void;
  icon?: string;
}

export interface OptionSelectorDrawerProps {
  listOptions: Array<OptionSelectorItemProps>;
  numColumns?: number;
  centered?: boolean;
}

const OptionSelectorDrawer: React.FC<OptionSelectorDrawerProps> = ({
  listOptions,
  numColumns,
  centered,
}) => {
  const items = useMemo(() => listOptions, [listOptions]);

  return (
    <BodyContainer centered={centered}>
      <OptionSelectorList
        data={items as unknown as string[]}
        numColumns={numColumns}
        renderItem={({
          item,
          index,
        }: {
          item: OptionSelectorItemProps;
          index: number;
        }) => <OptionSelectorItem key={index} {...item} />}
      />
    </BodyContainer>
  );
};

OptionSelectorDrawer.defaultProps = {
  numColumns: 1,
  centered: false,
};

export default memo(OptionSelectorDrawer);
