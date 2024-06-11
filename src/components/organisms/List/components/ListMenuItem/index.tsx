import React, { memo } from 'react';
// import { testProperties } from '@utils/testID';
import { useTheme } from 'styled-components';
import useSVG from '@hooks/utils/useSVG';
import { Typography } from '@components/atoms';
import {
  ListMenuItemBadgeContainer,
  ListMenuItemRightSide,
  MenuItemContainer,
  MenuItemContent,
  TouchableMenuItem,
  DescriptionText,
} from '../../styles';

interface ListMenuItemProps {
  value?: string;
  descriptionItem?: string;
  body?: JSX.Element;
  icon?: JSX.Element;
  disabled?: boolean;
  isGreyed?: boolean;
  disabledArrow?: boolean;
  onPress?: () => void;
  paddingHorizontal?: number;
  checkInput?: { checked: boolean; onPress: () => void };
  selected?: boolean;
  badge?: JSX.Element;
  testID?: string;
  featureFlags?: string[];
}

export const ListMenuItem: React.FC<ListMenuItemProps> = ({
  value = undefined,
  descriptionItem = undefined,
  disabledArrow = undefined,
  body = undefined,
  isGreyed = false,
  icon = undefined,
  disabled = false,
  onPress = undefined,
  paddingHorizontal = 0,
  checkInput = undefined,
  selected = undefined,
  badge = undefined,
  testID = 'listMenuItem',
  featureFlags = [],
}) => {
  const RightArrow = useSVG('right-arrow');
  const theme = useTheme();
  const isDarkMode = theme.mode === 'dark';

  const featureProps: Record<string, unknown> = {
    featureFlags: featureFlags || [],
    disabled: featureFlags === undefined ? disabled : false,
  };

  if (featureFlags === undefined) {
    featureProps.isGreyed = isGreyed;
  }

  return (
    <TouchableMenuItem
      testID={testID}
      onPress={onPress}
      paddingHorizontal={paddingHorizontal}
      {...featureProps}
    >
      <MenuItemContainer>
        {icon}
        <MenuItemContent>
          {!body ? (
            <>
              <DescriptionText
                type="Body3"
                color={isDarkMode ? 'lightBlueL5' : 'darkBlueD1'}
                fontSize={16}
              >
                {value}
              </DescriptionText>
              {!!descriptionItem && (
                <DescriptionText
                  type="Body4"
                  color={isDarkMode ? 'lightBlueL5' : 'darkBlueD5'}
                  marginTop={5}
                >
                  {descriptionItem}
                </DescriptionText>
              )}
            </>
          ) : (
            body
          )}
        </MenuItemContent>
      </MenuItemContainer>
      {!checkInput ? (
        <ListMenuItemRightSide>
          {!!badge && (
            <ListMenuItemBadgeContainer
            // {...testProperties('badgeItem')}
            >
              {badge}
            </ListMenuItemBadgeContainer>
          )}
          {disabledArrow ? (
            <Typography />
          ) : (
            <RightArrow disabled={disabledArrow} />
          )}
        </ListMenuItemRightSide>
      ) : (
        <></>
      )}
    </TouchableMenuItem>
  );
};

export default memo(ListMenuItem);
