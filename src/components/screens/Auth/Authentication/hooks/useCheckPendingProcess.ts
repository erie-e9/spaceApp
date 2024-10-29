import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useModal, useAuthenticationHook } from '@hooks';

export const useCheckPendingProcess = () => {
  const { showModal, hideModal } = useModal();
  const { user, storeUser, removeUser } = useAuthenticationHook();
  const navigation = useNavigation();

  const fillFormHandler = useCallback(
    async (
      isPrefilledForm: boolean,
      phoneNumberOrEmail: string,
      email?: string,
      continueForm?: boolean,
    ): Promise<void> => {
      if (!isPrefilledForm) {
        if (!continueForm) await removeUser();
        storeUser({
          phoneNumber: phoneNumberOrEmail,
          email: continueForm && user.email ? user.email : email,
          signUpMethod: continueForm && user.signUpMethod ? user.signUpMethod : 'form',
        });
      }
      await hideModal();
      navigation.navigate('Auth', { screen: 'SignUp' } as never);
    },
    [user.signUpMethod],
  );

  const checkPendingFormAlert = useCallback(
    async (phoneNumberOrEmail: string, email?: string): Promise<void> => {
      if (
        (user.phoneNumber === phoneNumberOrEmail && user.username && !user.loggedOnDevice) ||
        (user.email === email && user.signUpMethod === 'socialMedia' && user.phoneNumber)
      ) {
        await hideModal();
        await showModal({
          title: 'signup:SignUp.alerts.signUpPending.title',
          description: 'signup:SignUp.alerts.signUpPending.description',
          type: 'alert',
          buttonsStyles: { alignment: 'left', direction: 'row' },
          options: [
            {
              text: 'signup:SignUp.alerts.signUpPending.buttons.buttonOne',
              handler: async () => {
                await removeUser(); // if doesn't resume process remove data
                await fillFormHandler(false, phoneNumberOrEmail, email);
              },
              isSimpleButton: true,
            },
            {
              text: 'signup:SignUp.alerts.signUpPending.buttons.buttonTwo',
              handler: () => fillFormHandler(false, phoneNumberOrEmail, email, true),
              isSimpleButton: false,
            },
          ],
        });
      } else {
        await removeUser(); // if data doesn't match clear if exits.
        await fillFormHandler(false, phoneNumberOrEmail, email);
      }
    },
    [user],
  );

  return {
    checkPendingFormAlert,
  };
};
