import { Component, OnInit, inject } from '@angular/core';
import { PixlrService } from '../../services/pixlr.service';

@Component({
  selector: 'app-pixlr',
  standalone: true,
  imports: [],
  templateUrl: './pixlr.component.html',
  styleUrl: './pixlr.component.scss'
})
export class PixlrComponent implements OnInit {
  private pixlrService: PixlrService = inject(PixlrService);
  pixlrToken: string | null = null;

  ngOnInit(): void {
    this.fetchPixlrToken();
  }

  fetchPixlrToken() {
    this.pixlrService.getPixlrToken().subscribe({
      next: (token: string) => {
        this.pixlrToken = token;
        console.log('Pixlr token retrieved:', token);
      },
      error: (err) => {
        console.error('Error fetching Pixlr token:', err);
      },
    });
  }

}
