import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PixlrService {

  private http: HttpClient = inject(HttpClient);
  private pixlrTokenEndpoint = '/api'; //  based on  backend endpoint

  constructor() {}

  getPixlrToken(): Observable<string> {
    return this.http.get<string>(this.pixlrTokenEndpoint);
  }
}
