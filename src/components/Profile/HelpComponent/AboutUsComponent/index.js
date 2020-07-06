import React, {useContext} from 'react';
import {Dimensions} from 'react-native';
import styled, {ThemeContext} from 'styled-components/native';
import GeneralHeadComponent from '../GeneralHeadComponent';
import SubHeadAboutUsComponent from './SubHeadAboutUsComponent';

const {width} = Dimensions.get('window');

const Root = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
`;

const AboutUsComponent = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <Root>
      <GeneralHeadComponent imagePath={require('@assets/icons/app-icon.png')}/>
      <SubHeadAboutUsComponent />
    </Root>
  );
}

export default React.memo(AboutUsComponent);
