import React, { memo, useCallback } from 'react';
import { useCopy } from '@services';
import { SVGIcon } from '@components/atoms';
import { SettingsItemProps } from '@components/organisms/SettingsList/components/SettingsItem';
import {
  BodyContainer,
  TouchableAreaContainer,
  ContentContainer,
  ArrowContainer,
  HeaderContainer,
  TitleContainer,
  StyledTitleText,
  SubTitleContainer,
  SelectedOptionContainer,
  SelectedOptionText,
  StyledSubTitleText,
  LabelContainer,
  LeftContainer,
} from './styles';

const SettingsButton: React.FC<SettingsItemProps> = ({
  testID,
  onPress,
  title,
  leftIcon,
  rightIcon,
  description,
  selectedOption,
  remoteConfig,
}) => {
  const { getCopyValue } = useCopy();

  const onPressHandler = useCallback(() => {
    if (onPress) onPress();
  }, []);

  return (
    <BodyContainer testID={testID}>
      <TouchableAreaContainer
        onPressType="onPressIn"
        onPress={onPressHandler}
        featureFlags={[remoteConfig]}
      >
        <ContentContainer>
          <LabelContainer>
            {title && title !== '' && (
              <HeaderContainer>
                <LeftContainer>
                  {leftIcon && <SVGIcon icon={leftIcon} />}
                  {title && title !== '' && (
                    <TitleContainer leftIcon={Boolean(leftIcon)}>
                      <StyledTitleText type="Body4" weight={'bold'}>
                        {getCopyValue(title)}
                      </StyledTitleText>
                    </TitleContainer>
                  )}
                </LeftContainer>
                {selectedOption && selectedOption !== '' && (
                  <SelectedOptionContainer>
                    <SelectedOptionText weight="bold">
                      {getCopyValue(selectedOption)}
                    </SelectedOptionText>
                  </SelectedOptionContainer>
                )}
              </HeaderContainer>
            )}
            {description && (
              <SubTitleContainer>
                <StyledSubTitleText type="Caption">
                  {getCopyValue(description)}
                </StyledSubTitleText>
              </SubTitleContainer>
            )}
          </LabelContainer>
          {rightIcon && (
            <ArrowContainer>
              <SVGIcon icon={rightIcon} />
            </ArrowContainer>
          )}
        </ContentContainer>
      </TouchableAreaContainer>
    </BodyContainer>
  );
};

SettingsButton.defaultProps = {
  testID: 'SettingsButtonID',
  onPress: undefined,
  title: undefined,
  leftIcon: undefined,
  rightIcon: undefined,
  description: undefined,
  selectedOption: undefined,
};

export default memo(SettingsButton);
