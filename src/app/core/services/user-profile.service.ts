import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile } from '../../shared/models/user-profile.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private baseURL = `${environment.baseURL}/user/profile`;
  private http = inject(HttpClient);
  
  getUserProfile(userId: number): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.baseURL}/${userId}`);
  }

  updateUserProfile(userId: number, profileData: UserProfile): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.baseURL}/${userId}`, profileData);
  }
}
