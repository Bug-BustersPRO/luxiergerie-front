import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, WritableSignal, computed, inject, signal } from '@angular/core';
import { Room } from '../models/room.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor() { }

  http = inject(HttpClient);
  cookieService = inject(CookieService);
  private url: string = "http://localhost:8090/api";
  private headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.cookieService.get('jwt-token')
  });
  public getAllRooms$: WritableSignal<Room[]> = signal([]);
  getAllRoomsSig = computed(() => this.getAllRooms$());
  public getAllAvailableRooms$: WritableSignal<Room[]> = signal([]);
  getAllAvailableRoomsSig = computed(() => this.getAllAvailableRooms$());

  public getRoomById!: Room;

  // Room API - call vers le backend

  public getRooms(): void {
    this.http.get<Room[]>(`${this.url}/room`, { headers: this.headers })
      .subscribe({
        next: rooms => this.getAllRooms$.set(rooms),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while fetching rooms")
      });
  }

  public getAvailableRooms(): void {
    this.http.get<Room[]>(`${this.url}/room/available`, { headers: this.headers })
      .subscribe({
        next: rooms => this.getAllAvailableRooms$.set(rooms),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while fetching available rooms")
      });
  }

  public createRooms(room: Room, maxRooms: number): void {
    this.http.post(`${this.url}/room/create-multiple/${maxRooms}`, room, { headers: this.headers })
      .subscribe({
        next: () => console.log("Rooms created successfully"),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while creating rooms")
      });
  }

  public createSpecificRoom(room: Room): void {
    this.http.post(`${this.url}/room`, room, { headers: this.headers })
      .subscribe({
        next: () => console.log("Room created successfully"),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while creating room")
      });
  }

  public updateRoom(room: Room): void {
    this.http.put(`${this.url}/room/${room.id}`, room, { headers: this.headers })
      .subscribe({
        next: () => console.log("Room updated successfully"),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while updating room with id: " + room.id)
      });
  }

  public deleteRoom(id: number): void {
    this.http.delete(`${this.url}/room/${id}`, { headers: this.headers })
      .subscribe({
        next: () => console.log("Room deleted successfully"),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while deleting room with id: " + id)
      });
  }

  public deleteAllRooms(): void {
    this.http.delete(`${this.url}/room/delete-all`, { headers: this.headers })
      .subscribe({
        next: () => console.log("All rooms deleted successfully"),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while deleting all rooms")
      });
  }
}
