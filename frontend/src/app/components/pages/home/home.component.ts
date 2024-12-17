import { Component, OnInit } from '@angular/core';
import { Photo } from '../../../shared/models/Photo';
import { PhotoService } from '../../../services/photo.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SearchComponent } from '../../partials/search/search.component';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { PanierService } from '../../../services/panier.service';
import { log } from 'console';
import { NotFoundComponent } from "../../partials/not-found/not-found.component";
import { Observable } from 'rxjs';




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchComponent, NotFoundComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'], // Correction of 'styleUrl' to 'styleUrls'
})
export class HomeComponent implements OnInit {
  photos: Photo[] = [];
  selectedPhoto: Photo | null = null;
  isBrowser: boolean;
  isMessageVisible: boolean = false;



  constructor(
    private photoService: PhotoService,
    activatedRoute: ActivatedRoute,
    private panierService: PanierService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Check if we are in a browser environment
    this.isBrowser = isPlatformBrowser(this.platformId);

    let photosObservable: Observable<Photo[]>;
    activatedRoute.params.subscribe((params) => {
      if (params.searchTerm)
        photosObservable = this.photoService.getAllPhotosBySearchTerm(
          params.searchTerm
        );
      else photosObservable = this.photoService.getAll();

      photosObservable.subscribe((serverPhotos)=>
      {
        this.photos = serverPhotos;
      })
    });
  }

  ngOnInit(): void {}

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
      const currentIndex = this.photos.indexOf(this.selectedPhoto);
      const nextIndex = (currentIndex + 1) % this.photos.length;
      this.selectedPhoto = this.photos[nextIndex];
    }
  }

  // Method to navigate to the previous photo
  previousPhoto(event: Event) {
    event.stopPropagation();
    if (this.selectedPhoto) {
      const currentIndex = this.photos.indexOf(this.selectedPhoto);
      const prevIndex =
        (currentIndex - 1 + this.photos.length) % this.photos.length;
      this.selectedPhoto = this.photos[prevIndex];
    }
  }
  addToPanier(event: Event) {
    event.stopPropagation();

    if (this.selectedPhoto) {
      this.panierService.addToPanier(this.selectedPhoto)
      this.isMessageVisible = true;
    setTimeout(() => {this.isMessageVisible = false;}, 5000);
    }
  }
  
  

  
}
