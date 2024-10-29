import { useState } from 'react';

const useAutoFocus = (
  onFocused?: () => void,
  onFocusOut?: () => void,
): { onFocus: () => void; onBlur: () => void; focused: boolean } => {
  const [focused, setFocused] = useState<boolean>(false);

  const onFocus = (): void => {
    setFocused(true);
    if (onFocused) {
      onFocused();
    }
  };
  const onBlur = (): void => {
    setFocused(false);
    if (onFocusOut) {
      onFocusOut();
    }
  };
  return { onFocus, onBlur, focused };
};

export default useAutoFocus;
