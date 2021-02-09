import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Type } from '../interfaces/cup.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(`${ this.baseUrl }/api/types`);
  }

  updateType(type: Type) {
    const body = {
      type
    }
    return this.http.put(`${ this.baseUrl }/api/types`, body);
  
  }
  
  createType(type: Type) {
    const body = {
      type
    }
    return this.http.post(`${ this.baseUrl }/api/types`, body);
  }
}
