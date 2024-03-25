import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RwdFiretoolsService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any>{
    return this.http.request('GET', 'https://getuserlists-p2s5gaqflq-uc.a.run.app/', {
      responseType: 'json'
    })
  }
}
