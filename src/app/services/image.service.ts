import { Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { IImage } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService extends BaseService<IImage>{
  protected override source: string = 'cloudinary'; 
  private imageListSignal = signal<IImage[]>([]);

  get images$() {
    return this.imageListSignal;
  }

  getAllImagesByUserId(userId: number): void {
    this.http.get<IImage[]>(`${this.source}user/${userId}`).subscribe({
      next: (response: IImage[]) => {
        this.imageListSignal.set(response);
      },
      error: (error: any) => {
        console.error('Error fetching images:', error);
      }
    });
  }

  

  deleteImage(id: number): void {
    this.http.delete(`${this.source}${id}`).subscribe({
      next: () => {
        const updatedImages = this.imageListSignal().filter(image => image.id !== id);
        this.imageListSignal.set(updatedImages);
      },
      error: (error: any) => {
        console.error('Error deleting image:', error);
      }
    });
  }
}
