export interface responseRedisProp {
  error?: string;
  result?: string;
}

export interface saveTokenProp {
  token: string;
  data: string;
  expiration: number;
}
