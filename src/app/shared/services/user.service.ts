import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';
import { Role } from '../models/role.model';
import { Room } from '../models/room.model';
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }

  private url: string = "http://localhost:8090/api";

  // faire une vérification différente quand on est connecté via le serial number de l'employée, la solution est pour le moment uniquement via le client room
  private headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.cookieService.get('jwt-token')
  });

  // Employee API - call vers le backend

  public getEmployees(): Observable<any> {
    return this.httpClient.get(`${this.url}/employee`, { headers: this.headers });
  }

  public getRolesById(id: number): Observable<any> {
    return this.httpClient.get(`${this.url}/employee/${id}/roles`, { headers: this.headers });
  }

  public getEmployeeById(id: number): Observable<any> {
    return this.httpClient.get(`${this.url}/employee/${id}`, { headers: this.headers });
  }

  // Clients API - call vers le backend

  public getClients(): Observable<any> {
    return this.httpClient.get(`${this.url}/client`, { headers: this.headers });
  }

  public createClient(client: Client): Observable<any> {
    return this.httpClient.post(`${this.url}/client`, client, { headers: this.headers });
  }

  public addClientToRoom(clientId: number, roleName: string): Observable<any> {
    return this.httpClient.post(`${this.url}/client/add-room/${clientId}/with-role/${roleName}`, roleName, { headers: this.headers });
  }

  // Roles API - call vers le backend

  public getRoles(): Observable<any> {
    return this.httpClient.get(`${this.url}/role`, { headers: this.headers });
  }

  public getRoleById(id: number): Observable<any> {
    return this.httpClient.get(`${this.url}/role/${id}`, { headers: this.headers });
  }

  public addNewRole(role: Role): Observable<any> {
    return this.httpClient.post(`${this.url}/role`, role, { headers: this.headers });
  }

  public updateRole(role: Role): Observable<any> {
    return this.httpClient.put(`${this.url}/role/${role.id}`, role, { headers: this.headers });
  }

  public deleteRole(id: number): Observable<any> {
    return this.httpClient.delete(`${this.url}/role/${id}`, { headers: this.headers });
  }

  // Room API - call vers le backend

  public getRooms(): Observable<any> {
    return this.httpClient.get(`${this.url}/room`, { headers: this.headers });
  }

  public getAvailableRooms(): Observable<any> {
    return this.httpClient.get(`${this.url}/room/available`, { headers: this.headers });
  }

  public createRooms(room: Room, maxRooms: number): Observable<any> {
    return this.httpClient.post(`${this.url}/create-multiple/${maxRooms}`, room, { headers: this.headers });
  }

  public createSpecificRoom(room: Room): Observable<any> {
    return this.httpClient.post(`${this.url}/room`, room, { headers: this.headers });
  }

  public updateRoom(room: Room): Observable<any> {
    return this.httpClient.put(`${this.url}/room/${room.id}`, room, { headers: this.headers });
  }

  public deleteRoom(id: number): Observable<any> {
    return this.httpClient.delete(`${this.url}/room/${id}`, { headers: this.headers });
  }

  public deleteAllRooms(): Observable<any> {
    return this.httpClient.delete(`${this.url}/room/delete-all`, { headers: this.headers });
  }
}
