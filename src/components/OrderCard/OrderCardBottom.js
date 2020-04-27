import React from 'react';
import styled from 'styled-components/native';

const isFavorite = false;
const iconSize = 20;

const Root = styled.View`
    height: 40;
    flexDirection: row;
`;
const Button = styled.TouchableWithoutFeedback`
    flex: 1;
    flexDirection: row;
    alignItems: center;
    justifyContent: space-around;
    paddingHorizontal: 32px;
`;
const ButtonText = styled.Text`
    fontSize: 14;
    fontWeight: 500;
    color: ${props => props.theme.SECONDARY_BACKGROUND_COLOR_LIGHT}
`;

const OrderCardBottom = ({ favoriteCount }) => {
    return(
        <Root>
            <Button>
                {/* <SimpleLineIcons name="bubble" size={iconSize} color={colors.LIGHT_GRAY}/> */}
                <ButtonText>
                    {favoriteCount}
                </ButtonText>    
            </Button>    
            <Button>
                {/* <Entypo name="retweet" size={iconSize} color={colors.LIGHT_GRAY}/> */}
                <ButtonText>
                    {favoriteCount}
                </ButtonText>    
            </Button>    
            <Button>
                {/* <Ionicons name="ios-heart" size={iconSize} color={isFavorite ? 'red' : colors.LIGHT_GRAY}/> */}
                <ButtonText>
                    {favoriteCount}
                </ButtonText>    
            </Button>    
        </Root>
    );
}

export default OrderCardBottom;