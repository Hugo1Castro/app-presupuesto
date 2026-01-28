import { Injectable } from '@angular/core';
import { Ingreso } from './ingreso.model';

@Injectable({
  providedIn: 'root'
})
export class IngresoService {

 ingresos: Ingreso[] = [
  new Ingreso('Salario', 4000),
  new Ingreso('Venta Coche', 500)

 ]
}
