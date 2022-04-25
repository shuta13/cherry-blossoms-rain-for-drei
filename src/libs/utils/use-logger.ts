import { useEffect } from 'react';

export const useLogger = (...args: any[]) => {
  useEffect(() => {
    console.log(args);
  }, [args]);
};
