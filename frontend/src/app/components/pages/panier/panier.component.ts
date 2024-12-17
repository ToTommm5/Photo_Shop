import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Panier } from '../../../shared/models/Panier';
import { PanierService } from '../../../services/panier.service';
import { PanierItem } from '../../../shared/models/PanierItem';
import { TitleComponent } from '../../partials/title/title.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [TitleComponent, CommonModule, RouterModule],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css',
})
export class PanierComponent implements OnInit {
  ngOnInit(): void {}

  panier!: Panier;

  constructor(private panierService: PanierService, private router: Router) {
    this.panierService.getPanierObservable().subscribe((panier) => {
      this.panier = panier;
    });
  }
  removeFromPanier(panierItem: PanierItem) {
    this.panierService.removeFromPanier(panierItem.photo.id);
  }
  changeQuantity(panierItem: PanierItem, quantityInString: string) {
    const quantity = parseInt(quantityInString);
    this.panierService.changeQuantity(panierItem.photo.id, quantity);
  }
  changeSize(panierItem: PanierItem, sizeInString: string) {
    const size = sizeInString;
    this.panierService.changeSize(panierItem.photo.id, size);
  }

  goToHome() {
    this.router.navigateByUrl('/');
  }
}
