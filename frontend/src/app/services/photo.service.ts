import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PHOTO_BY_SEARCH_URL, PHOTO_URL } from '../shared/constants/urls';
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
}
