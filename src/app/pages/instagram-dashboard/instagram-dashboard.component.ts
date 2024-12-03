import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { IImage } from '../../interfaces';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-instagram-dashboard',
  standalone: true,
  imports: [CommonModule], // Include CommonModule
  templateUrl: './instagram-dashboard.component.html',
  styleUrls: ['./instagram-dashboard.component.scss']
})
export class InstagramDashboardComponent implements OnInit {
  images$ = this.imageService.images$;
  favorites: number[] = [];

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.imageService.getAllImages();
  }

  toggleFavorite(index: number): void {
    if (this.favorites.includes(index)) {
      this.favorites = this.favorites.filter(fav => fav !== index);
    } else {
      this.favorites.push(index);
    }
  }
}
