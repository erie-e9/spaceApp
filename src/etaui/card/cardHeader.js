import React from 'react';
import styled from 'styled-components/native';
// import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
// import eoLocale from 'date-fns/locale/es';
import { fakeavatar } from '@utils/constants';

const avatarSize = 35;
const avatarRadius = avatarSize / 2;

const Root = styled.View`
    height: 50px;
    flexDirection: row;
    alignItems: center;
`;
const AvatarContainer = styled.View`
    flex: 0.2
    paddingLeft: 5px;
    justifyContent: center;
    alignSelf: stretch;
`;
const Avatar = styled.Image`
    height: ${avatarSize}px;
    width: ${avatarSize}px;
    borderRadius: ${avatarRadius}px;
`;
const MetaContainer = styled.View`
    flex:1;
    alignSelf: stretch;
    marginTop: 5px
`;
const MetaTopContainer = styled.View`
    flex: 1;
    alignSelf: stretch;
    flexDirection: row;
    alignItems: center;
    justifyContent: flex-start;
    borderBottomWidth: 0.3px;
    borderBottomColor: ${props => props.theme.PRIMARY_TEXT_COLOR_LIGHT};
    marginVertical: 2px;
`;
const MetaBottomContainer = styled.View`
    flex: 0.8;
    alignSelf: stretch;
    alignItems: flex-start;
    justifyContent: center;
`;
const MetaHeaderTextTitle = styled.Text`
    fontSize: 20px;
    fontWeight: 700;
    color: ${props => props.theme.PRIMARY_TEXT_COLOR};
`;
const MetaHeaderText = styled.Text`
    fontSize: 18px;
    fontWeight: 500;
    color: ${props => props.theme.PRIMARY_TEXT_COLOR_LIGHT};
    marginLeft: 5px;
`;

const CardHeader = ({ creditid, avatar, status }) => {
    return(
        <Root>
            <AvatarContainer>
                <Avatar source={{ uri: avatar || fakeavatar }}/>
            </AvatarContainer>
            <MetaContainer>
                <MetaTopContainer>
                    <MetaHeaderTextTitle>
                        {   status === 1
                            ? 'Crédito: '
                            : 'Sin renovación: '
                        }
                    </MetaHeaderTextTitle>
                    <MetaHeaderText>
                        {creditid}
                    </MetaHeaderText>
                </MetaTopContainer>
                {/* <MetaBottomContainer>
                    <MetaHeaderText>
                    hace {distanceInWordsToNow(createdAt, {locale: eoLocale})}
                    </MetaHeaderText>
                </MetaBottomContainer> */}
            </MetaContainer>
        </Root>
    );
}

export default CardHeader;