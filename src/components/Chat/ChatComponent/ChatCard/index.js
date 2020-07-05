import React from 'react';
import styled from 'styled-components/native';
import {ETAAvatar} from '@etaui';
import CardHeader from './cardHeader';
import CardBody from './cardBody';

const Root = styled.View`
  flexDirection: row;
  paddingHorizontal: 15px;
  shadowColor: ${(props) => props.theme.SECONDARY_BACKGROUND_COLOR};
  alignItems: center;
  width: 100%;
  minWidth: 100%;
  maxWidth: 100%;
  backgroundColor: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
  `;
  // backgroundColor: transparent;
const ContactContainer = styled.View`
  flexDirection: column;
  minHeight: 70px;
  width: 100%;
  minWidth: 100%;
  maxWidth: 100%;
`;
const AvatarContainer = styled.View`
  padding: 2px;
  borderRadius: 50px;
  backgroundColor: transparent;
`;

const ChatCard = ({text, employee, createdAt}) => {

  return (
    <Root>
      <AvatarContainer>
        <ETAAvatar image={employee.avatar} size='middle' />
      </AvatarContainer>
      <ContactContainer>
        <CardHeader {...employee} createdAt={createdAt} />
        <CardBody text={text}/>
      </ContactContainer>
    </Root>
  );
};

export default ChatCard;
