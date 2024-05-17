import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';
import { Role } from '../models/role.model';
import { Room } from '../models/room.model';
import {CookieService} from "ngx-cookie-service";

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


}
