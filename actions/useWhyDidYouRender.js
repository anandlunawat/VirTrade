import { useEffect, useRef } from "react";

export const useWhyDidYouRender = (componentName, props) => {
  const previousProps = useRef(props);

  useEffect(() => {
    const changedProps = Object.entries(props).reduce((acc, [key, value]) => {
      if (previousProps.current[key] !== value) {
        acc[key] = { before: previousProps.current[key], after: value };
      }
      return acc;
    }, {});

    if (Object.keys(changedProps).length > 0) {
      console.log(`[${componentName}] Re-rendered due to:`, changedProps);
    }

    previousProps.current = props;
  }, [props]);
};