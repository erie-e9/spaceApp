import React, { memo } from 'react';
import { ApplicationScreenProps } from '@utils/@types/navigation';
import { useSVG } from '@hooks';
import { Tappable } from '@components/atoms';
import { BackButtonContainer } from './styles';

interface Props {
  navigation: ApplicationScreenProps;
}

const BackButton: React.FC<Props> = ({ navigation }) => {
  const BackButtonIcon = useSVG('BackButton');
  return (
    <BackButtonContainer>
      <Tappable onPress={navigation.goBack}>
        <BackButtonIcon />
      </Tappable>
    </BackButtonContainer>
  );
};

export default memo(BackButton);
export { BackButton };
