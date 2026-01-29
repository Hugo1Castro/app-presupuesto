import { Component } from '@angular/core';
import { Ingreso } from './ingreso.model';
import { IngresoService } from './ingreso.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ingreso',
  imports: [CommonModule],
  templateUrl: './ingreso.component.html',
  styleUrl: './ingreso.component.css'
})
export class IngresoComponent {
  ingresos: Ingreso[] = [];
  
  constructor (private ingresoServicio: IngresoService){
    this.ingresos = this.ingresoServicio.ingresos;
  }

  eliminarIngreso(ingreso: Ingreso){
    this.ingresoServicio.eliminar(ingreso);
  }

}
