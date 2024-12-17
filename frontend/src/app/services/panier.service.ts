import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Panier } from '../shared/models/Panier';
import { BehaviorSubject, Observable } from 'rxjs';
import { Photo } from '../shared/models/Photo';
import { PanierItem } from '../shared/models/PanierItem';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PanierService {
  private panier: Panier = new Panier();
  private panierSubject: BehaviorSubject<Panier> = new BehaviorSubject(this.panier);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      // Si nous sommes côté navigateur, chargez le panier depuis localStorage
      this.panier = this.getPanierFromLocalStorage();
      this.panierSubject.next(this.panier);
    }
  }

  addToPanier(photo: Photo): void {
    let panierItem = this.panier.items.find(
      (item) => item.photo.id === photo.id
    );
    if (panierItem) return;

    this.panier.items.push(new PanierItem(photo));
    this.setPanierToLocalStorage();
  }

  removeFromPanier(photoId: string): void {
    this.panier.items = this.panier.items.filter(
      (item) => item.photo.id != photoId
    );
    this.setPanierToLocalStorage();
  }

  changeQuantity(photoId: string, quantity: number): void {
    let panierItem = this.panier.items.find(
      (item) => item.photo.id === photoId
    );
    if (!panierItem) return;
    panierItem.quantity = quantity;
    this.setPanierToLocalStorage();
  }

  changeSize(photoId: string, size: string): void {
    let panierItem = this.panier.items.find(
      (item) => item.photo.id === photoId
    );
    if (!panierItem) return;
    panierItem.size = size;
    this.setPanierToLocalStorage();
  }

  clearPanier() {
    this.panier = new Panier();
    this.setPanierToLocalStorage();
  }

  getPanierObservable(): Observable<Panier> {
    return this.panierSubject.asObservable();
  }

  private setPanierToLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.panier.totalPrice = this.panier.items.reduce(
        (prevSum, currentItem) =>
          prevSum + currentItem.price * currentItem.quantity,
        0
      );
      this.panier.totalCount = this.panier.items.reduce(
        (prevSum, currentItem) => prevSum + currentItem.quantity,
        0
      );
      const panierJson = JSON.stringify(this.panier);
      localStorage.setItem('Panier', panierJson);
      this.panierSubject.next(this.panier);
    }
  }

  private getPanierFromLocalStorage(): Panier {
    if (isPlatformBrowser(this.platformId)) {
      const panierJson = localStorage.getItem('Panier');
      return panierJson ? JSON.parse(panierJson) : new Panier();
    }
    return new Panier(); // Valeur par défaut si localStorage n'est pas disponible
  }
}
