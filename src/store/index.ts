export const getDataFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  try {
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return data;
  }
};

export const saveDataToLocalStorage = (key: string, data: any) => {
  return localStorage.setItem(key, JSON.stringify(data));
};
