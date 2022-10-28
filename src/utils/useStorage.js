import { useState, useEffect } from "react";

const useStorage = (storage, key, defaultValue) => {
  const [value, setValue] = useState(defaultValue || JSON.parse(storage.getItem(key)));
  useEffect(() => {
    (null !== value)
      ? storage.setItem(key, JSON.stringify(value))
      : storage.removeItem(key);
  }, [value, storage, key])

  return [value, setValue];
};

export default useStorage;