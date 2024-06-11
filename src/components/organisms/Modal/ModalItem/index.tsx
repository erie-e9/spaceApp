import React, { ReactElement, memo } from 'react';
import { Language } from '@slices/types/appPreferences';
import languagesList from '@assets/shared/languagesList.json';
import { ItemButton, ItemLabelContainer, ItemLabel } from './styles';

export interface ModalItemProps {
  testID?: string;
  item: string;
  onPress: () => void;
  predefinedList?: string;
}

export const ModalItem = ({
  testID = 'ModalItemID',
  item,
  onPress,
  predefinedList = 'languages',
}: ModalItemProps): ReactElement => {
  const onPressHandler = () => {
    if (onPress) onPress();
  };

  return (
    <ItemButton testID={testID} onPress={onPressHandler}>
      <ItemLabelContainer>
        <ItemLabel type="Subtitle1" color="opposing">
          {predefinedList ? (languagesList[item].nativeName as Language) : item}
        </ItemLabel>
      </ItemLabelContainer>
    </ItemButton>
  );
};

export default memo(ModalItem);
