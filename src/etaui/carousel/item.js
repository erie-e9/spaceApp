import React from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components';
import {ETASimpleText} from '@etaui';

const {width, height} = Dimensions.get('window');

const Root = styled.View`
  width: ${width - 20}px;
  height: ${height / 5.6}px;
  backgroundColor: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
  marginHorizontal: 10px;
  marginVertical: 10px;
  borderRadius: 8px;
  shadowOffset: 5px 5px;
  shadowColor: #000;
  shadowOpacity: 0;
  shadowRadius: 3px;
  elevation: 0;
  justifyContent: center;
`;
// shadowOffset: ${{width: 0.5, height: 0.5}};
const ItemImage = styled.Image`
  width: ${width - 20}px;
  height: ${height / 5.6}px;
  borderRadius: 10px;
`;
const ContentContainer = styled.View`
  position: absolute;
  bottom: 10px;
  margin: 7px;
  left: 5px;
`;

const ETACarouselItem = ({item}) => {
  return (
    <Root>
      <ItemImage source={{uri: item.image}} />
      <ContentContainer>
        <ETASimpleText
          size={18}
          weight='700'
          color='white'
          align={'center'}
          style={{
            marginBottom: 2,
            elevation: 4,
            textShadowColor: 'rgba(0, 0, 0, 0.7)',
            textShadowOffset: {width: 0.5, height: 0.7},
            textShadowRadius: 3
          }}>
          {item.title}
        </ETASimpleText>
        <ETASimpleText
          size={14}
          weight='400'
          color='white'
          align={'center'}
          style={{
            marginBottom: 5,
            elevation: 4,
            textShadowColor: 'rgba(0, 0, 0, 0.7)',
            textShadowOffset: {width: 0.5, height: 0.7},
            textShadowRadius: 3
          }}>
          {item.description}
        </ETASimpleText>
      </ContentContainer>
    </Root>
  );
};

export default React.memo(ETACarouselItem);
