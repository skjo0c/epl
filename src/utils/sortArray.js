export const descending = (array, key1, key2) => {
  return array.sort((data1, data2) => {
    return data2[key1] - data1[key1] || data2[key2] - data1[key2];
  });
};

export const ascending = (array, key1, key2) => {
  return array.sort((data1, data2) => {
    return data1[key1] - data2[key1] || data1[key2] - data2[key2];
  });
};
