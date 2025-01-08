import { useState } from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

const useFetch = <T>(url: string) => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: false,
    error: null
  });

  const fetchData = async () => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      const response = await fetch(url);
      const data = await response.json();
      setState({ data, loading: false, error: null });
    } catch (err) {
      setState({ 
        data: null,
        loading: false,
        error: err instanceof Error ? err : new Error('An error occurred')
      });
    }
  };

  return { ...state, fetchData };
};

export default useFetch;
