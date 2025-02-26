import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppUserService {
  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  login(data: any) {
    return this.httpClient.post(this.url + '/appUser/login', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
  addNewAppuser(data: any) {
    return this.httpClient.post(this.url + '/appUser/addNewAppuser', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
  getAllAppuser() {
    return this.httpClient.get(this.url + '/appUser/getAllAppuser');
  }
  updateUser(data: any) {
    return this.httpClient.post(this.url + '/appUser/updateUser', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
  updateUserStatus(data: any) {
    return this.httpClient.post(this.url + '/appUser/updateUserStatus', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
}
