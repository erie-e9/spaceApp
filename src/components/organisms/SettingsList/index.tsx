import React, { memo, useMemo } from 'react';
import { SettingsItemProps } from '@components/organisms/SettingsList/components/SettingsItem';
import { SettingsItem } from '@components/organisms/SettingsList/components/SettingsItem';
import { BodyContainer, StyledList } from './styles';

export interface ListItemsProps {
  title?: string;
  icon?: string;
  items: Array<SettingsItemProps>;
}

interface SettingsListProps {
  testID?: string;
  listItems: Array<ListItemsProps>;
}

const SettingsList: React.FC<SettingsListProps> = ({ testID, listItems }) => {
  const items = useMemo(() => listItems, [listItems]);

  return (
    <BodyContainer testID={testID}>
      <StyledList
        data={items}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }: { item: any; index: React.Key }) => (
          <SettingsItem key={index} {...item} />
        )}
        keyExtractor={(item: unknown, index: React.Key): string =>
          `key${index}`
        }
      />
    </BodyContainer>
  );
};

SettingsList.defaultProps = {
  testID: 'SettingsListID',
};

export default memo(SettingsList);
