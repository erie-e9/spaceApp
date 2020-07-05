import React, {useEffect, useContext, useRef} from 'react';
import styled, {ThemeContext} from 'styled-components/native';

const Root = styled.View`
  flex: 1;
  justifyContent: center;
  backgroundColor: transparent;
`;
const Scroll = styled.ScrollView`
`;

const ETAAutoScroll = ({ children, time }) => {
  const themeContext = useContext(ThemeContext);
  let scrollView = useRef(null);
  let layoutHeight;

  useEffect(() => {
    setTimeout(() => {
      // scrollView.current.scrollToEnd({duration: time, animated: true})
      scrollView.current.scrollTo({
        y: layoutHeight,
        animated: true,
        duration: time
      });
    }, 1000);
  }, [])

  return (
    <>
      <Root>
      <Scroll
        ref={scrollView}
        showsVerticalScrollIndicator={false}
        onLayout={(e) => {
          layoutHeight = e.nativeEvent.layout.width;
        }}
        onContentSizeChange={(contentWidth, contentHeight) => {
          layoutHeight = contentHeight
        }}
        >
        {children}
      </Scroll>
      </Root>
    </>
  );
};

export default ETAAutoScroll;
