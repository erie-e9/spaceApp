import React from 'react';
import styled from 'styled-components/native';
// import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
// import eoLocale from 'date-fns/locale/es';
import { fakeavatar } from '@utils/constants'

const avatarSize = 45;
const avatarRadius = avatarSize / 2;

const Root = styled.View`
    height: 50;
    flexDirection: row;
    alignItems: center;
`;
const AvatarContainer = styled.View`
    flex:0.2
    paddingLeft: 5;
    justifyContent: center;
    alignSelf: stretch;
`;
const Avatar = styled.Image`
    height: ${avatarSize};
    width: ${avatarSize};
    borderRadius: ${avatarRadius};
`;
const MetaContainer = styled.View`
    flex:1;
    alignSelf: stretch;
    marginTop: 5
`;
const MetaTopContainer = styled.View`
    flex: 1;
    alignSelf: stretch;
    flexDirection: row;
    alignItems: center;
    justifyContent: flex-start;
`;
const MetaBottomContainer = styled.View`
    flex: 0.8;
    alignSelf: stretch;
    alignItems: flex-start;
    justifyContent: center;
`;
const MetaText = styled.Text`
    fontSize: 14;
    fontWeight: 500;
    color: ${props => props.theme.SECONDARY_BACKGROUND_COLOR_LIGHT}
    marginLeft: 5px;
`;
const MetaFullName = styled.Text`
    fontSize: 16;
    fontWeight: 700;
    color: ${props => props.theme.SECONDARY_COLOR}
`;

const OrderCardHeader = ({ username, firstname, lastname, avatar, createdAt }) => {
    return(
        <Root>
            <AvatarContainer>
                <Avatar source={{uri: avatar || fakeavatar}}/>
            </AvatarContainer>
            <MetaContainer>
                <MetaTopContainer>
                    <MetaFullName>
                        {firstname} {lastname}
                    </MetaFullName>
                    <MetaText>
                        @{username}
                    </MetaText>
                </MetaTopContainer>
                <MetaBottomContainer>
                    {/* <MetaText>
                    hace {distanceInWordsToNow(createdAt, {locale: eoLocale})}
                    </MetaText> */}
                </MetaBottomContainer>
            </MetaContainer>
        </Root>
    );
}

export default OrderCardHeader;