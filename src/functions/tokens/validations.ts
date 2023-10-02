import {
  regexCardNumber,
  validateCreditCardNumber,
} from "../../validations/cardNumber";
import {
  regexCvv,
  regexEmail,
  regexExpirationMonth,
  regexExpirationYear,
} from "../../validations/index.ts";

import { TokensBody } from "./interfaces";

export const validateParams = (body: string): TokensBody => {
  let object: TokensBody;
  try {
    object = JSON.parse(body || "{}");
  } catch (error) {
    console.log(error);
    throw new Error(`Error, parametros invalidos.`);
  }
  object.card_number = object.card_number.toString();
  object.cvv = object.cvv.toString();
  if (
    !regexCardNumber.test(object.card_number) ||
    !validateCreditCardNumber(object.card_number)
  ) {
    throw new Error(`Numero de tarjeta invalido`);
  }
  if (!regexEmail.test(object.email)) {
    throw new Error("Email invalido");
  }
  if (!regexCvv.test(object.cvv)) {
    throw new Error("CVV invalido");
  }
  if (!regexExpirationYear.test(object.expiration_year)) {
    throw new Error("Año de expiracion invalido");
  }
  if (!regexExpirationMonth.test(object.expiration_month)) {
    throw new Error("Mes de expiracion invalido");
  }
  return object;
};
