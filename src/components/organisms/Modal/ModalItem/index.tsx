import React, { ReactElement, memo } from 'react';
import { Platform } from 'react-native';
import { type Language } from '@slices/types/appPreferences';
import { testProperties } from '@utils/functions';
import languagesList from '@assets/shared/languagesList.json';
import { useCopy } from '@services';
import { ItemButton, ItemLabelContainer, ItemLabel } from './styles';

type ItemTypes = { value: string; label: string };
export interface ModalItemProps {
  testID?: string;
  item: ItemTypes | string;
  onPress: () => void;
  predefinedList?: string;
}

export const ModalItem = ({
  testID = 'ModalItemID',
  item,
  onPress,
  predefinedList,
}: ModalItemProps): ReactElement => {
  const { getCopyValue } = useCopy();
  const onPressHandler = () => {
    if (onPress) onPress();
  };

  return (
    <ItemButton {...testProperties(testID)} onPress={onPressHandler}>
      <ItemLabelContainer>
        <ItemLabel type="Subtitle2" color="secondary950">
          {predefinedList !== '' && predefinedList === 'languages' && item !== null
            ? (languagesList[item].nativeName as Language)
            : // ? `menu:Menu.settings.items.appPreferences.items.changeLanguage.languages.${String(languagesList[item].name as Language).toLowerCase()}`
            item === null
            ? getCopyValue(
                'menu:Menu.settings.items.appPreferences.items.changeLanguage.languages.fromPhoneDevice',
                {
                  osDevice: Platform.OS === 'ios' ? 'iOS' : 'Android',
                },
              )
            : item?.label}
        </ItemLabel>
      </ItemLabelContainer>
    </ItemButton>
  );
};

export default memo(ModalItem);
