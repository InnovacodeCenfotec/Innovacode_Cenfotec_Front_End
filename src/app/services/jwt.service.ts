import { inject, Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import {  ISearch, Ijwt } from '../interfaces';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
  })
  export class JwtService extends BaseService<Ijwt>{
    protected override source: string = 'jwt';
    private jwtSignal = signal<Ijwt[]>([]);
  

    public search: ISearch = { 
        page: 1,
        size: 10
      }
     public totalItems: any = [];
     
    getJwt(){
        this.findAllWithParams({ page: this.search.page, size: this.search.size}).subscribe({
            next: (response: any) => {
              this.search = {...this.search, ...response.meta};
              this.totalItems = Array.from({length: this.search.totalPages ? this.search.totalPages: 0}, (_, i) => i+1);
              this.jwtSignal.set(response.data);
            },
            error: (err: any) => {
              console.error('error', err);
            }
          });
    }
  