import React from 'react';
import styled from 'styled-components/native';
import ForgetPasswordForm from '@components/Auth/ForgetPasswordForm';

const Root = styled.View`
    flex: 1;
    justifyContent: center;
    alignItems: center;
`;

const ForgetPasswordScreen = () => {

    return (
        <Root>
            <ForgetPasswordForm />
        </Root>
    );
}

export default ForgetPasswordScreen;