import { BackHandler } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export const useBlockScreen = () => {
  const navigation = useNavigation();
  useFocusEffect(() => {
    const onBackPress = (): boolean => {
      return true;
    };

    // Android back hardware action handler
    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    // iOS back hardware action handler
    navigation.addListener('beforeRemove', e => {
      e.preventDefault();
    });

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  });
};
