import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CabeceraComponent } from "./cabecera/cabecera.component";
import { FormularioComponent } from "./formulario/formulario.component";
import { IngresoComponent } from "./ingreso/ingreso.component";
import { EgresoComponent } from "./egreso/egreso.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CabeceraComponent, FormularioComponent, IngresoComponent, EgresoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app-presupuesto';
}
