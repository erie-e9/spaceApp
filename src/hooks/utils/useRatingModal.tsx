import React, { useCallback } from 'react';
import { Logger } from '@services';
import { useModal, useToast } from '@hooks';
import RatingModal from '@components/molecules/RatingModal';

interface RatingModalProps {
  feature_name: string;
  feedback_request_id: string;
}

const useRatingModal = (): {
  ratingModal: ({ feature_name, feedback_request_id }: RatingModalProps) => void;
  handleAppRatingPushNotification: (payload: any) => Promise<void>;
} => {
  // Global Hooks
  const { showModal, hideModal } = useModal();

  // Local Functions
  const handleRating = useCallback(
    async (
      featureRequestId: string,
      rating: number,
      feedback = '',
      skipped = false,
    ): Promise<void> => {
      try {
        hideModal();
        if (!skipped) {
          Logger.log('rating submitted: ', { featureRequestId, rating, feedback });
          useToast.success({
            message: 'common:bottomsheets.rating.toast.success.title',
            duration: 3000,
          });
        }
      } catch (error: unknown) {
        Logger.log('Error', error);
        throw Error(error as undefined);
      }
    },
    [hideModal],
  );

  const ratingModal = useCallback(
    async ({ feature_name, feedback_request_id }: RatingModalProps): Promise<void> => {
      showModal({
        type: 'bottomsheet',
        title: '',
        lockBackdrop: true,
        expandable: true,
        dropdownOptions: {
          height: 300,
        },
        body: (
          <RatingModal
            handleRating={handleRating}
            featureName={feature_name}
            featureRequestId={feedback_request_id}
          />
        ),
      });
    },
    [handleRating, showModal],
  );

  const handleAppRatingPushNotification = useCallback(
    async (payload: any) => {
      const { feature_name, feedback_request_id } = payload;
      try {
        ratingModal({ feature_name, feedback_request_id });
      } catch (error: any) {
        useToast.success({
          message: error,
        });
      }
    },
    [ratingModal],
  );

  return { ratingModal, handleAppRatingPushNotification };
};

export { useRatingModal };
