import React from 'react';
import styled from 'styled-components/native';
import {ETAAvatar} from '@etaui';
import CardHeader from './cardHeader';
// import CardBody from './cardBody';

const Root = styled.View`
  flexDirection: row;
  width: 100%;
  minWidth: 100%;
  maxWidth: 100%;
  minHeight: 100px;
  backgroundColor: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
  paddingHorizontal: 15px;
  marginVertical: 0.5px;
  shadowColor: ${(props) => props.theme.SECONDARY_BACKGROUND_COLOR};
  alignItems: center;
`;
const AvatarContainer = styled.View``;

const ChatCard = ({text, employee, createdAt, favoriteCount}) => {
  return (
    <Root>
      <AvatarContainer>
        <ETAAvatar size="middle" />
      </AvatarContainer>
      <CardHeader {...employee} createdAt={createdAt} />
      {/* <CardBody text={text}/> */}
    </Root>
  );
};

export default ChatCard;
