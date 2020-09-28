import React from 'react'
import { Modal, TouchableOpacity } from 'react-native'
import {Dimensions} from 'react-native'
import styled from 'styled-components'
import { ETASimpleText, ETAButtonFilled } from '@etaui'

const {width} = Dimensions.get('window')

const Root = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #00000057;
`;
const PopUp = styled.View`
  width: ${width- 50}px;
  margin-bottom: 75px;
  padding-horizontal: 20px;
  border-radius: 7px;
  background-color: ${props => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`;
const PopUpContent = styled.View`
  min-height: 140px;
  justify-content: center;
  align-items: center;
  margin: 5px;
`;
const PopUpButtons = styled.View`
  min-height: 50px;
  flex-direction: column;
  border-top-width: 0.5px;
  border-color: ${props => props.theme.GRAYFACEBOOK};
  justify-content: center;
  align-items: center;
	border-bottom-left-radius: 7px;
	border-bottom-right-radius: 7px;
  background-color: ${props => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`;
const PopUpButton = styled.TouchableOpacity`
  height: 40px;
  flex-direction: row;
  justify-content: center;
  padding-horizontal: 50px;
  margin-vertical: 10px;
  align-items: center;
  border-radius: 30px;
  background-color: ${props => props.theme.EXITUS_COLOR};
`;

const ETAModal = ({ isActive, children, text, textButton, handleClose, textColor }) => {
  return (
    <TouchableOpacity onPressOut={handleClose}>
      <Modal animationType={'fade'} transparent={true} visible={isActive}>
        <Root>
          <PopUp>
            <PopUpContent>
              <ETASimpleText size={14} weight='400' color={textColor ? textColor : 'gray'} align='left' >{text}</ETASimpleText>
            </PopUpContent>

            <PopUpButtons>
              
              <PopUpButton
                onPress={handleClose}>
                <ETASimpleText size={14} weight='400' color={'white'} align='center' >{textButton}</ETASimpleText>
              </PopUpButton>
            </PopUpButtons>
          </PopUp>
        </Root>
      </Modal>
    </TouchableOpacity>
  );
};

export default ETAModal;
