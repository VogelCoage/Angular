import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Proveedor } from '../Proveedor';
import { FormsModule } from '@angular/forms';
import { ProveedorService } from '../proveedor.service';
import { RecursiveTemplateAstVisitor } from '@angular/compiler';
import { MatCard } from '@angular/material/card';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['id', 'name'];
  exampleDatabase: ProveedorService | null;
  proveedores = new BehaviorSubject<Proveedor[]>([]);
  userData: Observable<Proveedor[]>;

  resultsLength: number = 5;
  isLoadingResults = true;
  isRateLimitRached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  selectedProveedor?: Proveedor;

  /*public proveedor = {
    id: 0,
    name: "",    
    type: "",
    saldo: 0,
    estado: "string"
  }
  proveedores: Proveedor[];*/

  constructor(private datosProveedor:ProveedorService)
  { 
    this.datosProveedor.getProveedores();
    this.proveedores = this.datosProveedor.getDatos();
    this.datosProveedor
    .getSize()
    .subscribe(id => this.resultsLength = id);
  }

  ngOnInit(): void {
    this.datosProveedor.getProveedores();
    this.proveedores = this.datosProveedor.getDatos();
    this.datosProveedor
    .getSize()
    .subscribe(id => this.resultsLength = id);
    console.log("size: " + this.resultsLength);
  }

  resetPaging(): void {
    this.paginator.pageIndex = 0;
  }

  onRowClicked(row){
    if(this.selectedProveedor === undefined)
    {
      this.selectedProveedor = <Proveedor>{};
    }
    this.selectedProveedor.name = row.name;
    this.selectedProveedor.id = row.id;
    console.log('Row clicked: ', row);
  }

  ngAfterViewInit(){
    this.paginator.page
    .pipe(
      tap(() => this.cargaProveedoresPage())
      )
      .subscribe();
  }

  onSelect(proveedor: Proveedor): void {
    this.selectedProveedor = proveedor;
  }

  agregar(name: string, id: number): void {
    name = name.trim();

    var newProveedor = <Proveedor>{};

    newProveedor.id = id;
    newProveedor.name = name;
    newProveedor.type = "proveedor";
    newProveedor.saldo = 0;
    newProveedor.estado = "nuevo";

    if(!name){return;}

    this.datosProveedor.agregaProveedor(newProveedor);
    this.datosProveedor
    .getSize()
    .subscribe(id => this.resultsLength = id);
  }
    /*{
      this.proveedores.push(proveedor);
    });
  }*/

  cargaProveedoresPage()
  {
    this.datosProveedor.getPagina(
      1,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }
}
