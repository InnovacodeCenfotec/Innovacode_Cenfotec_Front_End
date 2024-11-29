import { Component, OnInit, inject, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'api-iframe',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss'],
  standalone: true,
})
export class ApiComponent implements OnInit {
  iframeSrc: any; 
  private baseUrl = 'https://pixlr.com/editor/?token=';
 
  public jwtService = inject(AuthService);
  
  constructor(private http: HttpClient) {}

  ngOnInit() {
    const imageid = localStorage.getItem('image_ID');
    if (imageid !== null) {
    const numericImageId = parseInt(imageid, 10);
    const jwt = this.jwtService.getImageToken(numericImageId);
    this.iframeSrc = this.baseUrl + jwt;
    } else { console.error('El ID de la imagen es nulo'); }

  }
  
}