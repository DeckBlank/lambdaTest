import { KV_REST_API_TOKEN, KV_REST_API_URL } from '../enviroment';
import { responseRedisProp, saveTokenProp } from './TokenInterfaces';

export const Token = {
  save: async ({ token, data, expiration }: saveTokenProp) => {
    const saved: responseRedisProp = await fetch(
      `${KV_REST_API_URL}/set/${token}/${data}/ex/${expiration}`,
      {
        headers: {
          Authorization: `Bearer ${KV_REST_API_TOKEN}`,
        },
      },
    ).then(res => res.json());

    if (saved.error === 'Unauthorized')
      throw new Error('Error, intentalo de nuevo.');
    return true;
  },
  read: async (token: string) => {
    const saved: responseRedisProp = await fetch(
      `${KV_REST_API_URL}/get/${token}`,
      {
        headers: {
          Authorization: `Bearer ${KV_REST_API_TOKEN}`,
        },
      },
    ).then(res => res.json());
    if (saved.error === 'Unauthorized')
      throw new Error('Error, intentalo de nuevo.');
    if (saved.result === null)
      throw new Error('No se pudo recuperar los datos de la tarjeta.');
    return JSON.parse(saved.result || '{}');
  },
  generateToken: (size: number): string => {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < size; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      token += chars[randomIndex];
    }
    return token;
  },
};
