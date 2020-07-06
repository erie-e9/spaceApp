import React, {useContext} from 'react';
import {Platform} from 'react-native';
import styled, {ThemeContext} from 'styled-components/native';
import {ETASimpleText, ETAAvatar} from '@etaui';
// import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
// import eoLocale from 'date-fns/locale/es';

const Root = styled.View`
  height: 50px;
  flex-direction: row;
  align-items: center;
`;
const AvatarContainer = styled.View`
    flex: 0.2
    padding-left: 5px;
    justify-content: center;
    align-self: stretch;
`;
const MetaContainer = styled.View`
  flex: 1;
  align-self: stretch;
  margin-top: 5px;
`;
const MetaTopContainer = styled.View`
  flex: 1;
  align-self: stretch;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 10px;
`;
const MetaBottomContainer = styled.View`
  flex: 0.8;
  align-self: stretch;
  align-items: flex-start;
  justify-content: center;
`;

const CardHeader = ({username, firstname, lastname}) => {
  // , avatar, createdAt
  const themeContext = useContext(ThemeContext);

  return (
    <Root>
      <AvatarContainer>
        <ETAAvatar size='small' />
      </AvatarContainer>
      <MetaContainer>
        <MetaTopContainer>
          <ETASimpleText
            size={14}
            weight={Platform.OS === 'ios' ? '500' : '300'}
            color={themeContext.LINK}
            align={'left'}>
            @{username}
          </ETASimpleText>
          <ETASimpleText
            size={15}
            weight={Platform.OS === 'ios' ? '500' : '400'}
            color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
            align={'left'}>
            {firstname} {lastname}
          </ETASimpleText>
        </MetaTopContainer>
        <MetaBottomContainer>
          {/* <ETASimpleText size={14} weight={Platform.OS === 'ios' ? '500' : '300'} color={themeContext.PRIMARY_TEXT_COLOR_LIGHT} align={'left'}>
                        hace {distanceInWordsToNow(createdAt, {locale: eoLocale})}
                    </ETASimpleText> */}
        </MetaBottomContainer>
      </MetaContainer>
    </Root>
  );
};

export default CardHeader;
