import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Association} from './associations.service';

export interface Programme {
  id?: number;
  startingPoint: string;
  departureTime: string;
  remarks: string;
  weatherCondition?: string;
  temperature?: number;
  weatherIcon?: string;

}

@Injectable({
  providedIn: 'root'
})
export class ProgrammeService {

  private apiUrl = 'http://localhost:8080/prog';

  constructor(private http: HttpClient) { }

  getAllProgramme(): Observable<Programme[]> {
    return this.http.get<Programme[]>(`${this.apiUrl}/all`);
  }

  getProgramById(id: string): Observable<Programme> {
    return this.http.get<Programme>(`${this.apiUrl}/${id}`);
  }

  getProgramWithWeather(id: string): Observable<Programme> {
    return this.http.get<Programme>(`${this.apiUrl}/${id}/weather`);
  }

  addProgramme(prog: Programme): Observable<Programme> {
    return this.http.post<Programme>(`${this.apiUrl}/save`, prog);
  }


  deleteProgramme(id: number | undefined) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, { responseType: 'text' });
  }
}
