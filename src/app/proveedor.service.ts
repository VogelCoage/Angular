import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Proveedor} from '../app/Proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  proveedoresUrl = "http://127.0.0.1:8080/clientes";

  constructor(private http: HttpClient) { }

  public getProveedores()
  {
    return this.http.get<Proveedor[]>(this.proveedoresUrl).pipe(tap(_ => console.log('extrayendo catalogos')), catchError(this.handleError<Proveedor[]>('loadProveedor', [])));
  }

  private handleError<T>(operation = 'operation', result?: T)
  {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
