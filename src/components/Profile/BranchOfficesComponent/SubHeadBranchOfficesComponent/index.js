import React, {useContext} from 'react';
import styled, {ThemeContext} from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {ETAButtonFilled} from '@etaui';
import branchOffices from '@utils/branchOffices.json';

const Root = styled.View`
  min-height: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;
const ContentContainer = styled.View`
  min-height: 10px;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin: 5px;
  background-color: transparent;
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
          border-radius={3}
        />
      </ContentContainer>
    </Root>
  );
}

export default React.memo(SubHeadBranchOfficesComponent);
