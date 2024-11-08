import React, { memo, useCallback, useState } from 'react';
import { useCopy } from '@services';
import { testProperties } from '@utils/functions';
import RatingBar from './components/RatingBar';
import {
  HeaderContainer,
  RatingTitle,
  RatingDescription,
  ContentWrapper,
  StyledInput,
  ActionSubmitButton,
  ActionSkipButton,
} from './styles';
import { Keyboard } from 'react-native';

interface RatingModalParams {
  handleRating: (
    featureRequestId: string,
    rating: number,
    message?: string,
    skipped?: boolean,
  ) => Promise<void>;
  featureName: string;
  featureRequestId: string;
}

const RatingModal = ({
  handleRating,
  featureName,
  featureRequestId,
}: RatingModalParams): JSX.Element => {
  const [feedbackValue, setFeedbackValue] = useState('');
  const [defaultRating, setDefaultRating] = useState(0);
  const [tellUsMoreVisible, setTellUsMoreVisible] = useState(false);

  const { getCopyValue } = useCopy();

  const maxRating = [1, 2, 3, 4, 5];
  const quantityLimit = 100;
  const limitExceeded = feedbackValue.length > quantityLimit;

  const handlerAskMeLater = useCallback(async (): Promise<void> => {
    handleRating(featureRequestId, defaultRating, feedbackValue, true);
  }, []);

  const submitHandler = useCallback(() => {
    Keyboard.dismiss();
    handlerAskMeLater();
  }, []);

  return (
    <>
      <HeaderContainer>
        <RatingTitle type="Headline5" color={limitExceeded ? 'danger_status' : 'typography900'}>
          {tellUsMoreVisible
            ? getCopyValue('common:bottomsheets.rating.tellUsMore.title')
            : getCopyValue('common:bottomsheets.rating.howWasYourExperience.title', {
                FEATURENAME: featureName ?? '',
              })}
        </RatingTitle>
        {!tellUsMoreVisible && (
          <RatingDescription type="Body2" color={limitExceeded ? 'danger_status' : 'typography700'}>
            {getCopyValue('common:bottomsheets.rating.howWasYourExperience.description', {
              FEATURENAME: featureName ?? '',
            })}
          </RatingDescription>
        )}
      </HeaderContainer>
      {tellUsMoreVisible ? (
        <ContentWrapper>
          <StyledInput
            {...testProperties('feedback-input')}
            label={getCopyValue(`common:bottomsheets.rating.tellUsMore.placeholder`)}
            name={'tellUsMore'}
            multiline
            required={true}
            value={feedbackValue}
            maxLength={255}
            onChangeText={setFeedbackValue}
            keyboardType={'default'}
            importantForAutofill="yes"
            textContentType={'none'}
            rightIcon="clear"
            autoCorrect={false}
            onSubmitEditing={submitHandler}
            returnKeyType={'send'}
            returnKeyLabel={'send'}
            enablesReturnKeyAutomatically={true}
          />
          <ActionSubmitButton
            {...testProperties('action-submit-button')}
            type="Button"
            widthButton="100%"
            title={getCopyValue('common:bottomsheets.rating.tellUsMore.sumbitButton')}
            onPressAsync={async () => {
              handleRating(featureRequestId, defaultRating, feedbackValue);
            }}
            buttonTheme="Primary"
            disabled={limitExceeded}
          />
        </ContentWrapper>
      ) : (
        <RatingBar
          maxRating={maxRating}
          feedbackValue={feedbackValue}
          defaultRating={defaultRating}
          setDefaultRating={setDefaultRating}
          setTellUsMoreVisible={setTellUsMoreVisible}
        />
      )}
      <ActionSkipButton
        {...testProperties('rating-skip-button')}
        type="Text"
        widthButton="100%"
        title="common:bottomsheets.rating.skipButton"
        onPressAsync={() => handlerAskMeLater()}
        buttonTheme="Secondary"
      />
    </>
  );
};

export default memo(RatingModal);
