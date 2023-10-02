import { regexToken } from "../../validations/index.ts";
import { CardDataBody } from "./interfaces";

export const validateParams = (object: string): CardDataBody => {
  try {
    const body: CardDataBody = JSON.parse(object || "{}");
    if (!regexToken.test(body.token)) {
      throw new Error(`Token invalido`);
    }
    return {
      token: body.token,
    };
  } catch (error) {
    console.log(error);
    throw new Error(`Error, token invalido ${object}`);
  }
};
