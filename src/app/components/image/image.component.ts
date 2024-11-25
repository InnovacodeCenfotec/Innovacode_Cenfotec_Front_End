import { Component, Input, OnInit, computed } from '@angular/core';
import { IImage, IUser } from '../../interfaces';
import { ImageService } from '../../services/image.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ModalComponent } from "../modal/modal.component";

@Component({
  selector: 'app-image',
  standalone: true,
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
  imports: [ModalComponent]
})
export class ImageComponent implements OnInit{
  @Input() image: IImage | null = null;
  userId: number = 0;
  imageSize: string | null = null;
  formattedDate: string = '';

  constructor(private imageService: ImageService, public router: Router, private http: HttpClient) {
    const user = localStorage.getItem('auth_user');
    if (user) {
      this.userId = JSON.parse(user)?.id;
    } 
  }

  ngOnInit() {
    if (this.image?.url) {
      this.getImageSize(this.image.url);
      if (this.image?.createDate) {
        const date = new Date(this.image.createDate);
        this.formattedDate = date.toLocaleDateString(); 
      }
    }
  }

  verDetalle(modal: any) {
    modal.show();
  }

  getImageSize(url: string): void {
    this.http.head(url, { observe: 'response' }).subscribe(response => {
      const contentLength = response.headers.get('Content-Length');
      if (contentLength) {
        this.imageSize = this.formatBytes(parseInt(contentLength, 10));
      }
    });
  }

  formatBytes(bytes: number): string {
    const kb = bytes / 1024;
    return kb < 1024 ? `${kb.toFixed(2)} KB` : `${(kb / 1024).toFixed(2)} MB`;
  }
}
