import React, {useContext} from 'react';
import {Platform, Dimensions} from 'react-native';
import styled, {ThemeContext} from 'styled-components/native';
import {Ionicons, FontAwesome, Feather, MasterCardIcon} from '@icons';
import {ETASimpleText} from '@etaui';

const {width} = Dimensions.get('window');
const iconSize = 23;

const Card = styled.View`
    flex-direction: row;
    width: ${width - 20}px;
    min-height: 70px;
    justify-content: center;
    align-self: center;
    background-color: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
    border-radius: 5px
    padding: 10px;
    margin-bottom: 5px;
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
const CompanyIconContainer = styled.View`
  padding-horizontal: 10px;
`;
const IconContainer = styled.View`
  flex: 0.1;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

const DirectionCardComponent = ({
  headTitle,
  details,
  expDate,
  cardType,
  company,
  owner,
  isDefault,
}) => {
  const themeContext = useContext(ThemeContext);

  const companySwitch = () => {
    switch (company) {
      case 'MasterCard':
        return <MasterCardIcon size={15} />;
        break;
      case 'Visa':
        return (
          <FontAwesome
            name="cc-visa"
            size={iconSize - 6}
            color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
          />
        );
        break;

      default:
        break;
    }
  };

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
            <CompanyIconContainer>{companySwitch()}</CompanyIconContainer>
            {isDefault ? (
              <Ionicons
                name="ios-star"
                size={14}
                color={themeContext.STAR}
                style={{marginHorizontal: 2}}
              />
            ) : null}
          </MetadaInfoHead>
          <ETASimpleText
            size={13}
            weight={Platform.OS === 'ios' ? '300' : '200'}
            color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
            align={'left'}>
            {details}
          </ETASimpleText>
          <ETASimpleText
            size={11}
            weight={Platform.OS === 'ios' ? '300' : '200'}
            color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
            align={'left'}>
            {expDate}
          </ETASimpleText>
          <ETASimpleText
            size={11}
            weight={Platform.OS === 'ios' ? '300' : '200'}
            color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
            align={'left'}>
            {owner}
          </ETASimpleText>
        </MetadataInfo>
        <IconContainer>
          <Feather
            name="chevron-right"
            size={15}
            color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
          />
        </IconContainer>
      </Card>
    </>
  );
};

export default React.memo(DirectionCardComponent);
