import React, {
  memo,
  Component,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import { AppState, AppStateStatus, StyleProp, ViewStyle } from 'react-native';
import LottieView from 'lottie-react-native';

type extractComponentPropsType<Type> = Type extends Component<infer X> ? X : null;

export type LottieProps = extractComponentPropsType<LottieView> & {
  testID?: 'LottieID';
  ref: any;
  height: number;
  width: number;
  startFrame?: number;
  endFrame?: number;
  resizeMode?: 'center' | 'cover' | 'contain';
  style?: StyleProp<ViewStyle>;
  progress?: number;
};

export type LottieViewProps = LottieView;

export const Lottie: React.FC<LottieProps> = forwardRef((props, ref) => {
  const [appState, setAppState] = useState(AppState.currentState);
  const animationRef = useRef<LottieView>(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        play() {
          animationRef?.current?.play(
            props.startFrame && props.startFrame,
            props.endFrame && props.endFrame,
          );
        },
      };
    },
    [props.startFrame, props.endFrame],
  );

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      if (animationRef.current) {
        animationRef?.current?.play();
      }
    }
    setAppState(nextAppState);
  };

  useEffect(() => {
    const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      appStateSubscription.remove();
    };
  });

  return (
    <LottieView
      {...props}
      testID={props.testID || 'LottieID'}
      ref={animationRef}
      progress={props.progress}
      source={props.source}
      renderMode={props.renderMode}
      resizeMode={props.resizeMode || 'contain'}
      style={{
        width: props.width,
        height: props.height,
        ...props.style,
      }}
    />
  );
});

export default memo(Lottie);
