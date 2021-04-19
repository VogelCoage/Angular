import { Component, OnInit } from '@angular/core';
import { Proveedor } from '../Proveedor';
import { FormsModule } from '@angular/forms';
import { ProveedorService } from '../proveedor.service';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  proveedor: Proveedor = {
    id: 1,
    name: 'Ernesto'
  };

  
  proveedores: Proveedor[];

  constructor(private datosProveedor:ProveedorService) { }

  ngOnInit(): void {
    this.datosProveedor.getProveedores().subscribe((data: any[]) =>
    {
      console.log(data);
      this.proveedores = data;
    })
  }

}
