import React from 'react';
import styled from 'styled-components/native';
import OrderCardHeader from './OrderCardHeader';
import OrderCardBottom from './OrderCardBottom';

const Root = styled.View`
    minHeight: 180;
    backgroundColor: ${props => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
    width: 100%;
    padding: 7px;
    shadowColor: ${props => props.theme.SECONDARY_BACKGROUND_COLOR};
    shadowOffset: 0px 2px;
    shadowRadius: 2;
    shadowOpacity: 0.1;
    marginVertical: 2;
`;
const OrderContentContainer = styled.View`
    flex: 1;
    padding: 10px 20px 10px 0px;
`;
const OrderContentText = styled.Text`
    fontSize: 14;
    textAlign: left;
    fontWeight: 500;
    paddingHorizontal: 10;
    color: #656e77
`;

const OrderCard = ({ text, client, createdAt, favoriteCount }) => {
    return(
        <Root>
            <OrderCardHeader {...client} createdAt={createdAt}/>
            <OrderContentContainer>
                <OrderContentText>
                    {text}
                </OrderContentText>
            </OrderContentContainer>    
            <OrderCardBottom  favoriteCount={favoriteCount}/>
        </Root>
    );
}

export default OrderCard;