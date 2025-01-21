import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  epreuveName: string | null = null;
  photos: Photo[] = [];
  isBrowser: any;
  selectedPhoto: Photo | null = null;
  isMessageVisible: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private panierService: PanierService
  ) {}

  ngOnInit(): void {
    // Récupérer le nom de l'épreuve depuis les paramètres de la route
    this.route.paramMap.subscribe((params) => {
      this.epreuveName = params.get('epreuve'); // Récupérer le nom de l'épreuve

      if (this.epreuveName) {
        // Vérifier que epreuveName n'est pas null
        // Appeler la méthode du service pour obtenir l'épreuve par son nom
        this.photoService
          .getEpreuveByName(this.epreuveName)
          .subscribe((epreuves) => {
            if (epreuves.length > 0) {
              const epreuve = epreuves[0]; // Prendre la première épreuve trouvée (car `getEpreuveByName` retourne un tableau)

              // Maintenant, vous pouvez récupérer les photos liées à cette épreuve
              this.photoService
                .getPhotoByEpreuveId(+epreuve.id)
                .subscribe((photos) => {
                  this.photos = photos;
                  console.log(this.photos);
                });
            }
          });
      }
    });
  }

  // Method to open the modal
  openModal(photo: Photo) {
    this.selectedPhoto = photo;
    console.log('selected photo', this.selectedPhoto);
    // Do DOM manipulation if needed, only in browser environment
  }

  // Method to close the modal
  closeModal() {
    this.selectedPhoto = null;
  }

  // Method to navigate to the next photo
  nextPhoto(event: Event) {
    event.stopPropagation();
    if (this.selectedPhoto) {
      const sameEpreuvePhotos = this.photos;
      const currentIndex = sameEpreuvePhotos.indexOf(this.selectedPhoto);
      const nextIndex = (currentIndex + 1) % sameEpreuvePhotos.length;
      this.selectedPhoto = sameEpreuvePhotos[nextIndex];
    }
  }

  // Method to navigate to the previous photo
  previousPhoto(event: Event) {
    event.stopPropagation();
    if (this.selectedPhoto) {
      const sameEpreuvePhotos = this.photos;
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
