import React, { memo } from 'react';
import { useSVG } from '@hooks';

interface SVGIconProps {
  icon: string;
}

export const SVGIcon = ({ icon }: SVGIconProps): React.JSX.Element => {
  const SVGIconComponent = useSVG(icon);
  return <SVGIconComponent />;
};

export default memo(SVGIcon);
