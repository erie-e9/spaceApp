import React from 'react';
import styled from 'styled-components/native';
import GeneralHeadComponent from '../GeneralHeadComponent';
import SubHeadContactUsComponent from './SubHeadContactUsComponent';

const Root = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
`;
const Scroll = styled.ScrollView`
  flex: 1;
`;

const ContactUsComponent = () => {
  return (
    <Root>
      <GeneralHeadComponent imagePath={require('@assets/icons/app-icon.png')} />
      <Scroll>
        <SubHeadContactUsComponent />
      </Scroll>
    </Root>
  );
};

export default React.memo(ContactUsComponent);
