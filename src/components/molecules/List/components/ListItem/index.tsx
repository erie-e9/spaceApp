import React, { Fragment, memo } from 'react';
import { DefaultTheme } from 'styled-components/native';
import { testProperties } from '@utils/functions';
import {
  Container,
  TextContainer,
  TitleContainer,
  StyledTitle,
  StyledSubtitle,
  RightContainer,
  StyledSafeAreaView,
  StyledButton,
} from './styles';

interface ListItemProps {
  testID?: string;
  title?: string;
  subtitle?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  onPress?: () => void;
  color?: keyof DefaultTheme['tokens']['colors'] | undefined;
  isPressable?: boolean;
}

export const ListItem: React.FC<ListItemProps> = ({
  testID = 'ListItemID',
  title = undefined,
  subtitle = undefined,
  left = undefined,
  right = undefined,
  onPress = undefined,
  color = undefined,
  isPressable = undefined,
}) => {
  const children = (
    <Fragment>
      {left}
      <TextContainer>
        <TitleContainer>
          {!!title && (
            <StyledTitle testID={testID + 'ListTitle'} type="Body3" color={color || 'secondary800'}>
              {title}
            </StyledTitle>
          )}
        </TitleContainer>
        {!!subtitle && (
          <StyledSubtitle
            testID={testID + 'ListSubtitle'}
            type="Subtitle3"
            color={color || 'secondary800'}
          >
            {subtitle}
          </StyledSubtitle>
        )}
      </TextContainer>
    </Fragment>
  );

  if (isPressable) {
    return (
      <StyledSafeAreaView>
        {left}
        <StyledButton
          testID={testID + 'Button'}
          title={title}
          subtitle={subtitle}
          onPress={onPress}
          type="Text"
          buttonTheme="Secondary"
        />

        <RightContainer>{right}</RightContainer>
      </StyledSafeAreaView>
    );
  }

  return (
    <StyledSafeAreaView>
      <Container {...testProperties(testID)}>{children}</Container>
      <RightContainer>{right}</RightContainer>
    </StyledSafeAreaView>
  );
};

export default memo(ListItem);
