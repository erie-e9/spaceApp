import styled from 'styled-components/native';

export const Container = styled.View<{ width: number; height: number; backgroundColor: string }>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 25px;
  overflow: hidden;
  justify-content: center;
`;

export const Swipeable = styled(Animated.View)<{ height: number }>`
  position: absolute;
  width: ${({ height }) => height}px;
  height: ${({ height }) => height}px;
  background-color: #00000033;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
`;

export const TextContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const StyledText = styled.Text<{ textColor: string }>`
  color: ${({ textColor }) => textColor};
  font-weight: bold;
`;
