import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  private url: string = "http://localhost:8090/api"

  // Employee API - call vers le backend

  // Clients API - call vers le backend

  // Roles API - call vers le backend

  // Room API - call vers le backend
}
