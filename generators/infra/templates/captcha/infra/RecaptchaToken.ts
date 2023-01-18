import { ITokenService } from "@/services/ITokenService";

export class RecaptchaTokenService implements ITokenService {
  private static hasInited = false;

  constructor(private readonly accessKey: string) { }

  private async init(): Promise<void> {
    if (RecaptchaTokenService.hasInited) {
      return await Promise.resolve();
    }

    return await new Promise((resolve) => {
      this.embed()
        .then(() => {
          grecaptcha.ready(() => {
            RecaptchaTokenService.hasInited = true;
            resolve();
          });
        })
        .catch(() => { });
    });
  }

  private async embed(): Promise<void> {
    return await new Promise((resolve) => {
      const script = document.createElement("script");

      script.onload = function () {
        resolve();
      };

      script.src = `https://www.google.com/recaptcha/api.js?render=${this.accessKey}`;
      document.getElementsByTagName("head")[0].appendChild(script);
    });
  }

  async getToken(): Promise<string> {
    await this.init();
    const token = await grecaptcha.execute(this.accessKey, {
      action: "submit",
    });

    return await Promise.resolve(token);
  }
}