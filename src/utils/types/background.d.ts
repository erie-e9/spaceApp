import { StyleProp, ViewStyle } from 'react-native';
import { AnimatedStyle } from 'react-native-reanimated';
import { DefaultTheme } from 'styled-components';

export type ScreenBackgroundType = 'solid' | 'gradient' | 'blur' | 'lava' | 'multimedia' | 'animated';
export type BackgroundType = 'image' | 'video';

export interface ScreenBackgroundProps {
    testID: string;
    type: ScreenBackgroundType;
    colors?: string[];
    children: React.ReactElement;
    style?: StyleProp<AnimatedStyle<StyleProp<ViewStyle | any>>>;
    dimensions: object;
    isScreen?: boolean;
    initialColor?: keyof DefaultTheme['tokens']['colors'];
    finalColor?: keyof DefaultTheme['tokens']['colors'];
    layerOpacity?: number;
    backgroundType?: BackgroundType;
    backgroundSource?: string;
    canvasDimensions?: {
        width: number;
        height: number;
    };
    fillColor?: string;
}