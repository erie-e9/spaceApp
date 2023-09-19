import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Brand = styled.Image.attrs({
  resizeMode: 'contain',
})`
  height: 200px;
  width: 200px;
`;
