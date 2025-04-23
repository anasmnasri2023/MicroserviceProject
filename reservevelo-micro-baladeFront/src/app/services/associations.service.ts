import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Association {
  id?: number;
  name: string;
  description: string;
  email: string;
  phone: number;
  adresse: string;
}

  export interface Notification {
  id: number;
  message: string;
  read: boolean;
  createdAt: string; // or Date if you convert it later
}


@Injectable({
  providedIn: 'root'
})
export class AssociationsService {
  private apiUrl = 'http://localhost:8086/Association';
  private NotifapiUrl = 'http://localhost:8086/notifications';

  constructor(private http: HttpClient) { }

  getAllAssociations(): Observable<Association[]> {
    return this.http.get<Association[]>(`${this.apiUrl}/All`);
  }

  getAssociationById(id: string): Observable<Association> {
    return this.http.get<Association>(`${this.apiUrl}/${id}`);
  }

  getUnread(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.NotifapiUrl}/unread`);
  }

  markAsRead(id: number): Observable<any> {
    return this.http.post(`${this.NotifapiUrl}/${id}/read`, {});
  }


  addAssociation(association: Association): Observable<Association> {
    return this.http.post<Association>(`${this.apiUrl}/add`, association);
  }


  deleteAssociation(id: number | undefined) {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }



}
