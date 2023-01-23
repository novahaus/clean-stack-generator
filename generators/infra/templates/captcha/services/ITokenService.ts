export interface ITokenService {
  getToken: () => Promise<string>;
}
