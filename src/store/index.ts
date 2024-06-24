export const getDataFromLocalStorage = (key: string) => {
  return JSON.parse(JSON.stringify(localStorage.getItem(key)));
};

export const saveDataToLocalStorage = (key: string, data: any) => {
  return JSON.parse(JSON.stringify(localStorage.setItem(key, data)));
};
