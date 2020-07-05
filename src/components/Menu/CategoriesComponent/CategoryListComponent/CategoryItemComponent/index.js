import React, {useContext} from 'react';
import {Platform, Dimensions} from 'react-native';
import styled, {ThemeContext} from 'styled-components';
import {ETASimpleText} from '@etaui';

const {width} = Dimensions.get('window');

const Item = styled.View`
  height: 180px;
  width: ${width / 2.85}px;
  backgroundColor: ${props => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
  marginHorizontal: ${width / 30}px;
  marginVertical: 10px;
  borderTopLeftRadius: 15px;
  borderTopRightRadius: 15px;
  borderBottomLeftRadius: 15px;
  borderBottomRightRadius: 15px;
  shadowOffset: 2px 3px;
  shadowRadius: 2px;
  shadowOpacity: 0;
  shadowColor: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
`;
const ItemImage = styled.Image`
  height: 180px;
  width: ${width / 2.85}px;
  borderTopLeftRadius: 15px;
  borderTopRightRadius: 15px;
  borderBottomLeftRadius: 15px;
  borderBottomRightRadius: 15px;
`;
const NewContainer = styled.View`
  position: absolute;
  zIndex: 100;
  height: 15px;
  width: 30px;
  top: 10px;
  left: 8px;
  backgroundColor: ${(props) => props.theme.PRIMARY_COLOR};
  borderRadius: 5px;
  borderWidth: 1px;
  borderColor: transparent;
  justifyContent: flex-end;
`;

const CategoryItemComponent = ({item}) => {
    const themeContext = useContext(ThemeContext);

    return (
        <>
          <Item>
            <ItemImage source={{uri: item.image}} />
            {
              item.isNew
              ? <NewContainer>
                  <ETASimpleText
                    size={11}
                    weight={Platform.OS === 'ios' ? '400' : '300'}
                    // color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                    color='white'
                    align={'center'}>
                    new
                  </ETASimpleText>
                </NewContainer>
              : null
            }
            <ETASimpleText
              size={14}
              weight={Platform.OS === 'ios' ? '400' : '200'}
              // color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
              color='white'
              align={'center'}
              style={{
                position: 'absolute',
                bottom: 15,
                left: 10,
                elevation: 4,
                textShadowColor: 'rgba(0, 0, 0, 0.7)',
                textShadowOffset: {width: 0.5, height: 0.7},
                textShadowRadius: 3
              }}
            >
              {item.name}
            </ETASimpleText>
          </Item>
        </>
    );
  }

  export default React.memo(CategoryItemComponent);