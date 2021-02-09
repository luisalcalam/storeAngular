import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Cup, cupSale } from '../interfaces/cup.interface';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';

import { map, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CupService {
  private baseUrl: string = environment.baseUrl;
  cupsSale: cupSale[] = [];

  constructor(private http: HttpClient,
    private storage: AngularFireStorage) { }

  getCups(): Observable<Cup[]> {
    return this.http.get<Cup[]>(`${ this.baseUrl }/api/cups`);
  }

  createCup(cup: Cup) {
    const body = {
      cup: cup
    }
    return this.http.post(`${ this.baseUrl }/api/cups`, body);
  }

  updateNumbers() {
    const body = {
      cupsSale: this.cupsSale
    }
    return this.http.put(`${ this.baseUrl }/api/cups/updateNumbers`, body);
  }

  uploadImage(image): AngularFireStorageReference {
    const filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, image);
    task.snapshotChanges();
    return fileRef;
  }
}
