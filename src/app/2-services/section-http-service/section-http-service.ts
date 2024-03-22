import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class SectionHttpService {
  constructor(private httpClient: HttpClient) {}

    getSections(): Observable<Object> {
        return this.httpClient.get("http://localhost:8090/api/sections");
    }

    getSection(id: number) {
        return this.httpClient.get(`http://localhost:8090/api/sections/${id}`);
    }
}