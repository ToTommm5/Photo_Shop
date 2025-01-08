import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { PanierComponent } from './components/pages/panier/panier.component';
import { UploadPageComponent } from './components/pages/upload-page/upload-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search/:searchTerm', component: HomeComponent },
  { path: 'cart-page', component: PanierComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'upload-page', component: UploadPageComponent },
];
