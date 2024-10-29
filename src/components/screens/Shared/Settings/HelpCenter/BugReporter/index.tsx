import React, { memo, useRef } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { SharedParamsList } from '@navigators/Shared';
import { removeBlankSpaces, testProperties } from '@utils/functions';
import { useTheme } from '@hooks';
import { Lottie, LottieViewProps } from '@components/atoms';
import { TextInput } from '@components/molecules';
import { ButtonImagePicker } from '@components/organisms';
import { CallToAction } from '@components/templates';
import { useBugReporter } from './hooks/useBugReporter';
import {
  BodyContainer,
  LabelContainer,
  LabelText,
  StyledScrollView,
  SubDescriptionContainer,
} from './styles';

export interface BugReporterProps {
  navigation: StackNavigationProp<SharedParamsList>;
}

export const BugReporter: React.FC<BugReporterProps> = ({ navigation }) => {
  const userBugReporterHook = useBugReporter({ navigation });
  const animationRef = useRef<LottieViewProps>(null);
  const { Animations } = useTheme();

  return (
    <CallToAction
      testID="BugReporterID"
      title={'menu:helpCenter.support.items.bugReporter.title'}
      description={'menu:helpCenter.support.items.bugReporter.description'}
      numberOfLinesTitle={3}
      backButton
      body={
        <StyledScrollView>
          <BodyContainer testID="BugReporterBodyID">
            <Lottie
              ref={animationRef}
              source={Animations.working}
              autoPlay={true}
              renderMode="AUTOMATIC"
              loop={true}
              resizeMode="contain"
              width={125}
              height={125}
            />

            <SubDescriptionContainer>
              <LabelContainer>
                <LabelText type="Subtitle2" font="Primary" color="secondary700" textAlign="center">
                  {'menu:helpCenter.support.items.bugReporter.founddBug'}
                </LabelText>
              </LabelContainer>
              <TextInput
                {...testProperties('bugReporterBugDescription')}
                label={`menu:helpCenter.support.items.bugReporter.form.bugDescription.name`}
                name={'reporteBugInput'}
                multiline
                value={userBugReporterHook?.values?.bugDescription}
                error={userBugReporterHook?.errors?.bugDescription}
                touched={userBugReporterHook?.touched?.bugDescription}
                required={true}
                onBlur={userBugReporterHook.handleBlur('bugDescription')}
                maxLength={255}
                // maintainFocus={!!userBugReporterHook?.dataUser?.phonenumber_email}
                onChangeText={(text) =>
                  userBugReporterHook.handleChange('bugDescription')(removeBlankSpaces(text))
                }
                rightIconHandler={() => userBugReporterHook.clearInputHandler('bugDescription')}
                rightIcon="clear"
                editable={true}
                keyboardType={'default'}
                importantForAutofill="yes"
                textContentType={'none'}
                autoCorrect={false}
                // onSubmitEditing={focusEvidencesField}
                returnKeyType={'send'}
                returnKeyLabel={'send'}
                enablesReturnKeyAutomatically={true}
              />
              <ButtonImagePicker
                {...testProperties('bugReporterAttachMultimedia')}
                label={'menu:helpCenter.support.items.bugReporter.form.attachMultimedia.name'}
                placeholder={'menu:helpCenter.support.items.bugReporter.form.attachMultimedia.name'}
                value={userBugReporterHook?.values?.photo}
                error={userBugReporterHook?.errors?.photo}
                touched={!userBugReporterHook?.values?.photo}
                editable={true}
                required={true}
                origin={'library'}
                mediaType={'mixed'}
                selectionLimit={2}
                onSelect={(value) => userBugReporterHook.fieldValueHandler('photo', value)}
              />
            </SubDescriptionContainer>
          </BodyContainer>
        </StyledScrollView>
      }
      secondaryButton={userBugReporterHook.secondaryButton}
      primaryButton={userBugReporterHook.primaryButton}
    />
  );
};

export default memo(BugReporter);
