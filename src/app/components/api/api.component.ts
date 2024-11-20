import { Component, OnInit, inject, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtService } from '../../services/jwt.service';

@Component({
  selector: 'api-iframe',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss'],
  standalone: true,
})
export class IframeComponent implements OnInit {
  iframeSrc: any; 
  private baseUrl = 'https://pixlr.com/editor/?token=';
  public jwtService = inject(JwtService);
  
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadIframeWithJwt();
  }

  loadIframeWithJwt() {
    const jwt = this.jwtService.getJwt();
  }

  updateIframeSrc(jwt: string) {
    const url = this.baseUrl + jwt;
    this.iframeSrc = url;
  }
}