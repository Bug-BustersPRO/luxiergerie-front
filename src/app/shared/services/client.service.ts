import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, WritableSignal, computed, signal } from '@angular/core';
import { Client } from '../models/client.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }
  private url: string = "http://localhost:8090/api";
  private getHeaders(): HttpHeaders {
    const token = this.cookieService.get('jwt-token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  private getAllClients$: WritableSignal<Client[]> = signal([]);
  getAllClientsSig = computed(() => this.getAllClients$);
  public getClientById!: Client;

  // Clients API - call vers le backend

  public getAll(): void {
    this.http.get<Client[]>(`${this.url}/client`, { headers: this.getHeaders() })
      .subscribe({
        next: clients => this.getAllClients$.set(clients),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while fetching clients")
      });
  }
  public createClient(client: Client): void {
    this.http.post(`${this.url}/client`, client, { headers: this.getHeaders() })
      .subscribe({
        next: () => console.log("Client created successfully"),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while creating client")
      });
  }

  public addClientToRoom(clientId: number, roleName: string): void {
    this.http.post(`${this.url}/client/add-room/${clientId}/with-role/${roleName}`, roleName, { headers: this.getHeaders() })
      .subscribe({
        next: () => console.log("Client added to room successfully"),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while adding client to room")
      });
  }

}
