const updateArray = (array = [], element = {}, { key = 'uuid', mode = 'edit' } = {}) => {
  let newArray = [...array];
  const index = array.findIndex(item => item[key] === element[key]);
  if (mode === 'edit') {
    if (index === -1) {
      newArray.push(element);
    } else {
      newArray[index] = element;
    };
  } else {
    newArray = newArray.filter(item => item[key] !== element[key]);
  };
  return newArray;
};

export default updateArray;