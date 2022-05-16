export const validateForm = (data) => {
  let errors = {};

  const { firstname, lastname, email, city, zip } = data;

  const textExpression = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  const emailExpression =
    /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/;
  const numberExpression = /[0-9]/;

  if (!textExpression.test(firstname)) {
    errors.firstname = `"${firstname}" is an invalid name`;
  } else if (!textExpression.test(lastname)) {
    errors.lastname = `"${lastname}" is an invalid last name`;
  } else if (!emailExpression.test(email)) {
    errors.email = `"${email}" is an invalid email`;
  } else if (!textExpression.test(city)) {
    errors.city = `"${city}" is an invalid city`;
  } else if (!numberExpression.test(zip)) {
    errors.zip = `"${zip}" is an invalid zip code`;
  }

  return errors;
};
