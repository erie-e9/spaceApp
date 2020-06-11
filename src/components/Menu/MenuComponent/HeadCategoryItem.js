import React, {useContext} from 'react';
import {Platform} from 'react-native';
import styled, {ThemeContext} from 'styled-components';
import {ETASimpleText} from '@etaui';

const Item = styled.View`
  width: 40px;
  height: 60px;
  borderRadius: 20px;
  borderWidth: 0.5px;
  borderColor: ${(props) => props.theme.PRIMARY_TEXT_COLOR_LIGHT};
  backgroundColor: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
  margin: 4px 9px;
  justifyContent: center;
  alignItems: center;
`;
const ItemImage = styled.Image`
  width: 40px;
  height: 60px;
  borderRadius: 20px;
`;
const NewContainer = styled.View`
  justifyContent: flex-end;
  position: absolute;
  height: 12px;
  width: 23px;
  bottom: 12px;
  right: 8px;
  backgroundColor: ${(props) => props.theme.PRIMARY_COLOR};
  borderRadius: 4px;
  borderWidth: 1.3px;
  borderColor: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`;

const CategoryItem = ({itemcat}) => {
  const themeContext = useContext(ThemeContext);

  return (
    <>
      <Item>
        <ItemImage source={{uri: itemcat.image}} />
      </Item>
      <ETASimpleText
        size={9}
        weight={Platform.OS === 'ios' ? '400' : '200'}
        color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
        align={'center'}>
        {itemcat.name}
      </ETASimpleText>
      {
        itemcat.isNew
        ?  <NewContainer>
            <ETASimpleText
              size={8}
              weight={Platform.OS === 'ios' ? '400' : '200'}
              // color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
              color='white'
              align={'center'}>
              new
            </ETASimpleText>
          </NewContainer>
        : null
      }
    </>
  );
}

export default React.memo(CategoryItem);