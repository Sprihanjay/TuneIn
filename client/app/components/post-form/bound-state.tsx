import { useEffect, useRef, useState } from "react";

function useBoundState(initialValue: any, { event = 'input' } = {}) {
  const stateRef = useRef();
  const [stateName, setState] = useState(initialValue);

  useEffect(() => {
    function callback(e: any) {
      setState(e.target.value);
    }

    (stateRef.current as any).addEventListener(event, callback);

    return () => {
      (stateRef.current as any).removeEventListener(event, callback);
    };
  });

  useEffect(() => {
    if (!stateRef.current) return;

    (stateRef.current as any).value = stateName;
  }, [stateName]);

  return [stateName, stateRef, setState];
}

export default useBoundState;