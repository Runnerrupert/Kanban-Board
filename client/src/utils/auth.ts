import { JwtPayload, jwtDecode } from 'jwt-decode';
import type { UserData } from '../interfaces/UserData';


class AuthService {
  // Returns the decoded JWT token
  getProfile() {
    return jwtDecode<UserData>(this.getToken());
  }

  // Creates a new token variable that gets the JWT token if there is one, returns a boolean for whether or not the token is expired or active
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  // Checks if the token given is expired or not using jwtDecode
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded?.exp && decoded?.exp < Date.now() / 1000) {
        return true;
      }
    } catch (err) {
      return false;
    }
  }

  // Gets the token saved in local storage and returns it
  getToken(): string {
    const loggedUser = localStorage.getItem('id_token') || '';
    return loggedUser;
  }

  // Sets the token in local storage and reassigns the users page to the "Board" page
  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  // Removes the token from local storage and returns the user to the "Board" page
  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();