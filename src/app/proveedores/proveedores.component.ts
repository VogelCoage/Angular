import { Component, OnInit } from '@angular/core';
import { Proveedor } from '../Proveedor';
import { FormsModule } from '@angular/forms';
import { ProveedorService } from '../proveedor.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  selectedProveedor: Proveedor;
  public proveedor = {
    id: 0,
    name: "",    
    type: "",
    saldo: 0,
    estado: "string"
  }
  proveedores: Proveedor[];

  constructor(private datosProveedor:ProveedorService) { }

  ngOnInit(): void {
    this.datosProveedor.getProveedores().subscribe((data: any[]) =>
    {
      console.log(data);
      this.proveedores = data;
    })
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

    this.datosProveedor.agregaProveedor(newProveedor)
    .subscribe(proveedor => {
      this.proveedores.push(proveedor);
    });
  }
}
