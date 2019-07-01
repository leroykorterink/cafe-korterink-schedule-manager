export default formElement => {
  const fields = Array.from(formElement);

  return fields.reduce((accumulator, field) => {
    if (field.name) {
      accumulator[field.name] = field.value;
    }

    return accumulator;
  }, {});
};
