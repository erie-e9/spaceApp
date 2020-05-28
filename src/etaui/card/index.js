import React from 'react';
import styled from 'styled-components/native';
import CardHeader from './cardHeader';
import CardBody from './cardBody';
// import CardBottom from './cardBottom';

const Root = styled.View`
  minHeight: 100px;
  backgroundColor: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
  width: 100%;
  minWidth: 100%;
  maxWidth: 100%;
  paddingHorizontal: 15px;
  paddingVertical: 5px;
  shadowColor: ${(props) => props.theme.SECONDARY_BACKGROUND_COLOR};
  marginVertical: 0.5px;
`;

const ETACard = ({text, client, createdAt, favoriteCount}) => {
  return (
    <Root>
      <CardHeader {...client} createdAt={createdAt} />
      <CardBody text={text} />
      {/* {
                props.status === 1
                ? <CardBottom />
                : null
            } */}
    </Root>
  );
};

export default ETACard;
