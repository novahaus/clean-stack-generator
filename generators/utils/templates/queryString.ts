import Qs from "qs";

export function createQueryString(params: Object): string {
  return Qs.stringify(params, { arrayFormat: "indices", allowDots: true });
}