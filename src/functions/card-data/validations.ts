import { CardDataBody } from './interfaces';
import { regexToken } from '../../validations/index.ts';

export const validateParams = (object: string): CardDataBody => {
  let body: CardDataBody;
  try {
    body = JSON.parse(object || '{}');
  } catch (error) {
    console.log(error);
    throw new Error(`Error, token invalido ${object}`);
  }
  if (!regexToken.test(body.token)) {
    throw new Error('Token invalido');
  }
  return {
    token: body.token,
  };
};
