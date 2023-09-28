import React, {
  Component,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import { AppState, AppStateStatus } from 'react-native';
import LottieView from 'lottie-react-native';

type extractComponentPropsType<Type> = Type extends Component<infer X>
  ? X
  : null;

export type LottieProps = extractComponentPropsType<LottieView> & {
  ref: any;
  height: number;
  width: number;
};

export type LottieViewProps = LottieView;

export const Lottie: React.FC<LottieProps> = forwardRef(function (props, ref) {
  const [appState, setAppState] = useState(AppState.currentState);
  const animationRef = useRef<LottieView>(null);

  useImperativeHandle(
    ref,
    function () {
      return {
        play() {
          animationRef?.current?.play();
        },
      };
    },
    [],
  );

  useEffect(() => {
    const appStateSubscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return () => {
      appStateSubscription.remove();
    };
  });

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      if (animationRef.current) {
        animationRef.current.play();
      }
    }
    setAppState(nextAppState);
  };

  return (
    <LottieView
      {...props}
      ref={animationRef}
      source={props.source}
      renderMode={props.renderMode}
      resizeMode="contain"
      style={{
        width: props.width,
        height: props.height,
      }}
    />
  );
});
