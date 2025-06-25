import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userApiUrl = `${environment.apiUrl}/user`;

  constructor(private http: HttpClient) {}

  getUser(email: string): Observable<User> {
    const url = `${this.userApiUrl}/${email}`;
    return this.http.get<any[]>(url).pipe(
      map((users) => {
        const item = users[0];
        return {
          createdAt: item.createdAt,
          userId: item.user_id,
          email: item.email,
          name: item.name,
          estado: item.estado,
        } as User;
      })
    );
  }
}
