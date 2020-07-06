import React from 'react';
import styled from 'styled-components/native';
import HeadBranchOfficesComponent from './HeadBranchOfficesComponent';
import SubHeadBranchOfficesComponent from './SubHeadBranchOfficesComponent';
import BranchOfficesListComponent from './BranchOfficesListComponent';

const Root = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
`;

const BranchOfficesComponent = () => {
  return (
    <Root>
      <HeadBranchOfficesComponent />
      <SubHeadBranchOfficesComponent />
      <BranchOfficesListComponent />
    </Root>
  );
}

export default BranchOfficesComponent;
