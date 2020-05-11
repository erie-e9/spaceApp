import React from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components';
import {ETASimpleText} from '@etaui';

const {width, height} = Dimensions.get('window');

const Root = styled.View`
  flex: 1;
  width: ${width - 20}px;
  height: ${height / 5}px;
  backgroundColor: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
  marginTop: 10px;
  marginHorizontal: 10px;
  borderRadius: 8px;
  shadowColor: #000;
  shadowOpacity: 0;
  shadowRadius: 3px;
  elevation: 5;
`;
// shadowOffset: ${{width: 0.5, height: 0.5}};
const ItemImage = styled.Image`
  width: ${width - 20}px;
  height: ${height / 5}px;
  borderRadius: 10px;
`;
const ContentWrapper = styled.View`
  position: absolute;
  bottom: 10px;
  margin: 7px;
  left: 5px;
`;

const ETACarouselItem = ({item}) => {
  return (
    <Root
      style={{
        shadowOffset: {width: 0.5, height: 0.5},
      }}>
      <ItemImage source={{uri: item.image}} />
      <ContentWrapper>
        <ETASimpleText
          size={18}
          weight="700"
          color="white"
          align={'center'}
          style={{
            shadowColor: '#000',
            shadowOffset: {width: 0.8, height: 0.8},
            shadowOpacity: 0.7,
            shadowRadius: 3,
            marginBottom: 2,
            elevation: 5,
          }}>
          {item.title}
        </ETASimpleText>
        <ETASimpleText
          size={14}
          weight="400"
          color="white"
          align={'center'}
          style={{
            shadowColor: '#000',
            shadowOffset: {width: 0.8, height: 0.8},
            shadowOpacity: 0.7,
            shadowRadius: 3,
            marginBottom: 5,
            elevation: 5,
          }}>
          {item.description}
        </ETASimpleText>
      </ContentWrapper>
    </Root>
  );
};

export default ETACarouselItem;
