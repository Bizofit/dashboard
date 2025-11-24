/**
 * Authentication Utility
 *
 * Centralized auth management - NO localStorage usage
 * JWT token stored in sessionStorage (cleared on browser close)
 * All user data fetched fresh from API on every request
 */

const TOKEN_KEY = "jwt_token";

export const auth = {
  /**
   * Get JWT token from sessionStorage
   */
  getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  },

  /**
   * Set JWT token in sessionStorage
   */
  setToken(token: string): void {
    sessionStorage.setItem(TOKEN_KEY, token);
  },

  /**
   * Remove JWT token (logout)
   */
  clearToken(): void {
    sessionStorage.removeItem(TOKEN_KEY);
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  /**
   * Make authenticated API request with cache-busting timestamp
   */
  async fetchAPI(url: string, options: RequestInit = {}): Promise<Response> {
    const token = this.getToken();

    if (!token) {
      throw new Error("No authentication token");
    }

    // Add cache-busting timestamp to URL
    const cacheBustUrl = this.addCacheBuster(url);

    return fetch(cacheBustUrl, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
      },
    });
  },

  /**
   * Add cache-busting timestamp to URL
   */
  addCacheBuster(url: string): string {
    const timestamp = Date.now();
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}_t=${timestamp}`;
  },

  /**
   * Fetch current user profile from API (always fresh data with cache-busting)
   */
  async getCurrentUser(): Promise<any> {
    const response = await this.fetchAPI("/api/auth/profile");
    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to fetch user profile");
    }

    return data.data;
  },
};
