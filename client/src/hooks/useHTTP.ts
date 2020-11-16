import { useCallback, useState } from "react";

export type httpMethod = "GET" | "POST" | "PATCH" | "DELETE";
export type requestHeaders = Record<string, any>;
export type requestPayload = string;
export type serverResponse = any;

export function useHTTP() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean | null>(false);

  async function fetcher<
    U extends RequestInfo,
    M extends RequestInit["method"],
    B extends RequestInit["body"],
    H extends RequestInit["headers"],
    R
  >(url: U, method: M, body?: B, headers?: H): Promise<R> {
    setLoading(true);
    try {
      const response = await fetch(url, { method, body, headers });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch");
      }

      setLoading(false);

      return data;
    } catch (error) {
      setLoading(true);
      setError(error.message);
      setLoading(false);
      throw error;
    }
  }

  const request = useCallback(fetcher, [fetcher]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    request,
    clearError,
  };
}
