import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { UserService } from "../shared/services/user.service";
import { Client } from "../shared/models/client.model";

@Injectable()

export class ClientFacade {

  constructor(private userService: UserService) { }

  private client: Client[] = [];

  // Création des méthodes liées aux clients depuis le CALL API du UserService

  getAllClients(): Observable<Client[]> {
    return this.userService.getClients().pipe(
      map((client) => {
        this.client = client;
        return client;
      })
    );
  }

  createClient(client: Client): Observable<any> {
    return this.userService.createClient(client);
  }

  addClientToRoom(clientId: number, roleName: string): Observable<any> {
    return this.userService.addClientToRoom(clientId, roleName);
  }
}