import styled, { DefaultTheme } from 'styled-components/native';
import type { StandardLonghandProperties } from 'csstype';

export interface StyledTextProps {
  readonly type?: keyof DefaultTheme['tokens']['colors'];
  readonly fontWeight?: StandardLonghandProperties['fontWeight'];
  readonly fontSize?: StandardLonghandProperties['fontSize'];
  readonly lineHeight?: StandardLonghandProperties['lineHeight'];
  readonly textAlign?: StandardLonghandProperties['textAlign'];
}

// TODO: Update after Typograph is ready
const StyledText = styled.Text<StyledTextProps>`
  font-family: Roboto;
  font-size: ${props => props.fontSize || '20px'};
  font-weight: ${props => props.fontWeight || 'normal'};
  line-height: ${props => props.lineHeight || '22px'};
  text-align: ${props => props.textAlign || 'auto'};
  color: ${props =>
    props.theme.tokens.colors[props.type || 'opposing' || 'primaryL4']};
`;

export default StyledText;
