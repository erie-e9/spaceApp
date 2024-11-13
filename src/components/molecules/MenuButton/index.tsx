import React, { memo, useCallback } from 'react';
import { type SettingsRenderItemProps } from '@types';
import { testProperties } from '@utils/functions';
import { SVGIcon } from '@components/atoms';
import {
  BodyContainer,
  TouchableAreaContainer,
  ContentContainer,
  HeaderContainer,
  TitleContainer,
  StyledTitleText,
  SubTitleContainer,
  SelectedOptionContainer,
  SelectedOptionText,
  StyledSubTitleText,
  LabelContainer,
  LeftContainer,
  LeftIconContainer,
  ArrowContainer,
  RightBodyContainer,
  RightContainer,
} from './styles';

const MenuButton: React.FC<SettingsRenderItemProps> = ({
  testID = 'MenuButtonID',
  onPress = undefined,
  title = undefined,
  leftIcon = undefined,
  rightIcon = undefined,
  description = undefined,
  selectedOption = undefined,
  remoteFeatureFlags,
  disabled,
  rightBody,
  hasParent,
}) => {
  const onPressHandler = useCallback(() => {
    if (onPress) onPress();
  }, []);

  return (
    <BodyContainer {...testProperties(testID)}>
      <TouchableAreaContainer
        onPressType="onPress"
        onPress={onPressHandler}
        remoteFeatureFlags={remoteFeatureFlags}
        disabled={disabled}
      >
        <ContentContainer>
          <LabelContainer>
            {title && title !== '' && (
              <HeaderContainer>
                <LeftContainer>
                  {leftIcon && (
                    <LeftIconContainer leftPadding={hasParent}>
                      <SVGIcon icon={leftIcon} />
                    </LeftIconContainer>
                  )}

                  {title && title !== '' && (
                    <TitleContainer leftIcon={!!leftIcon}>
                      <StyledTitleText
                        type={hasParent ? 'Body3' : 'Subtitle1'}
                        color="typography950"
                      >
                        {title}
                      </StyledTitleText>

                      {description && (
                        <SubTitleContainer>
                          <StyledSubTitleText type="Label" font="Primary" color="typography700">
                            {description}
                          </StyledSubTitleText>
                        </SubTitleContainer>
                      )}
                    </TitleContainer>
                  )}
                </LeftContainer>
                {(rightBody || rightIcon || selectedOption) && (
                  <RightContainer>
                    {rightIcon && !rightBody && !selectedOption && (
                      <ArrowContainer>
                        <SVGIcon icon={rightIcon} />
                      </ArrowContainer>
                    )}
                    {!rightIcon && rightBody && !selectedOption && (
                      <RightBodyContainer>{rightBody}</RightBodyContainer>
                    )}
                    {!rightIcon && !rightBody && selectedOption && (
                      <SelectedOptionContainer>
                        <SelectedOptionText type="Body3" color="typography950">
                          {selectedOption}
                        </SelectedOptionText>
                      </SelectedOptionContainer>
                    )}
                  </RightContainer>
                )}
              </HeaderContainer>
            )}
          </LabelContainer>
        </ContentContainer>
      </TouchableAreaContainer>
    </BodyContainer>
  );
};

export default memo(MenuButton);
