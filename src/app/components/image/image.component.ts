import { Component, EventEmitter, Input, OnInit, Output, ViewChild, computed, inject } from '@angular/core';
import { IImage, IUser } from '../../interfaces';
import { ImageService } from '../../services/image.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ModalComponent } from "../modal/modal.component";
import { ModalService } from '../../services/modal.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image',
  standalone: true,
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
  imports: [ModalComponent, CommonModule]
})
export class ImageComponent implements OnInit{
  @Input() image: IImage | null = null; 
  userId: number = 0;
  imageSize: string | null = null;
  formattedDate: string = '';
  public modalService: ModalService = inject(ModalService);
  @ViewChild('showImageModal') public showImageModal: any;
  imageDelete: boolean = false;

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

  public downloadImage(): void {
    if (this.image?.url) {
      this.http.get(this.image.url, { responseType: 'blob' }).subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', this.image?.name || 'downloaded-image.png');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        },
        error: (error) => {
          console.error('Error downloading the image:', error);
        }
      });
    }
  }
  
  
  deleteImage() {
    if (!this.image || !this.image.id) return;
    this.imageService.deleteImage(this.image.id);
    this.modalService.closeAll();
    this.imageDelete = true;
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
}
