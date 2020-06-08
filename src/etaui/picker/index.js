import React, {useState, useContext} from 'react';
import {View} from 'react-native';
import styled, {ThemeContext} from 'styled-components/native';
import RNPickerSelect, {defaultStyles} from 'react-native-picker-select';
import {Ionicons} from '@icons';

const Root = styled.View`
  flex: 1;
  flexDirection: row;
  justifyContent: center;
  alignItems: center;
  alignSelf: center;
  alignContent: center;
  marginVertical: 10px;
`;
const PickerContainer = styled.View`
  backgroundColor: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
  borderRadius: 30px;
  marginBottom: 20px;
  marginHorizontal: 5px;
  paddingHorizontal: 20px;
  display: flex;
  justifyContent: center;
  alignItems: center;
  alignSelf: center;
  alignContent: center;
  paddingHorizontal: 15px;
  shadowColor: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
  shadowOpacity: 0.4;
  shadowRadius: 1.4px;
  elevation: 2.5;
  height: 45px;
  width: 300px;
`;

const ETAPicker = ({items, placeholder}) => {
  const themeContext = useContext(ThemeContext);
  const [itemSelected, setitemSelected] = useState('');

  return (
    <Root>
      {items ? (
        <PickerContainer>
          <View style={defaultStyles.modalViewMiddle}>
            <RNPickerSelect
              placeholder={{
                label: placeholder ? placeholder : itemSelected,
                value: null,
                color: '#000',
              }}
              items={items}
              onValueChange={(value) => {
                // console.log('changed', value);
                setitemSelected(value);
              }}
              style={{
                placeholder: {
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: '#777',
                  backgroundColor: 'white',
                },
                inputIOS: {
                  fontSize: 14,
                  // paddingVertical: 12,
                  color: themeContext.PRIMARY_TEXT_COLOR_LIGHT,
                  backgroundColor: themeContext.THIRD_BACKGROUND_COLOR_LIGHT,
                  width: 250,
                  // height: 25
                  borderWidth: 0,
                  borderColor: 'gray',
                },
                inputAndroid: {
                  fontSize: 14,
                  // paddingVertical: 4,
                  color: themeContext.PRIMARY_TEXT_COLOR_LIGHT,
                  backgroundColor: themeContext.THIRD_BACKGROUND_COLOR_LIGHT,
                  width: 250,
                  // height: 25
                  borderWidth: 0,
                  borderColor: 'gray',
                },
                iconContainer: {
                  top: 10,
                  left: 200,
                },
              }}
              value={itemSelected}
              useNativeAndroidPickerStyle={false}
              Icon={() => {
                return (
                  <Ionicons name='md-arrow-dropdown' size={20} color='#777' />
                );
              }}
            />
          </View>
        </PickerContainer>
      ) : null}
    </Root>
  );
};

export default ETAPicker;
