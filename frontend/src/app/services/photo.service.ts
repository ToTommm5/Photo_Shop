import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  DATA_URL,
  PHOTO_BY_SEARCH_URL,
  PHOTO_URL,
} from '../shared/constants/urls';
import { Photo } from '../shared/models/Photo';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Photo[]> {
    return this.http.get<Photo[]>(PHOTO_URL);
  }

  getAllPhotosBySearchTerm(searchTerm: string) {
    return this.http.get<Photo[]>(PHOTO_BY_SEARCH_URL + searchTerm);
  }
  getEpreuve(): Observable<any[]> {
    return this.http.get<any>(DATA_URL).pipe(map((data) => data.epreuves));
  }

  getPhotoByEpreuveId(epreuveId: number): Observable<Photo[]> {
    return this.getAll().pipe(
      map((photos) => {
        console.log('Toutes les photos:', photos); // Vérifier toutes les photos récupérées
        const filteredPhotos = photos.filter(
          (photo) => photo.epreuveid === epreuveId // Comparaison avec l'ID en chaîne
        );
        console.log('Photos filtrées:', filteredPhotos); // Vérifier les photos filtrées
        return filteredPhotos;
      })
    );
  }

  getEpreuveByName(epreuveName: string): Observable<any[]> {
    return this.getEpreuve().pipe(
      map((epreuves) => {
        console.log('Epreuves récupérées:', epreuves); // Vérification des données reçues
        return epreuves.filter((epreuve) => epreuve.epreuve === epreuveName);
      })
    );
  }
}
