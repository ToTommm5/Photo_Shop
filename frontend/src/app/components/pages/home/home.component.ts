import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PhotoService } from '../../../services/photo.service';
import { Photo } from '../../../shared/models/Photo';
import { NotFoundComponent } from '../../partials/not-found/not-found.component';
import { SearchComponent } from '../../partials/search/search.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchComponent, NotFoundComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'], // Correction of 'styleUrl' to 'styleUrls'
})
export class HomeComponent implements OnInit {
  photos: Photo[] = [];
  isBrowser: boolean;
  epreuves: string[] = [];

  constructor(
    private photoService: PhotoService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Check if we are in a browser environment
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.photoService.getAll().subscribe((serverPhotos) => {
      this.photos = serverPhotos;
      this.epreuves = this.getUniqueContests(this.photos);
    });
  }

  getUniqueContests(photos: any[]): string[] {
    return [...new Set(photos.map((photo) => photo.epreuve))];
  }

  viewContestPhoto(epreuve: string) {
    if (epreuve != null) {
      this.router.navigate(['/epreuve', epreuve]);
      console.log('ok je vais afficher le concours ' + epreuve + ' !!');
    } else console.log("Pas d'épreuve sélectionnée !");
  }
}
