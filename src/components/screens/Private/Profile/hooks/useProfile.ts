import { useCallback, useMemo } from 'react';
import { useTheme } from 'styled-components';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { type UserState } from '@slices/types';
import { type ApplicationScreenProps, type MenuItemProps } from '@types';
import { labels } from '@utils/forms/labels';
import { useAuthenticationHook, useModal, useResponseHandler } from '@hooks';

export const useProfile = (): {
  user: UserState;
  listItemsSection1: Array<MenuItemProps>;
  listItemsSection2: Array<MenuItemProps>;
  listItemsSection3: Array<MenuItemProps>;
  primaryButton: {
    title: string;
    onPress: () => Promise<void>;
    testID: string;
    disabled?: boolean;
    loading?: boolean;
  };
} => {
  const theme = useTheme();
  const isFocused = useIsFocused();
  const { showModal, hideModal } = useModal();
  const navigation: ApplicationScreenProps = useNavigation();
  const { user, removeToken, removeUser } = useAuthenticationHook();
  const { loading, setLoading } = useResponseHandler();
  const { genres } = labels();

  const genreLabel = useMemo(
    () => genres.find((option: { value: any }) => option.value === user?.genre)?.label,
    [],
  );

  const editFieldHandler = useCallback(
    ({ fieldId, fieldName }: { fieldId: string; fieldName: string }) => {
      navigation.navigate('FieldEditor', { fieldId, fieldName } as never);
    },
    [],
  );

  const listItemsSection1 = useMemo(() => {
    return [
      {
        title: 'profile:Profile.section1.title',
        items: [
          {
            testID: 'username',
            rightIcon: 'edit',
            title: 'profile:Profile.section1.fields.username',
            description: `${user.username}`,
            onPress: () =>
              editFieldHandler({
                fieldId: 'username',
                fieldName: 'profile:Profile.section1.fields.username',
              }),
            remoteFeatureFlags: ['editUsername'],
          },
          {
            testID: 'phoneNumber',
            rightIcon: 'lock',
            title: 'profile:Profile.section1.fields.phoneNumber',
            description: `${user.phoneNumber}`,
            onPress: () =>
              editFieldHandler({
                fieldId: 'phoneNumber',
                fieldName: 'profile:Profile.section1.fields.phoneNumber',
              }),
            remoteFeatureFlags: ['editPhoneNumber'],
            disabled: true,
          },
          {
            testID: 'email',
            rightIcon: 'edit',
            title: 'profile:Profile.section1.fields.email',
            description: user.email || 'profile:Profile.section1.fields.noEmail',
            onPress: () =>
              editFieldHandler({
                fieldId: 'email',
                fieldName: 'profile:Profile.section1.fields.email',
              }),
            remoteFeatureFlags: ['editEmail'],
          },
        ],
      },
    ];
  }, [isFocused]);

  const listItemsSection2 = useMemo(() => {
    return [
      {
        title: 'profile:Profile.section2.title',
        items: [
          {
            testID: 'fullname',
            rightIcon: 'edit',
            title: 'profile:Profile.section2.fields.fullName',
            description: `${user.firstName} ${user.lastName}`,
            onPress: () =>
              editFieldHandler({
                fieldId: 'fullname',
                fieldName: 'profile:Profile.section2.fields.fullName',
              }),
            remoteFeatureFlags: ['editFullName'],
          },
          {
            testID: 'dateOfBirth',
            rightIcon: 'edit',
            title: 'profile:Profile.section2.fields.dateOfBirth',
            description: `${user.dateOfBirth}`,
            onPress: () =>
              editFieldHandler({
                fieldId: 'dateOfBirth',
                fieldName: 'profile:Profile.section2.fields.dateOfBirth',
              }),
            remoteFeatureFlags: ['editDateOfBirth'],
          },
          {
            testID: 'genre',
            rightIcon: 'edit',
            title: 'profile:Profile.section2.fields.genre',
            description: `${genreLabel}`,
            onPress: () =>
              editFieldHandler({
                fieldId: 'genre',
                fieldName: 'profile:Profile.section2.fields.genre',
              }),
            remoteFeatureFlags: ['editGenre'],
          },
        ],
      },
    ];
  }, []);

  const listItemsSection3 = useMemo(() => {
    return [
      {
        title: 'profile:Profile.section3.title',
        items: [
          {
            testID: 'address',
            rightIcon: 'edit',
            title: 'profile:Profile.section3.fields.address',
            description: `${user.streetAddressLine1} ${user.streetAddressLine2 || ''}`,
            onPress: () =>
              editFieldHandler({
                fieldId: 'address',
                fieldName: 'profile:Profile.section3.fields.address',
              }),
            remoteFeatureFlags: ['editAddress'],
          },
          {
            testID: 'zipCode',
            rightIcon: 'edit',
            title: 'profile:Profile.section3.fields.zipCode',
            description: `${user.zipCode}`,
            onPress: () =>
              editFieldHandler({
                fieldId: 'zipCode',
                fieldName: 'profile:Profile.section3.fields.zipCode',
              }),
            remoteFeatureFlags: ['editZipCode'],
          },
          {
            testID: 'city',
            rightIcon: 'edit',
            title: 'profile:Profile.section3.fields.city',
            description: `${user.city}`,
            onPress: () =>
              editFieldHandler({
                fieldId: 'city',
                fieldName: 'profile:Profile.section3.fields.city',
              }),
            remoteFeatureFlags: ['editCity'],
          },
          {
            testID: 'country',
            rightIcon: 'edit',
            title: 'profile:Profile.section3.fields.country',
            description: `${user.country}`,
            onPress: () =>
              editFieldHandler({
                fieldId: 'country',
                fieldName: 'profile:Profile.section3.fields.country',
              }),
            remoteFeatureFlags: ['editCountry'],
          },
        ],
      },
    ];
  }, []);

  const primaryButtonHandler = useCallback(async (): Promise<void> => {
    await setLoading(true);
    await showModal({
      type: 'alert',
      title: 'profile:Profile.alerts.deleteAccount.title',
      description: 'profile:Profile.alerts.deleteAccount.description',
      showCancelIcon: true,
      buttonsStyles: {
        direction: 'row',
        alignment: 'right',
      },
      lockBackdrop: true,
      options: [
        {
          text: 'profile:Profile.alerts.deleteAccount.options.cancelButton',
          handler: async () => {
            await hideModal();
            await setLoading(false);
          },
          isSimpleButton: true,
          color: 'secondary950',
        },
        {
          text: 'profile:Profile.alerts.deleteAccount.options.confirmButton',
          handler: async () => {
            await setLoading(false);
            await removeToken();
            await removeUser();
            await hideModal();
          },
          isSimpleButton: true,
          color: 'danger_status',
        },
      ],
    });
  }, [loading]);

  const primaryButton = useMemo(() => {
    return {
      testID: 'profilePrimaryButton',
      title: `profile:Profile.buttons.deleteAccount`,
      disabled: loading,
      loading: loading,
      buttonTheme: 'Secondary',
      // type: 'Text',
      style: {
        borderColor: theme.tokens.colors.danger_status,
      },
      remoteFeatureFlags: ['deleteAccount'],
      textColor: 'danger_status',
      onPress: primaryButtonHandler,
    };
  }, [loading]);

  return {
    user,
    listItemsSection1,
    listItemsSection2,
    listItemsSection3,
    primaryButton,
  };
};
