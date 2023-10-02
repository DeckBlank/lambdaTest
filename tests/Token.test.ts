import { Token } from "../src/core/Token";

describe("Token", () => {
  describe("generateToken", () => {
    it("debería generar un token del tamaño especificado", () => {
      const token = Token.generateToken(16);
      expect(token).toHaveLength(16);
    });

    it("debería generar un token único cada vez", () => {
      const token1 = Token.generateToken(16);
      const token2 = Token.generateToken(16);
      expect(token1).not.toEqual(token2);
    });
  });

  describe("save", () => {
    it("debería guardar los datos en Redis con el token especificado", async () => {
      const data = JSON.stringify({ foo: "bar" });
      const token = Token.generateToken(16);
      const response = { result: "OK" };
      const fetchMock = jest.fn().mockResolvedValue({ json: () => response });
      global.fetch = fetchMock;

      await Token.save({ token, data, expiration: 900 });

      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining(token),
        expect.any(Object)
      );
    });

    it("debería lanzar un error si falla la solicitud a Redis", async () => {
      const data = JSON.stringify({ foo: "bar" });
      const token = Token.generateToken(16);
      const response = { error: "Unauthorized" };
      const fetchMock = jest.fn().mockResolvedValue({ json: () => response });
      global.fetch = fetchMock;

      await expect(
        Token.save({ token, data, expiration: 900 })
      ).rejects.toThrow("Error, intentalo de nuevo.");
    });
  });

  describe("read", () => {
    it("debería recuperar los datos de Redis con el token especificado", async () => {
      const data = { foo: "bar" };
      const token = Token.generateToken(16);
      const response = { result: JSON.stringify(data) };
      const fetchMock = jest.fn().mockResolvedValue({ json: () => response });
      global.fetch = fetchMock;

      const result = await Token.read(token);

      expect(result).toEqual(data);
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining(token),
        expect.any(Object)
      );
    });

    it("debería lanzar un error si falla la solicitud a Redis", async () => {
      const token = Token.generateToken(16);
      const response = { error: "Unauthorized" };
      const fetchMock = jest.fn().mockResolvedValue({ json: () => response });
      global.fetch = fetchMock;

      await expect(Token.read(token)).rejects.toThrow(
        "Error, intentalo de nuevo."
      );
    });

    it("debería lanzar un error si no se pueden recuperar los datos de Redis", async () => {
      const token = Token.generateToken(16);
      const response = { result: null };
      const fetchMock = jest.fn().mockResolvedValue({ json: () => response });
      global.fetch = fetchMock;

      await expect(Token.read(token)).rejects.toThrow(
        "No se pudo recuperar los datos de la tarjeta."
      );
    });
  });
});
