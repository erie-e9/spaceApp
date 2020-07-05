import React, { useState, useContext, useRef } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { TouchableWithoutFeedback, Animated, Easing } from 'react-native';

const Root = styled.View`
    flexDirection: row;
    justifyContent: center;
    alignItems: center;
    backgroundColor: transparent;
`;
const Switch = styled.View`
    height: 20px;
    width: 40px;
    borderWidth: 0.5px;
    borderColor: ${props => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
    margin: 10px;
    borderRadius: 20px;    
    alignItems: flex-start;
    padding: 1px;
    backgroundColor: transparent;
`;

const ETASwitch = ({ color, onChange, activated }) => {
    const themeContext = useContext(ThemeContext);
    const animation = useRef(new Animated.Value(!!activated ? 1 : 0)).current;
    const [toggled, setToggled] = useState(!!activated);
    const [containerWidth, setContainerWidth] = useState(0);

    const _switchAnimated = () => {
        setToggled(!toggled);
        if (!toggled) {
            Animated.timing(animation, {
                duration: 100,
                toValue: 1,
                easing: Easing.materialUIStandard,
                useNativeDriver: true
            }).start();
        } else {
            Animated.timing(animation, {
                duration: 100,
                toValue: 0,
                easing: Easing.materialUIStandard,
                useNativeDriver: true
            }).start();
        }
    };

    return (
        <Root>
            <TouchableWithoutFeedback 
                onPress={() => {onChange(); _switchAnimated();}}
                style={{ flex: 1 }} >
                <Switch>
                    <Animated.View
                        style={[
                            {
                                height: 18,
                                width: 18,
                                borderRadius: 9,
                                backgroundColor: color ? color : '#333',
                                justifyContent: 'center',
                                bottom: 0.5,
                                transform: [
                                    {
                                        translateX: animation.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0, containerWidth + 18.5],
                                        }),
                                    },
                                ],
                            },
                        ]}
                    >
                    </Animated.View>
                </Switch>
            </TouchableWithoutFeedback>
        </Root>
    );
}

// export default React.memo(ETASwitch);
export default ETASwitch;