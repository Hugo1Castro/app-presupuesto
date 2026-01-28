import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cabecera',
  imports: [CommonModule],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.css'
})
export class CabeceraComponent {
  @Input() presupuestoTotal!: number;
  @Input() ingresoTotal!: number;
  @Input() egresoTotal!: number;
  @Input() porcentajeTotal!: number;


}
