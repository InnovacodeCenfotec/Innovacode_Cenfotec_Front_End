import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IImage } from '../../interfaces';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-instagram-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './instagram-dashboard.component.html',
  styleUrls: ['./instagram-dashboard.component.scss']
})
export class InstagramDashboardComponent implements OnInit {
  images$ = this.imageService.images$;

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.imageService.getAllImages(); // Cargar todas las imágenes
  }

  // Método para manejar el like de la imagen
  likeImage(id: number): void {
    this.imageService.postLike(id); 
  }

}
