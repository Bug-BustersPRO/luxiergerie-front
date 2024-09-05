import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, WritableSignal, computed, signal } from '@angular/core';
import { Room } from '../models/room.model';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}
  private url: string = `${environment.apiUrl}/rooms`;
  private getHeaders(): HttpHeaders {
    const token = this.cookieService.get('jwt-token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  }
  private getAllRooms$: WritableSignal<Room[]> = signal([]);
  getAllRoomsSig = computed(() => this.getAllRooms$());
  private getAllAvailableRooms$: WritableSignal<Room[]> = signal([]);
  getAllAvailableRoomsSig = computed(() => this.getAllAvailableRooms$());
  getOccupiedRoomsSig = computed(() => this.getAllRooms$().filter((room) => room.client !== null && room.sojourns?.length !== 0));

  // Room API - call vers le backend

  //GET
  public getRooms(): void {
    this.http.get<Room[]>(`${this.url}`, {headers: this.getHeaders()}).subscribe({
      next: (rooms) => this.getAllRooms$.set(rooms),
      error: (error: HttpErrorResponse) => console.log(error, 'There was an error while fetching rooms'),
    });
  }

  public getAvailableRooms(): void {
    this.http.get<Room[]>(`${this.url}/available`, {headers: this.getHeaders()}).subscribe({
      next: (rooms) => this.getAllAvailableRooms$.set(rooms),
      error: (error: HttpErrorResponse) => console.log(error, 'There was an error while fetching available rooms'),
    });
  }

  public getRoomById(id: Room | null): Observable<Room> {
    return this.http.get<Room>(`${this.url}/${id}`, {headers: this.getHeaders()});
  }

  // Create
  public createRooms(room: Room, maxRooms: number): void {
    this.http.post(`${this.url}/create-multiple/${maxRooms}`, room, {headers: this.getHeaders()}).subscribe({
      next: () => console.log('Rooms created successfully'),
      error: (error: HttpErrorResponse) => console.log(error, 'There was an error while creating rooms'),
    });
  }

  public createSpecificRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(`${this.url}`, room, {headers: this.getHeaders()});
  }

  // Update
  public updateRoom(room: Room): Observable<Room> {
    return this.http.put<Room>(`${this.url}/${room.id}`, room, {headers: this.getHeaders()});
  }

  // Delete

  public deleteRoom(id: string): Observable<Room> {
    return this.http.delete<Room>(`${this.url}/${id}`, {headers: this.getHeaders()});
  }

  public deleteAllRooms(): void {
    this.http.delete(`${this.url}/delete-all`, {headers: this.getHeaders()}).subscribe({
      next: () => console.log('All rooms deleted successfully'),
      error: (error: HttpErrorResponse) => console.log(error, 'There was an error while deleting all rooms'),
    });
  }
}
