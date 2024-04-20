import React, { memo } from 'react';
import { DefaultTheme } from 'styled-components/native';
import {
  ContainerWithOutPress,
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
  onPressOut?: () => void;
  color?: keyof DefaultTheme['tokens']['colors'] | undefined;
  isPressable?: boolean;
}

export const ListItem: React.FC<ListItemProps> = ({
  testID,
  title,
  subtitle,
  left,
  right,
  onPress,
  onPressOut,
  color,
  isPressable,
}) => {
  const child = (
    <>
      {left}
      <TextContainer>
        <TitleContainer>
          {!!title && (
            <StyledTitle
              testID="list-title"
              type="Body3"
              color={color || 'surfaceL1'}
            >
              {title}
            </StyledTitle>
          )}
        </TitleContainer>
        {!!subtitle && (
          <StyledSubtitle
            testID="list-subtitle"
            type="Subtitle3"
            color={color || 'surfaceL1'}
          >
            {subtitle}
          </StyledSubtitle>
        )}
      </TextContainer>
    </>
  );

  if (isPressable === undefined || isPressable === false) {
    return (
      <StyledSafeAreaView>
        {left}
        <StyledButton
          testID={testID || undefined}
          title={title}
          subtitle={subtitle}
          onPress={onPress}
          onPressOut={onPressOut}
          type="Text"
          buttonTheme="Secondary"
        />

        <RightContainer>{right}</RightContainer>
      </StyledSafeAreaView>
    );
  }

  return (
    <StyledSafeAreaView>
      <ContainerWithOutPress testID={testID}>{child}</ContainerWithOutPress>
      <RightContainer>{right}</RightContainer>
    </StyledSafeAreaView>
  );
};

export default memo(ListItem);

ListItem.defaultProps = {
  testID: 'ListItemID',
  title: undefined,
  subtitle: undefined,
  left: undefined,
  right: undefined,
  onPress: undefined,
  onPressOut: undefined,
  color: undefined,
  isPressable: undefined,
};
