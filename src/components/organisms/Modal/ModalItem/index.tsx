import React, { ReactElement, memo } from 'react';
import { Language } from '@slices/types/appPreferences';
import languagesList from '@assets/shared/languagesList.json';
import { ItemButton, ItemLabelContainer, ItemLabel } from './styles';

export interface ModalItemProps {
  testID?: string;
  item: unknown;
  onPress: () => void;
  predefinedList?: 'languages';
}

export const ModalItem = ({
  testID,
  item,
  onPress,
  predefinedList,
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

ModalItem.defaultProps = {
  testID: 'ModalItemID',
  predefinedList: null,
};

export default memo(ModalItem);
