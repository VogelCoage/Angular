import { Component, Input, OnInit } from '@angular/core';
import { Proveedor } from '../Proveedor';

@Component({
  selector: 'app-proveedor-detalle',
  templateUrl: './proveedor-detalle.component.html',
  styleUrls: ['./proveedor-detalle.component.css']
})
export class ProveedorDetalleComponent implements OnInit {

  @Input() proveedor?: Proveedor;

  constructor() { }

  ngOnInit(): void {
  }

}
