import React from 'react';
import styled from 'styled-components/native';
import CardHeader from './cardHeader';
import CardBody from './cardBody';
// import CardBottom from './cardBottom';

const Root = styled.View`
    minHeight: 180px;
    backgroundColor: ${props => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
    minWidth: 350px;
    maxWidth: 350px;
    paddingHorizontal: 10px;
    paddingVertical: 5px;
    shadowColor: ${props => props.theme.SECONDARY_BACKGROUND_COLOR};
    shadowOffset: 0px 2px;
    shadowRadius: 2px;
    shadowOpacity: 0.1;
    borderRadius: 5px;
    marginVertical: 2px;
`;

const ETACard = ({ text, client, createdAt, favoriteCount }) => {
    return (
        <Root>
            <CardHeader {...client} createdAt={createdAt} />
            <CardBody text={text}/>
            {/* {
                props.status === 1
                ? <CardBottom />
                : null
            } */}
        </Root>
    );
}

export default ETACard;