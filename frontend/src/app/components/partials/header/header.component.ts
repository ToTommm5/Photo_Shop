import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Panier } from '../../../shared/models/Panier';
import { PanierService } from '../../../services/panier.service';
import { User } from '../../../shared/models/User';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  panierQuantity = 0;
  user!: User;
  constructor(panierService: PanierService, private userService: UserService) {
    panierService.getPanierObservable().subscribe((newPanier) => {
      this.panierQuantity = newPanier.totalCount;
    });

    userService.userObserable.subscribe((newUser) => {
      this.user = newUser;
    });
  }
  ngOnInit(): void {}

  logout() {
    this.userService.logout();
  }

  get isAuth(){
    return this.user.token;
  }
}
