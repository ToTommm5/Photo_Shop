import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PanierService } from '../../../services/panier.service';
import { PhotoService } from '../../../services/photo.service';
import { Photo } from '../../../shared/models/Photo';

@Component({
  selector: 'app-epreuve-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './epreuve-page.component.html',
  styleUrl: './epreuve-page.component.css',
})
export class EpreuvePageComponent implements OnInit {
  photos: Photo[] = [];
  filteredPhoto: Photo[] = [];
  epreuve: string | null = null;
  selectedPhoto: Photo | null = null;
  isBrowser: boolean;
  isMessageVisible: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private panierService: PanierService,
    private photoService: PhotoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.epreuve = this.route.snapshot.paramMap.get('epreuve');

    this.photoService.getAll().subscribe((photos) => {
      this.photos = photos;

      if (this.epreuve) {
        this.filteredPhoto = this.photos.filter((photo) => {
          //return photo.epreuveid === this.epreuves.id;
        });
      }
    });
  }

  // Method to open the modal
  openModal(photo: Photo) {
    if (this.isBrowser) {
      this.selectedPhoto = photo;
      // Do DOM manipulation if needed, only in browser environment
    }
  }

  // Method to close the modal
  closeModal() {
    this.selectedPhoto = null;
  }

  // Method to navigate to the next photo
  nextPhoto(event: Event) {
    event.stopPropagation();
    if (this.selectedPhoto) {
      const sameEpreuvePhotos = this.filteredPhoto;
      const currentIndex = sameEpreuvePhotos.indexOf(this.selectedPhoto);
      const nextIndex = (currentIndex + 1) % sameEpreuvePhotos.length;
      this.selectedPhoto = sameEpreuvePhotos[nextIndex];
    }
  }

  // Method to navigate to the previous photo
  previousPhoto(event: Event) {
    event.stopPropagation();
    if (this.selectedPhoto) {
      const sameEpreuvePhotos = this.filteredPhoto;
      const currentIndex = sameEpreuvePhotos.indexOf(this.selectedPhoto);
      const prevIndex =
        (currentIndex - 1 + sameEpreuvePhotos.length) %
        sameEpreuvePhotos.length;
      this.selectedPhoto = sameEpreuvePhotos[prevIndex];
    }
  }
  addToPanier(event: Event) {
    event.stopPropagation();

    if (this.selectedPhoto) {
      this.panierService.addToPanier(this.selectedPhoto);
      this.isMessageVisible = true;
      setTimeout(() => {
        this.isMessageVisible = false;
      }, 5000);
    }
  }
}
