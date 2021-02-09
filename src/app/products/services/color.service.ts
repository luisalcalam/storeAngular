import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Color } from '../interfaces/cup.interface';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getColors(): Observable<Color[]> {
    return this.http.get<Color[]>(`${ this.baseUrl }/api/colors`);
  }

  updateColor(color: Color) {
    const body = {
      color
    }
    return this.http.put(`${ this.baseUrl }/api/colors`, body);
  
  }

  createColor(color: Color) {
    const body = {
      color
    }
    return this.http.post(`${ this.baseUrl }/api/colors`, body);
  }
}
