import { Component, Input } from '@angular/core';
import { ImageComponent } from "../image/image.component";
import { CommonModule } from '@angular/common';
import { IImage, IUser } from '../../interfaces';

@Component({
  selector: 'app-image-generator',
  standalone: true,
  imports: [ImageComponent, CommonModule],
  templateUrl: './image-generator.component.html',
  styleUrl: './image-generator.component.scss'
})
export class ImageGeneratorComponent {
  @Input() rows: IImage[][] = [];

}

