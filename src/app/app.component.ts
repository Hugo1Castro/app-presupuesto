import { Component } from '@angular/core';
import { CabeceraComponent } from "./cabecera/cabecera.component";
import { FormularioComponent } from "./formulario/formulario.component";
import { IngresoComponent } from "./ingreso/ingreso.component";
import { EgresoComponent } from "./egreso/egreso.component";
import { Ingreso } from './ingreso/ingreso.model';
import { Egreso } from './egreso/egreso.model';
import { IngresoService } from './ingreso/ingreso.service';
import { EgresoService } from './egreso/egreso.service';

@Component({
  selector: 'app-root',
  imports: [CabeceraComponent, FormularioComponent, IngresoComponent, EgresoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  ingresos: Ingreso[] = [];
  egresos: Egreso[] = [];

  constructor(
    private ingresoServicio: IngresoService,
    private egresoServicio: EgresoService
  ){
    this.ingresos = ingresoServicio.ingresos;
    this.egresos = egresoServicio.egresos;
  }

  getIngresoTotal(){
    let ingresoTotal: number = 0;
    this.ingresos.forEach(ingreso =>{
      ingresoTotal += ingreso.valor;
    });
    return ingresoTotal;
  }
  getEgresoTotal(){
    let egresoTotal: number = 0;
    this.egresos.forEach(egreso => {
      egresoTotal += egreso.valor;
    });
    return egresoTotal;
  }

  getPorcentajeTotal(){   
  const totalIngresos = this.getIngresoTotal();
  return totalIngresos > 0 ? this.getEgresoTotal() / totalIngresos : 0;
  }
    

  getPresupuestoTotal(){
    return this.getIngresoTotal() - this.getEgresoTotal();
  }
}

