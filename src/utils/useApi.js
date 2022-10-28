import { useState, useEffect } from "react";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const useApi = (resource, opts, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  let isCanceled = false

  useEffect(() => {
    setError(null);
    setLoading(true);

    window.fetch([serverUrl, resource].join("/"), opts)
      .then(response =>
        !isCanceled && (
          response.ok ? response.json() : (async () => {
            throw new Error(`Error! status: ${response.status}`)
          })()
        )
      )
      .then(json => !isCanceled && setData(json))
      .catch(err => !isCanceled && setError(err))
      .finally(() => !isCanceled && setLoading(false));

    return () => (isCanceled = true);

  }, deps);

  return { data, loading, error };
}

export default useApi;