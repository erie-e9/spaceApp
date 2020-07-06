import React, {useContext} from 'react';
import {Platform, Dimensions} from 'react-native';
import styled, {ThemeContext} from 'styled-components/native';
import {ETASimpleText} from '@etaui';
import {Ionicons, Feather} from '@icons';

const {width} = Dimensions.get('window');

const Card = styled.View`
    flex-direction: row;
    width: ${width - 20}px;
    min-height: 70px;
    justify-content: space-between;
    align-self: center;
    border-radius: 5px
    padding: 10px;
    margin-bottom: 5px;
    background-color: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
`;
const MetadataInfo = styled.View`
  flex: 0.9;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  padding-bottom: 5px;
  background-color: transparent;
`;
const MetadaInfoHead = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: transparent;
`;
const IconContainer = styled.View`
  flex: 0.1;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

const AddressCardComponent = ({headTitle, details, isDefault}) => {
  const themeContext = useContext(ThemeContext);

  return (
    <>
      <Card>
        <MetadataInfo>
          <MetadaInfoHead>
            <ETASimpleText
              size={13}
              weight={Platform.OS === 'ios' ? '500' : '800'}
              color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
              align={'left'}>
              {headTitle}
            </ETASimpleText>
            {isDefault ? (
              <Ionicons
                name="ios-star"
                size={14}
                color={themeContext.STAR}
                style={{marginHorizontal: 6}}
              />
            ) : null}
          </MetadaInfoHead>
          <ETASimpleText
            size={11}
            weight={Platform.OS === 'ios' ? '300' : '200'}
            color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
            align={'left'}>
            {details}
          </ETASimpleText>
        </MetadataInfo>
        <IconContainer>
          <Feather
            name="edit-2"
            size={15}
            color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
          />
        </IconContainer>
      </Card>
    </>
  );
};

export default AddressCardComponent;
