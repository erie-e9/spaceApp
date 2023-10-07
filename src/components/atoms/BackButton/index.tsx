import React, { memo } from 'react';
import { ApplicationScreenProps } from '@utils/@types/navigation';
import { useSVG } from '@hooks';
import { BackButtonContainer, BackButtonPressable } from './styles';

interface Props {
  testID?: string;
  navigation: ApplicationScreenProps;
}

export const BackButton: React.FC<Props> = ({ testID, navigation }) => {
  const BackButtonIcon = useSVG('BackButton');

  return (
    <BackButtonContainer>
      <BackButtonPressable testID={testID} onPress={navigation.goBack}>
        <BackButtonIcon />
      </BackButtonPressable>
    </BackButtonContainer>
  );
};

BackButton.defaultProps = {
  testID: 'BackButtonID',
};

export default memo(BackButton);
