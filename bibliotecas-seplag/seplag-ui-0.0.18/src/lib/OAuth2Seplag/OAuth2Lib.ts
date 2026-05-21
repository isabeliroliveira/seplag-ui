export interface OAuth2LibConfigSeplag {
  redirectUri: string;
  urlAuth: string;
  clientId: string;
  clientSecret?: string;
  userInfoEndpoint: string;
  scope?: string;
  withPKCE?: boolean;
  post_logout_redirect_uri?: string | null;
}

interface TokenSeplag {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expiryDate?: Date;
}

class OAuth2LibSeplag {
  config: OAuth2LibConfigSeplag;
  token: TokenSeplag | null;
  refreshInterval: number | null;
  onTokenExpiredSeplag: (() => void) | null;

  constructor(config: OAuth2LibConfigSeplag) {
    this.config = {
      redirectUri: config.redirectUri,
      urlAuth: config.urlAuth,
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      userInfoEndpoint: config.userInfoEndpoint,
      scope: config.scope || "read profile openid write",
      withPKCE: config.withPKCE || false,
      post_logout_redirect_uri: config.post_logout_redirect_uri,
    };
    this.token = null;
    this.refreshInterval = null;
    this.onTokenExpiredSeplag = null;
  }

  calculateExpiryDateSeplag(expiresIn: number): Date {
    return new Date(Date.now() + expiresIn * 1000);
  }

  async initSeplag(): Promise<boolean | void> {
    if (this.isTokenLocalStorageValidSeplag()) {
      return true;
    }

    const urlParams = new URLSearchParams(globalThis.location.search);

    if (urlParams.has("code")) {
      const code = urlParams.get("code");
      if (code) {
        return this.exchangeCodeForTokenSeplag(code);
      }
    } else if (urlParams.has("error")) {
      console.log("error", urlParams.get("error"));
      console.log("error_description", urlParams.get("error_description"));
    } else {
      this.authorizeSeplag();
    }
  }

  isTokenLocalStorageValidSeplag() {
    const tokenStorage = localStorage.getItem("tk");

    if (!tokenStorage) {
      return false;
    }

    const token = JSON.parse(tokenStorage);

    const dataTimeAtual = new Date();
    const dataTimeToken = new Date(token.expiryDate);

    if (dataTimeAtual < dataTimeToken) {
      this.token = token as TokenSeplag;
      this.token.expiryDate = dataTimeToken;
      return true;
    }
    return false;
  }

  async authorizeSeplag() {
    const authorizationUrl = new URL(`${this.config.urlAuth}/oauth2/authorize`);

    if (this.config.withPKCE) {
      const codeVerifier = this.generateCodeVerifierSeplag();
      const codeChallenge =
        await this.generateCodeChallengeSeplag(codeVerifier);
      localStorage.setItem("code_verifier", codeVerifier);

      authorizationUrl.searchParams.append("code_challenge", codeChallenge);
      authorizationUrl.searchParams.append("code_challenge_method", "S256");
    }

    authorizationUrl.searchParams.append("response_type", "code");
    authorizationUrl.searchParams.append("client_id", this.config.clientId);
    authorizationUrl.searchParams.append(
      "redirect_uri",
      this.config.redirectUri,
    );
    authorizationUrl.searchParams.append(
      "scope",
      this.config.scope ?? "read profile openid write",
    );
    authorizationUrl.searchParams.append("state", "xyz");
    globalThis.location.href = authorizationUrl.toString();
  }

  async exchangeCodeForTokenSeplag(code: string): Promise<boolean> {
    const url = `${this.config.urlAuth}/oauth2/token`;

    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", this.config.redirectUri);

    const config: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    if (this.config.withPKCE) {
      const codeVerifier = localStorage.getItem("code_verifier");
      if (!codeVerifier) {
        console.error("Code verifier not found.");
        return false;
      }
      params.append("client_id", this.config.clientId);
      params.append("code_verifier", codeVerifier);
    } else {
      const credentials = btoa(
        `${this.config.clientId}:${this.config.clientSecret}`,
      );
      config.headers = {
        ...config.headers,
        Authorization: `Basic ${credentials}`,
      };
    }
    config["body"] = params.toString();

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      this.token = (await response.json()) as TokenSeplag;
      this.token.expiryDate = this.calculateExpiryDateSeplag(
        this.token.expires_in,
      );
      localStorage.removeItem("code_verifier");
      localStorage.setItem("tk", JSON.stringify(this.token));
      return true;
    } catch (error) {
      console.error("Failed to obtain token:", error);
      throw error;
    }
  }

  async loadUserInfoSeplag() {
    if (!this.token) {
      throw new Error("Token is not available. Please authenticate first.");
    }

    try {
      const response = await fetch(this.config.userInfoEndpoint, {
        headers: {
          Authorization: `Bearer ${this.token.access_token}`,
        },
      });
      if (!response.ok) {
        if (response.status == 401) {
          localStorage.removeItem("tk");
          this.logoutSeplag();
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Failed to load user info:", error);
      throw error;
    }
  }

  async updateTokenSeplag() {
    if (!this.token?.refresh_token) {
      throw new Error(
        "Refresh token is not available. Please authenticate first.",
      );
    }

    const url = `${this.config.urlAuth}/oauth2/token`;

    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", this.token.refresh_token);

    const credentials = btoa(
      `${this.config.clientId}:${this.config.clientSecret}`,
    );
    const config = {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      this.token = await response.json();
      return this.token;
    } catch (error) {
      console.error("Failed to update token:", error);
      throw error;
    }
  }

  startTokenAutoRefreshSeplag() {
    const refreshBuffer = 60000; // 1 minute before expiration
    const checkInterval = 10000; // Check every 10 seconds

    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }

    this.refreshInterval = globalThis.setInterval(async () => {
      if (
        this.token &&
        new Date() >=
          new Date((this.token.expiryDate?.getTime() ?? 0) - refreshBuffer)
      ) {
        try {
          this.onTokenExpiredSeplag?.();
          // this.updateToken()
        } catch (error) {
          console.error("Failed to update token automatically:", error);
          throw new Error(`HTTP error! Status: ${error}`);
        }
      }
    }, checkInterval);
  }

  generateCodeVerifierSeplag(): string {
    const array = new Uint8Array(32);
    globalThis.crypto.getRandomValues(array);
    return this.base64UrlEncodeSeplag(array);
  }

  async generateCodeChallengeSeplag(codeVerifier: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await globalThis.crypto.subtle.digest("SHA-256", data);

    return this.base64UrlEncodeSeplag(new Uint8Array(digest));
  }

  base64UrlEncodeSeplag(array: Uint8Array): string {
    const base64 = btoa(String.fromCodePoint(...array));
    return base64.replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
  }

  logoutSeplag() {
    const logoutUrl = new URL(`${this.config.urlAuth}/logout`);
    if (this.config.post_logout_redirect_uri) {
      logoutUrl.searchParams.append(
        "post_logout_redirect_uri",
        encodeURIComponent(this.config.post_logout_redirect_uri),
      );
    }

    globalThis.location.href = logoutUrl.toString();
  }
}

export default OAuth2LibSeplag;
