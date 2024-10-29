import React, { memo } from 'react';
import { BiometricsButtonContainer, FormActionTouchable, TitleText } from './styles';
interface BiometricsProps {
  onSuccess: () => void;
  icon: JSX.Element;
  text?: string;
}

export const Biometrics: React.FC<BiometricsProps> = ({ onSuccess, icon, text }) => {
  return (
    <BiometricsButtonContainer>
      <FormActionTouchable onPress={onSuccess}>{icon}</FormActionTouchable>
      <TitleText
        type="Subtitle2"
        font="Primary"
        color="secondary800"
        textAlign="center"
        weight={400}
      >
        {text && text}
      </TitleText>
    </BiometricsButtonContainer>
  );
};

export default memo(Biometrics);
