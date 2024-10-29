import React, { memo, Children, ReactNode, Fragment } from 'react';

type RenderWhenProps = {
  children: React.ReactNode;
  isTrue?: boolean;
  limit?: number;
};

export const RenderWhen = ({ limit = 1, isTrue = true, children }: RenderWhenProps) => {
  const list: ReactNode[] = [];

  if (isTrue !== true) {
    return null;
  }

  Children.map(children, (child: any) => {
    if (isTrue && list.length < limit) {
      list.push(child);
    }
  });

  return <Fragment>{list}</Fragment>;
};

export default memo(RenderWhen);
