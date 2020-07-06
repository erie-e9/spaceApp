import React, {useState, useContext} from 'react';
import {View} from 'react-native';
import styled, {ThemeContext} from 'styled-components/native';
import RNPickerSelect, {defaultStyles} from 'react-native-picker-select';
import {Ionicons} from '@icons';

const Root = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: center;
  align-content: center;
  margin-vertical: 10px;
`;
const PickerContainer = styled.View`
  height: 45px;
  width: 300px;
  border-radius: 30px;
  margin-bottom: 20px;
  margin-horizontal: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  align-content: center;
  padding-horizontal: 15px;
  shadow-color: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
  shadow-opacity: 0.4;
  shadow-radius: 1.4px;
  elevation: 2.5;
  background-color: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
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
                  // padding-vertical: 12,
                  color: themeContext.PRIMARY_TEXT_COLOR_LIGHT,
                  backgroundColor: themeContext.THIRD_BACKGROUND_COLOR_LIGHT,
                  width: 250,
                  // height: 25
                  borderWidth: 0,
                  borderColor: 'gray',
                },
                inputAndroid: {
                  fontSize: 14,
                  // padding-vertical: 4,
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
