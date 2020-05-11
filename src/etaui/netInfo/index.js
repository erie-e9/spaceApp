import React, {useState, useEffect, useContext} from 'react';
import {ActivityIndicator} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import styled, {ThemeContext} from 'styled-components/native';
import {ETASimpleText} from '@etaui';

const Root = styled.SafeAreaView`
  flexDirection: row;
  justifyContent: center;
  alignItems: center;
  backgroundColor: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
  paddingVertical: 10px;
`;

const ETANetInfo = () => {
  const [isInternetReachable, setisInternetReachable] = useState(true);
  const themeContext = useContext(ThemeContext);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setisInternetReachable(state.isInternetReachable);
      console.log('isInternetReachable: ', state.isInternetReachable);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (isInternetReachable) {
    return null;
  }

  return (
    <Root>
      <ETASimpleText
        size={14}
        weight="400"
        color={themeContext.PRIMARY_TEXT_BACKGROUND_COLOR}
        align={'center'}>
        No internet, connecting {'  '}
      </ETASimpleText>
      <ActivityIndicator
        size="small"
        color={themeContext.PRIMARY_TEXT_BACKGROUND_COLOR}
      />
    </Root>
  );
};

export default ETANetInfo;
