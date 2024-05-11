import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, WritableSignal, computed, inject, signal } from '@angular/core';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor() { }

  public http = inject(HttpClient);
  private url: string = "http://localhost:8090/api";
  private headers = new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('jwt-token')
  });
  public getAllClients$: WritableSignal<Client[]> = signal([]);
  getAllClientsSig = computed(() => this.getAllClients$);
  public getClientById!: Client;

  // Clients API - call vers le backend

  public getAll(): void {
    this.http.get<Client[]>(`${this.url}/client`, { headers: this.headers })
      .subscribe({
        next: clients => this.getAllClients$.set(clients),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while fetching clients")
      });
  }
  public createClient(client: Client): void {
    this.http.post(`${this.url}/client`, client, { headers: this.headers })
      .subscribe({
        next: () => console.log("Client created successfully"),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while creating client")
      });
  }

  public addClientToRoom(clientId: number, roleName: string): void {
    this.http.post(`${this.url}/client/add-room/${clientId}/with-role/${roleName}`, roleName, { headers: this.headers })
      .subscribe({
        next: () => console.log("Client added to room successfully"),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while adding client to room")
      });
  }

}
