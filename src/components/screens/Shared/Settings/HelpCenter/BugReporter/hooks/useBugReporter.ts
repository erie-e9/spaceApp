import { useCallback, useMemo } from 'react';
import { useFormik } from 'formik';
import { Logger } from '@services';
import { useResponseHandler, useTheme } from '@hooks';
import { trimValues } from '@utils/functions';
import { HelpCenterParamsList } from '@components/screens/Shared';
import { formSchemas } from '@utils/forms/validators/schemas';
import { BugReporterProps } from '..';

export const useBugReporter = ({ navigation }: BugReporterProps) => {
  const { darkMode } = useTheme();
  const { loading, setLoading } = useResponseHandler();
  const { bugReporterSchema } = formSchemas();

  const formik = useFormik({
    initialValues: {
      bugDescription: '',
      photo: null,
    },
    validationSchema: bugReporterSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      try {
        const cleanedValues = trimValues(values);
        Logger.log('useBugReporter formik', { cleanedValues });
      } catch (error) {
        Logger.log('onSubmit catch', { error });
      } finally {
        await setLoading(false);
      }
    },
  });

  const clearInputHandler = useCallback(
    (field: string) => formik.setFieldValue(field, ''),
    [formik],
  );

  const fieldValueHandler = useCallback(
    (elementName: string, value: any) => {
      formik.setFieldValue(elementName, value);
    },
    [formik],
  );

  const navigateToScreen = useCallback(
    (screen: keyof HelpCenterParamsList) => {
      navigation.navigate(screen);
    },
    [navigation],
  );

  const secondaryButtonHandler = useCallback((): void => {
    // navigation.navigate('HelpCenter', { screen: 'ContactUs' } as never);
    navigation.navigate('ContactUs');
  }, [formik.errors, loading]);

  const secondaryButton = useMemo(() => {
    return {
      testID: 'bugReporterSecondaryButton',
      title: 'menu:helpCenter.support.items.contactUs.title',
      disabled: loading,
      loading: loading,
      onPress: secondaryButtonHandler,
    };
  }, [loading, darkMode]);

  const primaryButtonHandler = useCallback((): void => {
    // setLoading(!loading);
    formik.handleSubmit();
  }, [formik.errors, loading]);

  const primaryButton = useMemo(() => {
    return {
      testID: 'bugReporterPrimaryButton',
      title: 'menu:helpCenter.support.items.bugReporter.form.primaryButton',
      textColor: darkMode ? 'tertiary50' : 'secondary950',
      disabled: loading,
      loading: loading,
      onPress: primaryButtonHandler,
    };
  }, [loading, darkMode]);

  return {
    ...formik,
    clearInputHandler,
    fieldValueHandler,
    navigateToScreen,
    secondaryButton,
    primaryButton,
  };
};
