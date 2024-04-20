import React, { memo } from 'react';
import { useCopy } from '@services';
import { InterpolateColorAnimation } from '@components/animated';
import {
  BodyContainer,
  HeaderContainer,
  StyledContainer,
  TitleContainer,
  TitleTypography,
} from './styles';

interface InfoProps {
  testID?: string;
  title?: string;
  adjustsFontTitle?: boolean;
  numberOfLinesTitle?: number;
  body: JSX.Element;
  bodyTestID?: string;
  backButton?: boolean;
}

export const Info: React.FC<InfoProps> = ({
  testID,
  title,
  adjustsFontTitle,
  numberOfLinesTitle,
  body,
  bodyTestID,
}) => {
  const { getCopyValue } = useCopy();

  return (
    <InterpolateColorAnimation isScreen>
      <StyledContainer testID={testID}>
        <HeaderContainer>
          {title && (
            <TitleContainer>
              <TitleTypography
                type="Headline5"
                adjustsFontSizeToFit={adjustsFontTitle}
                numberOfLines={numberOfLinesTitle}
                color="textLabelNeutral"
              >
                {getCopyValue(title)}
              </TitleTypography>
            </TitleContainer>
          )}
        </HeaderContainer>
        <BodyContainer testID={bodyTestID || undefined}>{body}</BodyContainer>
      </StyledContainer>
    </InterpolateColorAnimation>
  );
};

Info.defaultProps = {
  testID: 'InfoID',
  title: undefined,
  adjustsFontTitle: false,
  numberOfLinesTitle: 1,
  bodyTestID: undefined,
  backButton: false,
};

export default memo(Info);
