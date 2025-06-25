import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-callback',
  template: `<p>Procesando autenticación...</p>`,
})
export class CallbackComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {}

  async ngOnInit(): Promise<void> {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const session = await Auth.currentSession();

      const idToken = session.getIdToken().getJwtToken();
      const accessToken = session.getAccessToken().getJwtToken();
      const refreshToken = session.getRefreshToken().getToken();
      const email = user.signInUserSession.idToken.payload.email;
      sessionStorage.setItem('userEmail', email);  
      await this.saveUserData(email)

      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error durante el callback:', error);
      this.router.navigate(['/login']);
    }
  }

async saveUserData(email: string): Promise<void> {
  return new Promise((resolve, reject) => {
    this.userService.getUser(email).subscribe({
      next: user => {
        console.log("Usuario", user);
        sessionStorage.setItem('userData', JSON.stringify(user));
        resolve();
      },
      error: err => {
        console.error("Error obteniendo usuario", err);
        reject(err);
      }
    });
  });
}
}
