// Adjusted import to handle ES Module compatibility issues with jwt-decode
import * as jwtDecode from 'jwt-decode';

class AuthService {
  // Get user data from JSON web token by decoding it
  getProfile() {
    const token = this.getToken();
    // Make sure to check if jwtDecode.default exists; if not, use jwtDecode directly
    return token ? (jwtDecode.default ? jwtDecode.default(token) : jwtDecode(token)) : null;
  }

  // Return `true` or `false` if token exists (does not verify if it's expired yet)
  loggedIn() {
    const token = this.getToken();
    return !!token; // A concise way to return a boolean based on the token's presence
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('authToken');
  }

  login(idToken) {
    // Saves user token to localStorage and reloads the application for logged-in status to take effect
    localStorage.setItem('authToken', idToken);
    window.location.assign('/');
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('authToken');
    // Reload the page to reset the state of the application
    window.location.reload();
  }
}

export default new AuthService();
