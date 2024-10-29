import React, { memo, useMemo } from 'react';
import { type MenuItemProps } from '@types';
import { testProperties } from '@utils/functions';
import { MenuItem } from '@components/organisms/MenuList/components/MenuItem';
import { BodyContainer, StyledList } from './styles';

interface MenuListProps {
  testID?: string;
  listItems: Array<MenuItemProps>;
  scrollEnabled?: boolean;
}

const MenuList: React.FC<MenuListProps> = ({
  testID = 'MenuListID',
  listItems,
  scrollEnabled = true,
}) => {
  const items = useMemo(() => listItems, [listItems]);

  return (
    <BodyContainer {...testProperties(testID)}>
      <StyledList
        data={items}
        scrollEnabled={scrollEnabled}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }: { item: MenuItemProps; index: React.Key }) => (
          <MenuItem key={index} {...item} />
        )}
        // keyExtractor={(item: unknown, index: React.Key): string =>
        //   `key${index}`
        // }
      />
    </BodyContainer>
  );
};

export default memo(MenuList);
