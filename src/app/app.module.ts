import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { ProveedorDetalleComponent } from './proveedor-detalle/proveedor-detalle.component';

@NgModule({
  declarations: [
    AppComponent,
    ProveedoresComponent,
    ProveedorDetalleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
