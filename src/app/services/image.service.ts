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

  getAllImages(): void {
    this.http.get<IImage[]>(`${this.source}`).subscribe({
      next: (response: IImage[]) => {
        this.imageListSignal.set(response); 
      },
      error: (error: any) => {
        console.error('Error fetching all images:', error);
      }
    });
  }

  getAllImagesByUserId(userId: number): void {
    this.http.get<IImage[]>(`${this.source}/user/${userId}`).subscribe({
      next: (response: IImage[]) => {
        this.imageListSignal.set(response);
      },
      error: (error: any) => {
        console.error('Error fetching images:', error);
      }
    });
  }

  uploadImage(file: File): Observable<any> {
    const formData: FormData = new FormData();
     formData.append('file', file);
     const authUser = localStorage.getItem('auth_user'); 
     if (authUser) { 
       const user = JSON.parse(authUser); 
       const userId = user.id;
        formData.append('userId', userId);
        } else { 
         console.error('User not found in localStorage');
        }
   
   return this.http.post(this.source, formData);
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

  postLike(id: number): void {
    this.http.post(`${this.source}/${id}`, {}).subscribe({
      next: () => {
        // Actualizar localmente los likes si es necesario
        const updatedImages = this.imageListSignal().map(image => {
          if (image.id === id) {
            return { ...image, likes: (image.likes || 0) + 1 }; // Incrementar los likes
          }
          return image;
        });
        this.imageListSignal.set(updatedImages);
      },
      error: (error: any) => {
        console.error('Error liking image:', error);
      }
    });
  }

  getLikesById(id: number): Observable<number> {
    return this.http.get<number>(`${this.source}/${id}/likes`); // Asegúrate de que devuelve un número
  }
}

