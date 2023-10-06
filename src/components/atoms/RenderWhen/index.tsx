import * as React from 'react';

type WhenProps = {
  children: React.ReactNode;
  isTrue?: boolean;
  limit?: number;
};

const RenderWhen = ({ limit = 1, isTrue, children }: WhenProps) => {
  const list: React.ReactNode[] = [];

  if (isTrue !== true) {
    return null;
  }

  React.Children.map(children, (child: any) => {
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

export default RenderWhen;
