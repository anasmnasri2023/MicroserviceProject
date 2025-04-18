import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Balade {
  id?: string;
  title: string;
  description: string;
  location: string;
  date: Date;
  duration: number;
  programmeBalade: number; // à changer si programmeBalade devient un objet
}

@Injectable({
  providedIn: 'root'
})
export class BaladeserviceService {
  private apiUrl = 'http://localhost:8082/balade';

  constructor(private http: HttpClient) {}

  // ✅ Récupérer toutes les balades
  getAllBalades(): Observable<Balade[]> {
    return this.http.get<Balade[]>(this.apiUrl);
  }

  // ✅ Récupérer une balade par ID
  getBaladeById(id: string): Observable<Balade> {
    return this.http.get<Balade>(`${this.apiUrl}/${id}`);
  }

  // ✅ Ajouter une balade (avec programmeBalade associé)
  addBalade(balade: Balade, programmeId: string): Observable<Balade> {
    return this.http.post<Balade>(`${this.apiUrl}?pgId=${programmeId}`, balade);
  }

  // ✅ Modifier une balade
  updateBalade(balade: Balade): Observable<Balade> {
    return this.http.put<Balade>(`${this.apiUrl}/${balade.id}`, balade);
  }

  // ✅ Supprimer une balade
  deleteBalade(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
