import React, { memo, Children, ReactNode } from 'react';

type RenderWhenProps = {
  children: React.ReactNode;
  isTrue?: boolean;
  limit?: number;
};

export const RenderWhen = ({
  limit = 1,
  isTrue,
  children,
}: RenderWhenProps) => {
  const list: ReactNode[] = [];

  if (isTrue !== true) {
    return null;
  }

  Children.map(children, (child: any) => {
    if (isTrue && list.length < limit) {
      list.push(child);
    }
  });

  return <>{list}</>;
};

RenderWhen.defaultProps = {
  limit: 1,
  isTrue: true,
};

export default memo(RenderWhen);
