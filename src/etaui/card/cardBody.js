import React from 'react';
import styled from 'styled-components/native';
import ETAButtonFilled from '@etaui/buttons/buttonFilled';

const Root = styled.View`
    paddingHorizontal: 50px;
    marginHorizontal: 10px;
    marginTop: 10px;
`;
const ContentContainer = styled.View`
    flex: 1;
    flexDirection: row;
    justifyContent: flex-start;
    marginVertical: 2px;
`;
const ContentTextTitle = styled.Text`
    fontSize: 14px;
    textAlign: left;
    fontWeight: bold;
    paddingHorizontal: 2px;
    color: ${props => props.theme.PRIMARY_TEXT_COLOR};
`;
const ContentText = styled.Text`
    fontSize: 14px;
    textAlign: left;
    fontWeight: 500;
    paddingHorizontal: 2px;
    color: ${props => props.theme.PRIMARY_TEXT_COLOR_LIGHT};
`;

const CardBody = ({ reason, creditid, term, mount, pay, status }) => {
    return (
        <Root>
            {
                status !== 1
                ? <ContentContainer>
                    <ContentTextTitle>Causa: </ContentTextTitle>
                    <ContentText>{reason}</ContentText>
                </ContentContainer>
                : null
            }

            <ContentContainer>
                <ContentTextTitle>Plazo: </ContentTextTitle>
                <ContentText>{term} meses</ContentText>
            </ContentContainer>

            <ContentContainer>
                <ContentTextTitle>{ status === 1 ? 'Monto a recibir: ' : 'Monto: ' }</ContentTextTitle>
                <ContentText>${mount}</ContentText>
            </ContentContainer>

            <ContentContainer>
                <ContentTextTitle>Pago: </ContentTextTitle>
                <ContentText>${pay}</ContentText>
            </ContentContainer>
        </Root>
    );
}

export default CardBody;