import { Component, OnInit, inject, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtService } from '../../services/jwt.service';

@Component({
  selector: 'api-iframe',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss'],
  standalone: true,
})
export class ApiComponent implements OnInit {
  iframeSrc: any; 
  private baseUrl = 'https://pixlr.com/editor/?token=';
  private uploadUrl = 'https://53db-2600-1012-a023-259b-34d5-796a-2aee-567f.ngrok-free.app;'; // NGROK service URL to save image -- changes each run
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

  uploadImage(event: Event): void {

    const input = event.target as HTMLInputElement | null; // Explicitly allow null

    if (input && input.files?.length) {

      const file = input.files[0];
      console.log('File selected:', file);

      const formData = new FormData();
      formData.append('file', file);

      const token = this.jwtService.getJwt();  // Get JWT token from  service

      this.http.post(this.uploadUrl, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }).subscribe({
        next: (response) => {
          console.log('Image uploaded successfully', response);
        },
        error: (err) => {
          console.error('Error uploading image', err);
        }
      });
    } else {
      console.error('No file selected');
    }
  }
  
}