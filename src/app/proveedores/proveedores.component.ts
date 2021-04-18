import { Component, OnInit } from '@angular/core';
import { Proveedor } from '../Proveedor';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  proveedor: Proveedor = {
    id: 1,
    name: 'Ernesto'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
