export const regexCardNumber = new RegExp('^[0-9]{16}$');
export const validateCreditCardNumber = (
  cardNumber: string | number,
): boolean => {
  cardNumber = cardNumber.toString();
  const sanitizedCardNumber = cardNumber.replace(/\D/g, '');
  if (sanitizedCardNumber.length < 2) {
    return false;
  }
  const digits = sanitizedCardNumber.split('').map(Number);
  digits.reverse();
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    let digit = digits[i];

    if (i % 2 === 1) {
      digit *= 2;

      if (digit >= 10) {
        digit -= 9;
      }
    }
    sum += digit;
  }
  return sum % 10 === 0;
};
