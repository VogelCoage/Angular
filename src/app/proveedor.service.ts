import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Proveedor} from './Proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  private proveedor$ = new BehaviorSubject<Proveedor[]>([]);
  private sizeProveedor$ = new BehaviorSubject<number>(-1);

  private tam: number;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  proveedoresUrl = "http://localhost:8080/clientes";
  proveedoresSizeUrl = "http://localhost:8080/clientes/size";

  constructor(private http: HttpClient) { }

  public getProveedores()
  {
    //return this.http.get<Proveedor[]>(this.proveedoresUrl).pipe(tap(_ => console.log('extrayendo catalogos')), catchError(this.handleError<Proveedor[]>('loadProveedor', [])));
    return this.http.get<Proveedor[]>(this.proveedoresUrl).subscribe((proveedores: Array<any>) => {
      this.proveedor$.next(proveedores);
      tam:proveedores ? proveedores.length : 0;
    })
  }

  public getDatos(): BehaviorSubject<Proveedor[]>
  {
    if(this.proveedor$ === undefined)
    {
      this.http.get<Proveedor[]>(this.proveedoresUrl).subscribe((proveedors) => this.proveedor$.next(proveedors));
    }
    this.proveedor$.subscribe(p => console.log(p));
    return this.proveedor$;
  }

  getPagina(proveedorId:number, pageNumber = 0, pageSize = 3): BehaviorSubject<Proveedor[]>
  {
    let params = new HttpParams();
    params = params.append('pagina', pageNumber.toString());
    params = params.append('proveedorId', proveedorId.toString());
    params = params.append('tamanoPag', pageSize.toString());
    this.http.get<Proveedor[]>(this.proveedoresUrl, { params: params }).subscribe((proveedors) => this.proveedor$.next(proveedors));
    this.proveedor$.subscribe(p => console.log(p));
    return this.proveedor$;
  }

  public getSize(): BehaviorSubject<number>
  {
    this.http.get<number>(this.proveedoresSizeUrl).subscribe((tam) => this.sizeProveedor$.next(tam));
    return this.sizeProveedor$;
  }

  private handleError<T>(operation = 'operation', result?: T)
  {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  agregaProveedor(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.post<Proveedor>(this.proveedoresUrl, proveedor, this.httpOptions).pipe(
      tap((newProveedor: Proveedor) => console.log(`added proveedor w/ id = ${ newProveedor.id }`)), 
      catchError(this.handleError<Proveedor>('addProveedor'))
      );
  }
}
