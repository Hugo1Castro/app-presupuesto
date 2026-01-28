import { Injectable } from '@angular/core';
import { Ingreso } from './ingreso.model';

@Injectable({
  providedIn: 'root'
})
export class IngresoService {

 ingresos: Ingreso[] = [
  new Ingreso('Salario', 4000),
  new Ingreso('Venta Coche', 500)

 ];

 eliminar(ingreso: Ingreso){
  const indice: number = this.ingresos.indexOf(ingreso);
  if (indice !== -1) { // ¡Solo borra si realmente lo encontró!
  this.ingresos.splice(indice, 1);
 }
}
}
