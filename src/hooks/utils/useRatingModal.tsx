import React, { useCallback } from 'react';
import { Logger } from '@services';
import { useModal, useToast } from '@hooks';
import RatingModal from '@components/molecules/RatingModal';

interface Props {
  navigation: any;
}

const useRatingModal = ({
  navigation,
}: Props): {
  ratingModal: ({ feature_name, feedback_request_id }: any) => void;
  handleAppRatingPushNotification: (payload: any) => Promise<void>;
} => {
  // Global Hooks
  const { showModal, hideModal } = useModal();

  // Local Functions

  const handleRating = async (
    featureRequestId: string,
    rating: number,
    message = '',
    skipped = false,
  ): Promise<void> => {
    try {
      hideModal();
      if (!skipped) {
        useToast.success({
          message: 'common:bottomsheets.rating.toast.success.title',
          duration: 3000,
        });
      }
    } catch (error: unknown) {
      Logger.log('Error', error);
      throw Error(error as undefined);
    }
  };

  const ratingModal = async ({ feature_name, feedback_request_id }: any): Promise<void> => {
    showModal({
      type: 'bottomsheet',
      title: '',
      lockBackdrop: true,
      expandible: true,
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
  };

  const handleAppRatingPushNotification = useCallback(async (payload: any) => {
    const { feature_name, feedback_request_id } = payload;
    try {
      ratingModal({ feature_name, feedback_request_id });
    } catch (error) {
      useToast.success({
        message: 'error we',
      });
    }
  }, []);

  return { ratingModal, handleAppRatingPushNotification };
};

export { useRatingModal };
