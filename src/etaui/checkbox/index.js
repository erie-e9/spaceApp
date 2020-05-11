import React from 'react';
import styled from 'styled-components/native';

const Root = styled.View`
  flex: 1;
  flexDirection: row;
  justifyContent: center;
  alignItems: center;
  marginVertical: 5px;
`;
const Text = styled.Text`
  color: ${(props) => (props.color ? props.color : 'black')};
  fontWeight: ${(props) => (props.weight ? props.weight : '400')};
  textAlign: center;
  alignItems: center;
  justifyContent: center;
  fontSize: ${(props) => (props.size ? props.size : 16)}px;
`;
const CheckBox = styled.View`
  height: 20px;
  width: 20px;
  borderWidth: 2px;
  borderColor: ${(props) => (true ? props.theme.PRIMARY_COLOR : 'gray')};
  margin: 10px;
  borderRadius: 3px;
`;

const ETACheckBox = ({title, color, checked}) => {
  return (
    <Root>
      <CheckBox />
      <Text>{title ? title : 'Text'}</Text>
    </Root>
  );
};

export default ETACheckBox;
