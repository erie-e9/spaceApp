import React from 'react';
import styled from 'styled-components/native';
import CardHeader from './cardHeader';
import CardBody from './cardBody';
import CardBottom from './cardBottom';

const Root = styled.View`
    minHeight: 190px;
    backgroundColor: ${props => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
    width: 345px;
    minWidth: 345px;
    maxWidth: 345px;
    padding: 10px;
    shadowColor: ${props => props.theme.THIRD_BACKGROUND_COLOR};
    shadowOpacity: 0.25;
    shadowRadius: 2px;
    elevation: 5;
    marginVertical: 2px;
    borderTopWidth: 3px;
    marginVertical: 7px;
    borderRadius: 5px;
`;

const ETACard = ( props ) => {
    return (
        <Root
            style={{
                borderTopColor: props.status === 1 ? 'green' : 'red'
            }}>
            <CardHeader creditid={props.creditid} status={props.status} />
            <CardBody {...props}/>
            {
                props.status === 1
                ? <CardBottom />
                : null
            }
        </Root>
    );
}

export default ETACard;