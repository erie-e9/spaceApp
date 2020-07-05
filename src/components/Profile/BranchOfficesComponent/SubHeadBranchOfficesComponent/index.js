import React, {useContext} from 'react';
import styled, {ThemeContext} from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {ETAButtonFilled} from '@etaui';
import branchOffices from '@utils/branchOffices.json';

const Root = styled.View`
  minHeight: 10px;
  flexDirection: column;
  justifyContent: center;
  alignItems: center;
  backgroundColor: transparent;
`;
const ContentContainer = styled.View`
  minHeight: 10px;
  flexDirection: column;
  justifyContent: flex-end;
  alignItems: center;
  width: 100%;
  margin: 5px;
  backgroundColor: transparent;
`;

const SubHeadBranchOfficesComponent = () => {
  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();

  return (
    <Root>
      <ContentContainer>
        <ETAButtonFilled
          title='See all on map'
          onPress={() => navigation.navigate('SettingsNavigator', {screen: 'MapBranchOfficesScreen', params: { data: branchOffices.data }})}
          colorButton={themeContext.PRIMARY_COLOR}
          padding={10}
          width={250}
          borderRadius={3}
        />
      </ContentContainer>
    </Root>
  );
}

export default React.memo(SubHeadBranchOfficesComponent);
