import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Association {
  id?: number;
  name: string;
  description: string;
  email: string;
  phone: number;
  adresse: string;
}

@Injectable({
  providedIn: 'root'
})
export class AssociationService {
  private apiUrl = 'http://localhost:8086/Association';

  constructor(private http: HttpClient) { }

  getAllAssociations(): Observable<Association[]> {
    return this.http.get<Association[]>(`${this.apiUrl}/All`);
  }

  addAssociation(association: Association): Observable<Association> {
    return this.http.post<Association>(`${this.apiUrl}/add`, association);
  }

  deleteAssociation(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}