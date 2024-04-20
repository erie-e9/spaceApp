import React, { memo } from 'react';
import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import { useCopy } from '@services';
import { BackButton } from '@components/molecules';
import { InfoAndSupportParamsList } from '@components/screens/Shared/Settings/InfoAndSupport';
import { AppPreferences } from '@components/screens/Shared/Settings/AppPreferences';
import { InfoAndSupportMenu } from '@components/screens/Shared/Settings/InfoAndSupport/InfoAndSupportMenu';
import { ContactUs } from '@components/screens/Shared/Settings/InfoAndSupport/ContactUs';
import { FAQs } from '@components/screens/Shared/Settings/InfoAndSupport/FAQs';
import { Info } from '@components/screens/Shared/Settings/InfoAndSupport/Info';
import { ApplicationStackParamList } from '@utils/@types/navigation';

export type SettingsParamsList = {
  AppPreferences: undefined;
  InfoAndSupport: undefined;
} & InfoAndSupportParamsList;

const { Navigator, Screen } = createStackNavigator<ApplicationStackParamList>();

export const SettingsNavigator = (): React.JSX.Element => {
  const { getCopyValue } = useCopy();

  return (
    <Navigator
      screenOptions={{
        animationEnabled: true,
        headerShown: !true,
        freezeOnBlur: true,
        headerMode: 'screen',
        headerBackTitleVisible: true,
        headerTitleAlign: 'center',
        headerTransparent: true,
        ...TransitionPresets.SlideFromRightIOS,
        headerLeft: () => <BackButton />,
      }}
    >
      <Screen
        key="AppPreferences"
        name="AppPreferences"
        component={AppPreferences}
        options={{
          title: getCopyValue('settings:settings.screenTitle'),
          headerShown: true,
          headerTitleStyle: {
            fontSize: 16,
            textAlign: 'center',
          },
        }}
      />
      <Screen
        key="ContactUs"
        name="ContactUs"
        component={ContactUs}
        options={{
          title: getCopyValue(
            'settings:infoAndSupport.support.items.contactUs.title',
          ),
          headerShown: true,
          headerTitleStyle: {
            fontSize: 16,
            textAlign: 'center',
          },
        }}
      />
      <Screen
        key="FAQs"
        name="FAQs"
        component={FAQs}
        options={{
          title: getCopyValue(
            'settings:infoAndSupport.support.items.faqs.title',
          ),
          headerShown: true,
          headerTitleStyle: {
            fontSize: 16,
            textAlign: 'center',
          },
        }}
      />
      <Screen
        key="Info"
        name="Info"
        component={Info}
        options={{
          headerShown: true,
          headerTitleStyle: {
            fontSize: 16,
            textAlign: 'center',
          },
        }}
      />
      <Screen
        key="InfoAndSupportMenu"
        name="InfoAndSupportMenu"
        component={InfoAndSupportMenu}
        options={{
          title: getCopyValue('settings:infoAndSupport.screenTitle'),
          headerShown: true,
          headerTitleStyle: {
            fontSize: 16,
            textAlign: 'center',
          },
        }}
      />
    </Navigator>
  );
};

export default memo(SettingsNavigator);
