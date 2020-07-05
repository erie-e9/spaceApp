import React, {useContext} from 'react';
import {Dimensions} from 'react-native';
import styled, {ThemeContext} from 'styled-components/native';
import GeneralHeadComponent from '../GeneralHeadComponent';
import SubHeadContactUsComponent from './SubHeadContactUsComponent';

const {width} = Dimensions.get('window');

const Root = styled.View`
  flex: 1;
  flexDirection: column;
  alignItems: center;
  backgroundColor: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
`;
const Scroll = styled.ScrollView`
  flex: 1
`;

const ContactUsComponent = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <Root>
      <GeneralHeadComponent imagePath={require('@assets/icons/app-icon.png')}/>
      <Scroll>
        <SubHeadContactUsComponent />
      </Scroll>
    </Root>
  );
}

export default React.memo(ContactUsComponent);
