// Adjusted import to handle ES Module compatibility issues with jwt-decode
import * as jwtDecode from 'jwt-decode';

class AuthService {
  // Get user data from JSON web token by decoding it
  getProfile() {
    const token = this.getToken();
    return token ? jwtDecode(token) : null;
  }

  // Check if the user is logged in
  loggedIn() {
    const token = this.getToken();
    return !!token;
  }

  // Retrieve the authentication token from localStorage
  getToken() {
    return localStorage.getItem('authToken');
  }

  // Save the authentication token to localStorage
  login(idToken) {
    localStorage.setItem('authToken', idToken);
    window.location.assign('/');
  }

  // Remove the authentication token from localStorage
  logout() {
    localStorage.removeItem('authToken');
    window.location.assign('/login');
  }
}

export default new AuthService();
