// creamos un metodo que valide el  bearer en el header

import { AuthorizationProps, decodePkBearerProps } from './interfaces';

import { regexPkKey } from '../validations/index.ts';

export const decodePkBearer = (
  headers: AuthorizationProps,
): decodePkBearerProps => {
  if (!headers.authorization) throw new Error('No se ha enviado el token');
  const [type, token] = headers.authorization.split(' ');
  if (type !== 'Bearer')
    throw new Error('No se ha enviado el tipo de token correcto');
  if (!token) throw new Error('No se ha enviado el token');
  if (!regexPkKey.test(token)) throw new Error('La llave primaria es invalida');
  // llamada a la base de datos para obtener el negocio
  // const business = await Bussiness.pkData(token);
  const business = {
    pk: 'JvbWUqBwgAEAAYgA',
    name: 'A.B.C. company',
  };
  return business;
};
