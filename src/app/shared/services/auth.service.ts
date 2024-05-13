import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private url: string = "http://localhost:8090/api/auth";
  constructor(private cookieService: CookieService, private http: HttpClient) {}

  // faire une vérification différente quand on est connecté via le serial number de l'employée, la solution est pour le moment uniquement via le client room
  clientLogin(loginClient: LoginClient): Observable<HttpResponse<any>> {
    return this.http.post('http://localhost:8090/api/auth/room/login', loginClient, {
      observe: 'response',
      withCredentials: true
    });
  }

  isUserLoggedIn() {
    const token = this.getToken();
    const headers = {
      'Authorization': token ? `Bearer ${token}` : '',
      'Token': token ? token : ''
    };
    return this.http.get('http://localhost:8090/api/auth/validate-token', {
      observe: 'response',
      headers: headers,
      responseType: 'text'
    }).pipe(
      catchError(error => {
        console.error('Error:', error);
        return of(new HttpResponse({status: 500, statusText: 'Internal Server Error'}));
      })
    );
  }

  
  public login(serialNumber: number, password: string): Observable<any> {
    return this.httpClient.post(`${this.url}/login`, { serialNumber, password, headers: this.headers });
  }
}
  