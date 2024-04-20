import React, { memo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useCopy } from '@services';
import { BackButton } from '@components/molecules';
import { InfoAndSupportMenu } from '@components/screens/Shared/Settings/InfoAndSupport/InfoAndSupportMenu';
import { ContactUs } from '@components/screens/Shared/Settings/InfoAndSupport/ContactUs';
import { FAQs } from '@components/screens/Shared/Settings/InfoAndSupport/FAQs';
import { Info } from '@components/screens/Shared/Settings/InfoAndSupport/Info';
import { ApplicationStackParamList } from '@utils/@types/navigation';

export type infoType = 'aboutUs' | 'noticeOfPrivacy' | 'termsAndConditions';

export type InfoAndSupportParamsList = {
  ContactUs: undefined;
  FAQs: undefined;
  Info: {
    type: infoType;
  };
  InfoAndSupportMenu: undefined;
};

const { Navigator, Screen } = createStackNavigator<ApplicationStackParamList>();

export const InfoAndSupportNavigator = (): React.JSX.Element => {
  const { getCopyValue } = useCopy();

  return (
    <Navigator
      initialRouteName="InfoAndSupportMenu"
      screenOptions={{
        animationEnabled: true,
        headerLeft: () => <BackButton />,
        headerShown: !true,
        headerTitleStyle: {
          fontSize: 16,
          textAlign: 'center',
        },
      }}
    >
      <Screen
        key="ContactUs"
        name="ContactUs"
        component={ContactUs}
        options={{
          title: getCopyValue(
            'settings:infoAndSupport.support.items.contactUs',
          ),
        }}
      />
      <Screen
        key="FAQs"
        name="FAQs"
        component={FAQs}
        options={{
          title: getCopyValue('settings:infoAndSupport.support.items.faqs'),
        }}
      />
      <Screen key="Info" name="Info" component={Info} />
      <Screen
        key="InfoAndSupportMenu"
        name="InfoAndSupportMenu"
        component={InfoAndSupportMenu}
        options={{
          title: getCopyValue('settings:infoAndSupport.screenTitle'),
        }}
      />
    </Navigator>
  );
};

export default memo(InfoAndSupportNavigator);
