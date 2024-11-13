import { Dispatch, memo, SetStateAction, useCallback } from 'react';
import { SVGIcon } from '@components/atoms';
import { RatingBarContainer, RatingButton } from '../styles';

interface RatingBarProps {
  maxRating: Array<number>;
  feedbackValue: string;
  defaultRating: number;
  setDefaultRating: Dispatch<SetStateAction<number>>;
  setTellUsMoreVisible: Dispatch<SetStateAction<boolean>>;
}

const RatingBar = ({
  maxRating,
  feedbackValue,
  defaultRating,
  setDefaultRating,
  setTellUsMoreVisible,
}: RatingBarProps): React.ReactElement => {
  const ratingHandler = useCallback(
    (score: number) => {
      setDefaultRating(score);
      setTimeout(async () => {
        await setTellUsMoreVisible(true);
      }, 1000);
    },
    [feedbackValue, setDefaultRating],
  );

  return (
    <RatingBarContainer>
      {maxRating.map((score) => {
        return (
          <RatingButton key={score} onPress={() => ratingHandler(score)}>
            {score <= defaultRating ? <SVGIcon icon="starfilled" /> : <SVGIcon icon="star" />}
          </RatingButton>
        );
      })}
    </RatingBarContainer>
  );
};

export default memo(RatingBar);
