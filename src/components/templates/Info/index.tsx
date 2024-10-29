import React, { memo } from 'react';
import { InterpolateColorAnimation } from '@components/animated';
import { testProperties } from '@utils/functions';
import { HeaderTemplate } from '@components/atoms';
import { BodyContainer, HeaderContainer, StyledContainer } from './styles';

interface InfoProps {
  testID?: string;
  title?: string;
  description?: string;
  adjustsFontTitle?: boolean;
  numberOfLinesTitle?: number;
  body: JSX.Element;
  bodyTestID?: string;
  backButton?: boolean;
}

export const Info: React.FC<InfoProps> = ({
  testID = 'InfoID',
  title = undefined,
  description = undefined,
  adjustsFontTitle = false,
  numberOfLinesTitle = 1,
  body,
  bodyTestID = undefined,
  backButton = false,
}) => {
  return (
    <InterpolateColorAnimation isScreen>
      <StyledContainer {...testProperties(testID)}>
        <HeaderContainer>
          {title && (
            <HeaderTemplate
              title={title}
              description={description}
              adjustsFontTitle={adjustsFontTitle}
              numberOfLinesTitle={numberOfLinesTitle}
              backButton={backButton}
            />
          )}
        </HeaderContainer>
        <BodyContainer testID={bodyTestID || undefined}>{body}</BodyContainer>
      </StyledContainer>
    </InterpolateColorAnimation>
  );
};

export default memo(Info);
