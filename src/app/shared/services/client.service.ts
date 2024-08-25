import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, WritableSignal, computed, signal } from '@angular/core';
import { Client } from '../models/client.model';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }
  private url: string = `${environment.apiUrl}/client`;
  private getHeaders(): HttpHeaders {
    const token = this.cookieService.get('jwt-token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  private getAllClients$: WritableSignal<Client[]> = signal([]);
  getAllClientsSig = computed(() => this.getAllClients$());
  getClientsWithNoRoom$ = computed(() => this.getAllClients$().filter(client => client.room === null));

  // Clients API - call vers le backend

  // Get

  public getAll(): void {
    this.http.get<Client[]>(`${this.url}`, { headers: this.getHeaders() })
      .subscribe({
        next: clients => this.getAllClients$.set(clients),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while fetching clients")
      });
  }

  public getClientById(id: string): Observable<Client> {
    return this.http.get<Client>(`${this.url}/${id}`, { headers: this.getHeaders() });
  }

  // Create
  public createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.url}`, client, { headers: this.getHeaders() })
  }

  public addClientToRoom(clientId: number, roleName: string): void {
    this.http.post(`${this.url}/add-room/${clientId}/with-role/${roleName}`, roleName, { headers: this.getHeaders() })
      .subscribe({
        next: () => console.log("Client added to room successfully"),
        error: (error: HttpErrorResponse) => console.log(error, "There was an error while adding client to room")
      });
  }

  //Update
  public updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.url}/${client.id}`, client, { headers: this.getHeaders() })
  }

  // Delete
  public deleteClient(client: Client): Observable<any> {
    return this.http.delete(`${this.url}/${client.id}`, { headers: this.getHeaders() })
  }

}