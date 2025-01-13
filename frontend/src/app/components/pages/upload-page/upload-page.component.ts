import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-page.component.html',
  styleUrl: './upload-page.component.css',
})
export class UploadPageComponent implements OnInit {
  uploadSuccess: boolean = false;
  uploadError: string | null = null;

  ngOnInit(): void {}

  constructor(private http: HttpClient) {}

  upload_func(event: Event): void {
    event.preventDefault(); //empeche le rechargement de la page

    const form = event.target as HTMLFormElement;
    const formData = new FormData();

    const nameInput = form.querySelector('#name') as HTMLInputElement;
    const fileInput = form.querySelector('#photo') as HTMLInputElement;
    const epreuveInput = form.querySelector('#epreuve') as HTMLInputElement;

    if (
      !nameInput ||
      !fileInput ||
      !epreuveInput ||
      !fileInput.files ||
      fileInput.files.length === 0
    ) {
      this.uploadError =
        'Veuillez remplir le fomulaire correctement et selectionner une photo';
      this.uploadSuccess = false;
      return;
    }
    const name = nameInput.value;
    const file = fileInput.files[0];
    const epreuve = epreuveInput.value;

    formData.append('name', name);
    formData.append('epreuve', epreuve);
    formData.append('photo', file);

    this.http
      .post('http://localhost:5001/api/photos/upload', formData)
      .subscribe({
        next: (response) => {
          console.log('Réponse du serveur', response);
          this.uploadSuccess = true;
          this.uploadError = null;
        },
        error: (error: HttpErrorResponse) => {
          console.error("Erreur lors de l'upload", error);
          this.uploadError = "Echec de l'upload";
          this.uploadSuccess = false;
        },
      });
  }
}
