import { useEffect, useRef } from 'react';
import { Logger } from '@services';

const useWhyDidYouUpdate = (componentName: string, props: Record<string, any>) => {
  const prevProps = useRef(props);

  useEffect(() => {
    const changes: Record<string, { from: any; to: any }> = {};

    Object.keys(props).forEach((key) => {
      if (prevProps.current[key] !== props[key]) {
        changes[key] = { from: prevProps.current[key], to: props[key] };
      }
    });

    if (Object.keys(changes).length > 0) {
      Logger.log(`[${componentName}] re-rendered due to prop changes:`, changes);
    }

    prevProps.current = props;
  }, [componentName, props]);
};

export { useWhyDidYouUpdate };
